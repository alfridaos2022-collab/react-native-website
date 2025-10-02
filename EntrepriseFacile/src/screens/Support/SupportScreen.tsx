import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, APP_CONFIG } from '../../constants';

interface SupportScreenProps {
  navigation: any;
}

const SupportScreen: React.FC<SupportScreenProps> = ({ navigation: _navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('general');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const supportCategories = [
    { value: 'general', label: 'Général', icon: 'help' },
    { value: 'technical', label: 'Technique', icon: 'build' },
    { value: 'billing', label: 'Facturation', icon: 'payment' },
    { value: 'feature', label: 'Fonctionnalité', icon: 'lightbulb' },
  ];

  const faqItems = [
    {
      question: 'Comment créer un plan d\'affaires ?',
      answer: 'Utilisez l\'onglet "Documents" pour créer un nouveau plan d\'affaires. Choisissez un modèle ou créez un plan personnalisé.',
    },
    {
      question: 'Puis-je exporter mon plan en PDF ?',
      answer: 'Oui, vous pouvez exporter vos plans d\'affaires en PDF depuis l\'écran d\'édition de votre plan.',
    },
    {
      question: 'Quelle est la différence entre les versions gratuite et premium ?',
      answer: 'La version premium offre des modèles avancés, l\'analyse IA, et un support prioritaire.',
    },
    {
      question: 'Comment contacter le support ?',
      answer: 'Vous pouvez nous contacter par email à support@entreprisefacile.fr ou utiliser le formulaire ci-dessous.',
    },
  ];

  const handleSendMessage = () => {
    if (!subject.trim() || !message.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    Alert.alert(
      'Message envoyé',
      'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
      [{ text: 'OK' }]
    );

    // Reset form
    setSubject('');
    setMessage('');
  };

  const CategoryButton = ({ category }: { category: any }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === category.value && styles.categoryButtonActive
      ]}
      onPress={() => setSelectedCategory(category.value)}
    >
      <Icon 
        name={category.icon} 
        size={20} 
        color={selectedCategory === category.value ? COLORS.surface : COLORS.primary} 
      />
      <Text style={[
        styles.categoryButtonText,
        selectedCategory === category.value && styles.categoryButtonTextActive
      ]}>
        {category.label}
      </Text>
    </TouchableOpacity>
  );

  const FAQItem = ({ item }: { item: any }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <View style={styles.faqItem}>
        <TouchableOpacity 
          style={styles.faqQuestion}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          <Text style={styles.faqQuestionText}>{item.question}</Text>
          <Icon 
            name={isExpanded ? 'expand-less' : 'expand-more'} 
            size={24} 
            color={COLORS.primary} 
          />
        </TouchableOpacity>
        {isExpanded && (
          <View style={styles.faqAnswer}>
            <Text style={styles.faqAnswerText}>{item.answer}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Contact Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nous contacter</Text>
          
          <View style={styles.contactMethods}>
            <TouchableOpacity 
              style={styles.contactMethod}
              onPress={() => {
                Alert.alert(
                  'Email',
                  `Envoyez-nous un email à ${APP_CONFIG.supportEmail}`,
                  [{ text: 'OK' }]
                );
              }}
            >
              <Icon name="email" size={24} color={COLORS.primary} />
              <View style={styles.contactMethodContent}>
                <Text style={styles.contactMethodTitle}>Email</Text>
                <Text style={styles.contactMethodSubtitle}>
                  Réponse sous 24h
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.contactMethod}
              onPress={() => {
                Alert.alert(
                  'Chat',
                  'Le chat en direct sera bientôt disponible',
                  [{ text: 'OK' }]
                );
              }}
            >
              <Icon name="chat" size={24} color={COLORS.primary} />
              <View style={styles.contactMethodContent}>
                <Text style={styles.contactMethodTitle}>Chat en direct</Text>
                <Text style={styles.contactMethodSubtitle}>
                  Disponible bientôt
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Questions fréquentes</Text>
          {faqItems.map((item, index) => (
            <FAQItem key={index} item={item} />
          ))}
        </View>

        {/* Support Form */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Envoyer un message</Text>
          
          {/* Category Selection */}
          <View style={styles.categoriesContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {supportCategories.map((category) => (
                <CategoryButton key={category.value} category={category} />
              ))}
            </ScrollView>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Sujet</Text>
              <TextInput
                style={styles.textInput}
                value={subject}
                onChangeText={setSubject}
                placeholder="Décrivez brièvement votre problème"
                placeholderTextColor={COLORS.textSecondary}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Message</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={message}
                onChangeText={setMessage}
                placeholder="Décrivez votre problème en détail..."
                placeholderTextColor={COLORS.textSecondary}
                multiline
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity 
              style={styles.sendButton}
              onPress={handleSendMessage}
            >
              <Text style={styles.sendButtonText}>Envoyer le message</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* App Info */}
        <View style={styles.section}>
          <View style={styles.appInfo}>
            <Text style={styles.appInfoTitle}>{APP_CONFIG.name}</Text>
            <Text style={styles.appInfoVersion}>Version {APP_CONFIG.version}</Text>
            <Text style={styles.appInfoWebsite}>{APP_CONFIG.website}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  contactMethods: {
    gap: 15,
  },
  contactMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 15,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contactMethodContent: {
    marginLeft: 15,
    flex: 1,
  },
  contactMethodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  contactMethodSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  faqItem: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  faqQuestionText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    flex: 1,
    marginRight: 10,
  },
  faqAnswer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.primaryLight,
  },
  faqAnswerText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  categoryButtonActive: {
    backgroundColor: COLORS.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
    marginLeft: 8,
  },
  categoryButtonTextActive: {
    color: COLORS.surface,
  },
  formContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: COLORS.text,
  },
  textArea: {
    height: 120,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.surface,
  },
  appInfo: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 20,
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  appInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 5,
  },
  appInfoVersion: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 5,
  },
  appInfoWebsite: {
    fontSize: 14,
    color: COLORS.primary,
  },
});

export default SupportScreen;