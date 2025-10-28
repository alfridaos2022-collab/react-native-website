import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '@/constants/colors';
import { AdministrativeStep } from '@/types';
import Card from '@/components/Card';
import Button from '@/components/Button';

interface StepCardProps {
  step: AdministrativeStep;
  onToggleComplete: (stepId: string) => void;
}

function StepCard({ step, onToggleComplete }: StepCardProps) {
  const [expanded, setExpanded] = useState(false);

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <Card style={styles.stepCard}>
      <TouchableOpacity
        style={styles.stepHeader}
        onPress={() => setExpanded(!expanded)}
      >
        <View style={styles.stepInfo}>
          <View style={styles.stepTitleRow}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            {step.required && (
              <Text style={styles.requiredBadge}>Obligatoire</Text>
            )}
          </View>
          <Text style={styles.stepDescription}>{step.description}</Text>
        </View>
        <View style={styles.stepActions}>
          <TouchableOpacity
            onPress={() => onToggleComplete(step.id)}
            style={styles.checkButton}
          >
            <Icon
              name={step.completed ? 'check-circle' : 'radio-button-unchecked'}
              size={24}
              color={step.completed ? Colors.success : Colors.gray400}
            />
          </TouchableOpacity>
          <Icon
            name={expanded ? 'expand-less' : 'expand-more'}
            size={24}
            color={Colors.gray400}
          />
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.stepContent}>
          {step.documents.length > 0 && (
            <View style={styles.documentsSection}>
              <Text style={styles.sectionTitle}>Documents nécessaires :</Text>
              {step.documents.map((doc) => (
                <View key={doc.id} style={styles.documentItem}>
                  <Icon name="description" size={16} color={Colors.primary} />
                  <Text style={styles.documentName}>{doc.name}</Text>
                  {doc.required && (
                    <Text style={styles.requiredText}>*</Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {step.links.length > 0 && (
            <View style={styles.linksSection}>
              <Text style={styles.sectionTitle}>Liens utiles :</Text>
              {step.links.map((link) => (
                <TouchableOpacity
                  key={link.id}
                  style={styles.linkItem}
                  onPress={() => handleLinkPress(link.url)}
                >
                  <Icon name="link" size={16} color={Colors.primary} />
                  <Text style={styles.linkText}>{link.title}</Text>
                  <Icon name="open-in-new" size={16} color={Colors.gray400} />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      )}
    </Card>
  );
}

export default function AdministrativeScreen() {
  // Mock data - in real app, this would come from a service/state management
  const [steps, setSteps] = useState<AdministrativeStep[]>([
    {
      id: '1',
      title: 'Choisir le statut juridique',
      description: 'Déterminer la forme juridique la plus adaptée à votre projet',
      category: 'Création',
      order: 1,
      required: true,
      completed: true,
      documents: [
        {
          id: '1',
          name: 'Étude comparative des statuts',
          description: 'Document comparatif des différents statuts juridiques',
          required: false
        }
      ],
      links: [
        {
          id: '1',
          title: 'Guide des statuts juridiques - Service Public',
          url: 'https://www.service-public.fr/professionnels-entreprises/vosdroits/F32887',
          description: 'Guide officiel pour choisir son statut'
        }
      ]
    },
    {
      id: '2',
      title: 'Rédiger les statuts',
      description: 'Rédaction des statuts de la société (pour SARL, SAS, etc.)',
      category: 'Création',
      order: 2,
      required: true,
      completed: false,
      documents: [
        {
          id: '2',
          name: 'Statuts de la société',
          description: 'Document juridique définissant les règles de fonctionnement',
          required: true
        },
        {
          id: '3',
          name: 'Attestation de dépôt de capital',
          description: 'Preuve du dépôt du capital social',
          required: true
        }
      ],
      links: [
        {
          id: '2',
          title: 'Modèles de statuts - Infogreffe',
          url: 'https://www.infogreffe.fr',
          description: 'Modèles officiels de statuts'
        }
      ]
    },
    {
      id: '3',
      title: 'Immatriculation au RCS',
      description: 'Enregistrement de la société au Registre du Commerce et des Sociétés',
      category: 'Création',
      order: 3,
      required: true,
      completed: false,
      documents: [
        {
          id: '4',
          name: 'Formulaire M0',
          description: 'Déclaration de création d\'entreprise',
          required: true
        },
        {
          id: '5',
          name: 'Justificatif d\'occupation des locaux',
          description: 'Bail commercial ou attestation de domiciliation',
          required: true
        }
      ],
      links: [
        {
          id: '3',
          title: 'Guichet unique des entreprises',
          url: 'https://procedures.inpi.fr',
          description: 'Plateforme officielle pour les formalités'
        }
      ]
    },
    {
      id: '4',
      title: 'Ouverture d\'un compte bancaire professionnel',
      description: 'Création d\'un compte dédié à l\'activité professionnelle',
      category: 'Banque',
      order: 4,
      required: true,
      completed: false,
      documents: [
        {
          id: '6',
          name: 'Extrait Kbis',
          description: 'Carte d\'identité de l\'entreprise',
          required: true
        },
        {
          id: '7',
          name: 'Pièce d\'identité du dirigeant',
          description: 'CNI ou passeport en cours de validité',
          required: true
        }
      ],
      links: []
    },
    {
      id: '5',
      title: 'Souscrire une assurance professionnelle',
      description: 'Protection de l\'activité et responsabilité civile professionnelle',
      category: 'Assurance',
      order: 5,
      required: false,
      completed: false,
      documents: [
        {
          id: '8',
          name: 'Contrat d\'assurance RC Pro',
          description: 'Assurance responsabilité civile professionnelle',
          required: false
        }
      ],
      links: [
        {
          id: '4',
          title: 'Comparateur d\'assurances pro',
          url: 'https://www.service-public.fr/professionnels-entreprises/vosdroits/F22937',
          description: 'Guide sur les assurances professionnelles'
        }
      ]
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { label: 'Toutes', value: 'all' },
    { label: 'Création', value: 'Création' },
    { label: 'Banque', value: 'Banque' },
    { label: 'Assurance', value: 'Assurance' },
  ];

  const filteredSteps = steps.filter(step => 
    selectedCategory === 'all' || step.category === selectedCategory
  );

  const completedSteps = steps.filter(step => step.completed).length;
  const totalSteps = steps.length;
  const progress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  const handleToggleComplete = (stepId: string) => {
    setSteps(prevSteps =>
      prevSteps.map(step =>
        step.id === stepId ? { ...step, completed: !step.completed } : step
      )
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Card style={styles.progressCard}>
          <Text style={styles.progressTitle}>Progression des démarches</Text>
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>
              {completedSteps}/{totalSteps} étapes terminées ({Math.round(progress)}%)
            </Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${progress}%` }
              ]}
            />
          </View>
        </Card>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.value}
              style={[
                styles.categoryButton,
                selectedCategory === category.value && styles.activeCategory
              ]}
              onPress={() => setSelectedCategory(category.value)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category.value && styles.activeCategoryText
                ]}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Card style={styles.tipCard}>
            <View style={styles.tipHeader}>
              <Icon name="info" size={24} color={Colors.info} />
              <Text style={styles.tipTitle}>Information importante</Text>
            </View>
            <Text style={styles.tipText}>
              Cette liste présente les principales démarches pour créer une entreprise en France. 
              Les étapes peuvent varier selon votre statut juridique et votre secteur d'activité.
            </Text>
          </Card>
        </View>

        {filteredSteps
          .sort((a, b) => a.order - b.order)
          .map((step) => (
            <StepCard
              key={step.id}
              step={step}
              onToggleComplete={handleToggleComplete}
            />
          ))}

        <Card style={styles.helpCard}>
          <Text style={styles.helpTitle}>Besoin d'aide ?</Text>
          <Text style={styles.helpText}>
            Pour des conseils personnalisés, n'hésitez pas à consulter :
          </Text>
          <View style={styles.helpLinks}>
            <TouchableOpacity style={styles.helpLink}>
              <Icon name="business" size={20} color={Colors.primary} />
              <Text style={styles.helpLinkText}>Chambre de Commerce</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.helpLink}>
              <Icon name="account-balance" size={20} color={Colors.primary} />
              <Text style={styles.helpLinkText}>Guichet Entreprises</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.helpLink}>
              <Icon name="gavel" size={20} color={Colors.primary} />
              <Text style={styles.helpLinkText}>Expert-comptable</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  progressCard: {
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  progressInfo: {
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.gray200,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  categoriesContainer: {
    flexDirection: 'row',
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: Colors.gray100,
  },
  activeCategory: {
    backgroundColor: Colors.primary,
  },
  categoryText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  activeCategoryText: {
    color: Colors.white,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  infoCard: {
    marginBottom: 16,
  },
  tipCard: {
    backgroundColor: Colors.info + '10',
    borderColor: Colors.info + '30',
    borderWidth: 1,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginLeft: 8,
  },
  tipText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  stepCard: {
    marginBottom: 12,
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepInfo: {
    flex: 1,
    marginRight: 12,
  },
  stepTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginRight: 8,
  },
  requiredBadge: {
    fontSize: 10,
    color: Colors.error,
    backgroundColor: Colors.error + '20',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  stepDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  stepActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkButton: {
    marginRight: 8,
  },
  stepContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  documentsSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  documentName: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 8,
    flex: 1,
  },
  requiredText: {
    fontSize: 14,
    color: Colors.error,
  },
  linksSection: {
    marginBottom: 16,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.gray50,
    borderRadius: 8,
    marginBottom: 8,
  },
  linkText: {
    fontSize: 14,
    color: Colors.primary,
    marginLeft: 8,
    flex: 1,
  },
  helpCard: {
    marginTop: 24,
    marginBottom: 24,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  helpLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  helpLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.primary + '10',
    borderRadius: 8,
    marginBottom: 8,
    width: '48%',
  },
  helpLinkText: {
    fontSize: 12,
    color: Colors.primary,
    marginLeft: 8,
  },
});