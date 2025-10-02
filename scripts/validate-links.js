#!/usr/bin/env node

/**
 * Link Validation Script for React Native Website
 * 
 * This script validates internal links and anchors to prevent broken links
 * from being deployed to production.
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

class LinkValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.processedFiles = 0;
    this.totalLinks = 0;
  }

  /**
   * Main validation function
   */
  async validate() {
    console.log('🔍 Starting link validation...\n');
    
    try {
      // Find all markdown files
      const markdownFiles = await this.findMarkdownFiles();
      console.log(`📄 Found ${markdownFiles.length} markdown files to validate\n`);
      
      // Process each file
      for (const file of markdownFiles) {
        await this.validateFile(file);
      }
      
      this.printResults();
      
      // Exit with error code if there are errors
      if (this.errors.length > 0) {
        process.exit(1);
      }
      
    } catch (error) {
      console.error('❌ Validation failed:', error.message);
      process.exit(1);
    }
  }

  /**
   * Find all markdown files in the project
   */
  async findMarkdownFiles() {
    const patterns = [
      'docs/**/*.md',
      'website/blog/**/*.md',
      'website/versioned_docs/**/*.md',
      'website/contributing/**/*.md',
      'website/architecture/**/*.md'
    ];
    
    const files = [];
    for (const pattern of patterns) {
      const matches = glob.sync(pattern, { cwd: process.cwd() });
      files.push(...matches);
    }
    
    return [...new Set(files)]; // Remove duplicates
  }

  /**
   * Validate links in a single file
   */
  async validateFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const links = this.extractLinks(content);
      
      this.processedFiles++;
      this.totalLinks += links.length;
      
      if (links.length > 0) {
        console.log(`📝 ${filePath}: ${links.length} links found`);
        
        for (const link of links) {
          await this.validateLink(link, filePath);
        }
      }
      
    } catch (error) {
      this.errors.push({
        file: filePath,
        error: `Failed to read file: ${error.message}`
      });
    }
  }

  /**
   * Extract links from markdown content
   */
  extractLinks(content) {
    const links = [];
    
    // Match markdown links: [text](url)
    const markdownLinkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
    let match;
    
    while ((match = markdownLinkRegex.exec(content)) !== null) {
      const [fullMatch, text, url] = match;
      
      // Skip external links and email links
      if (!url.startsWith('http') && !url.startsWith('mailto:') && !url.startsWith('#')) {
        links.push({
          text: text.trim(),
          url: url.trim(),
          fullMatch,
          type: 'markdown'
        });
      }
    }
    
    // Match HTML links: <a href="url">
    const htmlLinkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>/g;
    
    while ((match = htmlLinkRegex.exec(content)) !== null) {
      const [fullMatch, url] = match;
      
      // Skip external links and email links
      if (!url.startsWith('http') && !url.startsWith('mailto:') && !url.startsWith('#')) {
        links.push({
          text: '',
          url: url.trim(),
          fullMatch,
          type: 'html'
        });
      }
    }
    
    return links;
  }

  /**
   * Validate a single link
   */
  async validateLink(link, sourceFile) {
    const { url } = link;
    
    // Handle anchor links
    if (url.includes('#')) {
      const [filePath, anchor] = url.split('#');
      
      if (filePath) {
        // Link to another file with anchor
        const targetPath = this.resolvePath(filePath, sourceFile);
        if (!this.fileExists(targetPath)) {
          this.errors.push({
            file: sourceFile,
            link: url,
            error: `Target file not found: ${targetPath}`
          });
          return;
        }
        
        // TODO: Validate anchor exists in target file
        // This would require parsing the target file for headers
      }
      
      return;
    }
    
    // Handle relative file links
    const targetPath = this.resolvePath(url, sourceFile);
    
    if (!this.fileExists(targetPath)) {
      this.errors.push({
        file: sourceFile,
        link: url,
        error: `Target file not found: ${targetPath}`
      });
    }
  }

  /**
   * Resolve relative path to absolute path
   */
  resolvePath(relativePath, sourceFile) {
    const sourceDir = path.dirname(sourceFile);
    const resolved = path.resolve(sourceDir, relativePath);
    
    // Try common extensions if file doesn't exist
    if (!fs.existsSync(resolved)) {
      const extensions = ['.md', '.mdx', '.html'];
      for (const ext of extensions) {
        const withExt = resolved + ext;
        if (fs.existsSync(withExt)) {
          return withExt;
        }
      }
    }
    
    return resolved;
  }

  /**
   * Check if file exists
   */
  fileExists(filePath) {
    try {
      return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
    } catch {
      return false;
    }
  }

  /**
   * Print validation results
   */
  printResults() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 LINK VALIDATION RESULTS');
    console.log('='.repeat(60));
    
    console.log(`📄 Files processed: ${this.processedFiles}`);
    console.log(`🔗 Total links checked: ${this.totalLinks}`);
    console.log(`❌ Errors: ${this.errors.length}`);
    console.log(`⚠️  Warnings: ${this.warnings.length}`);
    
    if (this.errors.length > 0) {
      console.log('\n❌ ERRORS:');
      console.log('-'.repeat(40));
      
      this.errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error.file}`);
        console.log(`   Link: ${error.link || 'N/A'}`);
        console.log(`   Error: ${error.error}`);
        console.log('');
      });
    }
    
    if (this.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      console.log('-'.repeat(40));
      
      this.warnings.forEach((warning, index) => {
        console.log(`${index + 1}. ${warning.file}`);
        console.log(`   Warning: ${warning.warning}`);
        console.log('');
      });
    }
    
    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('\n✅ All links are valid! 🎉');
    }
    
    console.log('='.repeat(60));
  }
}

// Run validation if called directly
if (require.main === module) {
  const validator = new LinkValidator();
  validator.validate().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = LinkValidator;