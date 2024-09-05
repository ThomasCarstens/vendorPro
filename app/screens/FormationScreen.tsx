import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const MOCK_FORMATIONS = [
    { 
      id: '1', 
      title: 'Séminaire de fin d\'année en Cardiologie avancée', 
      date: '2024-09-15', 
      image: 'https://via.placeholder.com/150', 
      keywords: ['conseillé 3e année', 'postgrad'], 
      price: 120, 
      category: 'Cardiologie', 
      lieu: 'Paris', 
      niveau: 'Avancé',
      competencesAcquises: 'Maîtrise des techniques d\'échographie cardiaque avancées, interprétation approfondie des ECG complexes, gestion des cas cardiaques critiques.',
      prerequis: 'Important d\'avoir des connaissances théoriques de Cardiologie de Seconde année.',
      instructions: 'Point de rencontre dans le hall d\'entrée de l\'Hôpital Européen Georges Pompidou à 8h30.'
    },
    { 
      id: '2', 
      title: 'Visite d\'un expert en Pédiatrie moderne', 
      date: '2024-10-01', 
      image: 'https://via.placeholder.com/150', 
      keywords: ['postgrad'], 
      price: 100, 
      category: 'Pédiatrie', 
      lieu: 'Lyon', 
      niveau: 'Intermédiaire',
      competencesAcquises: 'Approches innovantes en pédiatrie, gestion des cas complexes, communication efficace avec les jeunes patients et leurs familles.',
      prerequis: 'Connaissances de base en pédiatrie requises. Expérience clinique souhaitée.',
      instructions: 'Rendez-vous à l\'amphithéâtre principal de l\'Hôpital Femme Mère Enfant à 9h00.'
    },
    { 
      id: '3', 
      title: 'Atelier pratique de Chirurgie laparoscopique', 
      date: '2024-10-20', 
      image: 'https://via.placeholder.com/150', 
      keywords: ['conseillé 3e année'], 
      price: 150, 
      category: 'Chirurgie', 
      lieu: 'Marseille', 
      niveau: 'Avancé',
      competencesAcquises: 'Maîtrise des techniques de chirurgie laparoscopique, manipulation d\'équipements de pointe, gestion des complications peropératoires.',
      prerequis: 'Connaissances approfondies en anatomie et techniques chirurgicales de base indispensables.',
      instructions: 'Rendez-vous au centre de simulation de l\'Hôpital de la Timone à 7h45. Tenue chirurgicale requise.'
    },
    { 
      id: '4', 
      title: 'Symposium sur les avancées en Psychiatrie clinique', 
      date: '2024-11-05', 
      image: 'https://via.placeholder.com/150', 
      keywords: ['postgrad'], 
      price: 110, 
      category: 'Psychiatrie', 
      lieu: 'Bordeaux', 
      niveau: 'Intermédiaire',
      competencesAcquises: 'Actualisation des connaissances en psychopharmacologie, nouvelles approches thérapeutiques, gestion des cas psychiatriques complexes.',
      prerequis: 'Formation de base en psychiatrie nécessaire. Ouvert aux internes et psychiatres en exercice.',
      instructions: 'Accueil à partir de 8h30 au Centre de Congrès Cité Mondiale. Présentation d\'une pièce d\'identité requise.'
    },
    { 
      id: '5', 
      title: 'Formation intensive en Urgences médicales', 
      date: '2024-11-15', 
      image: 'https://via.placeholder.com/150', 
      keywords: ['conseillé 3e année'], 
      price: 90, 
      category: 'Médecine d\'urgence', 
      lieu: 'Lille', 
      niveau: 'Débutant',
      competencesAcquises: 'Gestion des situations d\'urgence, techniques de réanimation avancées, triage efficace des patients.',
      prerequis: 'Connaissances de base en anatomie et physiologie. Formation en premiers secours recommandée.',
      instructions: 'Présentation à 8h00 au service des Urgences du CHRU de Lille. Prévoir une tenue confortable.'
    },
    { 
      id: '6', 
      title: 'Conférence sur les dernières avancées en Neurologie clinique', 
      date: '2024-12-01', 
      image: 'https://via.placeholder.com/150', 
      keywords: ['postgrad'], 
      price: 130, 
      category: 'Neurologie', 
      lieu: 'Toulouse', 
      niveau: 'Avancé',
      competencesAcquises: 'Mise à jour sur les traitements innovants des maladies neurodégénératives, interprétation avancée des examens d\'imagerie cérébrale, approches multidisciplinaires en neurologie.',
      prerequis: 'Solides connaissances en neuroanatomie et en physiopathologie du système nerveux requises.',
      instructions: 'Ouverture des portes à 9h00 à l\'Oncopole de Toulouse. Pause déjeuner prévue sur place.'
    },
    { 
      id: '7', 
      title: 'Journée d\'étude en Dermatologie pratique', 
      date: '2024-12-10', 
      image: 'https://via.placeholder.com/150', 
      keywords: ['conseillé 3e année'], 
      price: 95, 
      category: 'Dermatologie', 
      lieu: 'Nice', 
      niveau: 'Intermédiaire',
      competencesAcquises: 'Diagnostic précis des affections cutanées courantes et rares, techniques de biopsie cutanée, traitements dermatologiques innovants.',
      prerequis: 'Connaissances de base en dermatologie nécessaires. Expérience clinique appréciée.',
      instructions: 'Rendez-vous à 8h30 à l\'Hôpital Pasteur 2. Matériel pour prise de notes conseillé.'
    },
    { 
      id: '8', 
      title: 'Séminaire d\'Oncologie moderne : thérapies ciblées et immunothérapie', 
      date: '2025-01-05', 
      image: 'https://via.placeholder.com/150', 
      keywords: ['postgrad'], 
      price: 140, 
      category: 'Oncologie', 
      lieu: 'Strasbourg', 
      niveau: 'Avancé',
      competencesAcquises: 'Maîtrise des protocoles de thérapies ciblées et d\'immunothérapie, interprétation des biomarqueurs tumoraux, gestion des effets secondaires spécifiques.',
      prerequis: 'Solide formation en oncologie générale requise. Réservé aux oncologues et internes en oncologie.',
      instructions: 'Accueil dès 8h00 au Centre Paul Strauss. Prévoir une pièce d\'identité pour l\'accès.'
    },
    { 
      id: '9', 
      title: 'Workshop en Gynécologie obstétrique : nouvelles approches', 
      date: '2025-01-20', 
      image: 'https://via.placeholder.com/150', 
      keywords: ['conseillé 3e année'], 
      price: 105, 
      category: 'Gynécologie', 
      lieu: 'Nantes', 
      niveau: 'Intermédiaire',
      competencesAcquises: 'Maîtrise des techniques d\'échographie obstétricale avancées, gestion des grossesses à risque, nouvelles approches en chirurgie gynécologique mini-invasive.',
      prerequis: 'Connaissances théoriques en gynécologie obstétrique de niveau 2e cycle requises.',
      instructions: 'Début de la formation à 9h00 au CHU de Nantes. Tenue professionnelle exigée.'
    },
    { 
      id: '10', 
      title: 'Masterclass d\'Anesthésiologie avancée', 
      date: '2025-02-01', 
      image: 'https://via.placeholder.com/150', 
      keywords: ['postgrad'], 
      price: 160, 
      category: 'Anesthésiologie', 
      lieu: 'Montpellier', 
      niveau: 'Avancé',
      competencesAcquises: 'Techniques d\'anesthésie régionale guidée par échographie, gestion avancée des voies aériennes difficiles, protocoles d\'anesthésie pour chirurgies complexes.',
      prerequis: 'Réservé aux anesthésistes-réanimateurs confirmés et internes en fin de cursus.',
      instructions: 'Rassemblement à 7h30 au centre de simulation du CHU de Montpellier. Petit-déjeuner offert sur place.'
    }
  ];

const FormationScreen = ({ route, navigation }) => {
  const { formationId } = route.params;
  const formation = MOCK_FORMATIONS.find(f => f.id === formationId);

  if (!formation) {
    return (
      <View style={styles.container}>
        <Text>Formation non trouvée</Text>
      </View>
    );
  }

  return (
    
    <ScrollView style={styles.container}>

      <Image source={{ uri: formation.image }} style={styles.image} />
      <Text style={styles.title}>{formation.title}</Text>
        <TouchableOpacity 
            style={styles.signUpButton}
            onPress={() => navigation.navigate('InscriptionFormation', { formationId: formation.id })}
        >
        <Text style={styles.signUpButtonText}>S'inscrire</Text>
      </TouchableOpacity>
      <Text style={styles.info}>Date: {formation.date}</Text>
      <Text style={styles.info}>Lieu: {formation.lieu}</Text>
      <Text style={styles.info}>Niveau: {formation.niveau}</Text>
      <Text style={styles.info}>Prix: {formation.price} €</Text>
      
      <Text style={styles.sectionTitle}>Catégorie</Text>
      <Text style={styles.text}>{formation.category}</Text>
      
      <Text style={styles.sectionTitle}>Mots-clés</Text>
      <View style={styles.keywordsContainer}>
        {formation.keywords.map((keyword, index) => (
          <Text key={index} style={styles.keyword}>{keyword}</Text>
        ))}
      </View>
      
      <Text style={styles.sectionTitle}>Compétences acquises</Text>
      <Text style={styles.text}>{formation.competencesAcquises}</Text>
      
      <Text style={styles.sectionTitle}>Prérequis</Text>
      <Text style={styles.text}>{formation.prerequis}</Text>
      
      <Text style={styles.sectionTitle}>Instructions</Text>
      <Text style={styles.text}>{formation.instructions}</Text>
      

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  keywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  keyword: {
    backgroundColor: '#e0e0e0',
    padding: 5,
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 3,
  },
  signUpButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FormationScreen;