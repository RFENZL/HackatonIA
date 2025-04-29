import { Challenge, UserProfile } from '../types';
import { v4 as uuidv4 } from 'uuid';

const generateChallenges = (): Challenge[] => {
  const profileChallenges: Record<UserProfile, Challenge[]> = {
    young: [
      {
        id: uuidv4(),
        title: 'Trouve un marché local',
        description: 'Aujourd\'hui, recherche et visite un marché de producteurs près de chez toi. Découvre des aliments frais et locaux.',
        day: 1,
        profileType: 'young',
        encouragement: 'Tu fais tes premiers pas vers une consommation plus locale et responsable !',
        tips: 'Utilise des applications comme "La Ruche qui dit Oui" pour trouver des marchés près de chez toi.',
        imageUrl: 'https://images.pexels.com/photos/2284166/pexels-photo-2284166.jpeg',
        validationType: 'checkmark'
      },
      {
        id: uuidv4(),
        title: 'Achète un légume de saison',
        description: 'Achète un légume local et de saison que tu n\'as pas l\'habitude de cuisiner. Découvre de nouvelles saveurs !',
        day: 2,
        profileType: 'young',
        encouragement: 'Explorer de nouveaux aliments locaux, c\'est s\'ouvrir à de nouvelles saveurs tout en soutenant l\'agriculture locale !',
        imageUrl: 'https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg',
        validationType: 'photo'
      },
      {
        id: uuidv4(),
        title: 'Cuisine un plat 100% local',
        description: 'Prépare un repas en utilisant uniquement des ingrédients provenant de moins de 50km de chez toi.',
        day: 3,
        profileType: 'young',
        encouragement: 'Tu deviens un vrai chef du terroir ! Continue à explorer les saveurs locales.',
        imageUrl: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
        validationType: 'photo'
      },
      {
        id: uuidv4(),
        title: 'Partage ton expérience',
        description: 'Raconte à un ami ton expérience avec les produits locaux et pourquoi c\'est important pour toi.',
        day: 4,
        profileType: 'young',
        encouragement: 'Partager tes découvertes, c\'est aussi sensibiliser les autres. Bravo pour ton engagement !',
        imageUrl: 'https://images.pexels.com/photos/5325903/pexels-photo-5325903.jpeg',
        validationType: 'text'
      },
      {
        id: uuidv4(),
        title: 'Zéro emballage',
        description: 'Fais tes courses en évitant au maximum les emballages plastiques. Pense aux sacs réutilisables, contenants en verre, etc.',
        day: 5,
        profileType: 'young',
        encouragement: 'Réduire les emballages, c\'est aussi réduire notre impact sur l\'environnement !',
        tips: 'Amène tes propres sacs en tissu et contenants réutilisables pour faire tes courses.',
        imageUrl: 'https://images.pexels.com/photos/4498468/pexels-photo-4498468.jpeg',
        validationType: 'photo'
      },
      {
        id: uuidv4(),
        title: 'Rencontre un producteur',
        description: 'Va à la rencontre d\'un producteur local et discute avec lui de son métier et de ses produits.',
        day: 6,
        profileType: 'young',
        encouragement: 'Comprendre le travail derrière nos aliments, c\'est apprécier leur vraie valeur !',
        imageUrl: 'https://images.pexels.com/photos/2287297/pexels-photo-2287297.jpeg',
        validationType: 'text'
      },
      {
        id: uuidv4(),
        title: 'Crée un plat signature local',
        description: 'Invente une recette originale avec des produits 100% locaux et donne-lui un nom créatif.',
        day: 7,
        profileType: 'young',
        encouragement: 'Tu es devenu un véritable ambassadeur du circuit court ! Continue sur cette lancée !',
        imageUrl: 'https://images.pexels.com/photos/3669638/pexels-photo-3669638.jpeg',
        validationType: 'photo'
      }
    ],
    family: [
      {
        id: uuidv4(),
        title: 'Visite en famille',
        description: 'Visitez ensemble un marché de producteurs ou une ferme locale. Laissez vos enfants choisir un fruit ou légume qu\'ils ne connaissent pas.',
        day: 1,
        profileType: 'family',
        encouragement: 'Une belle aventure familiale qui éveille la curiosité des petits et des grands !',
        imageUrl: 'https://images.pexels.com/photos/8969237/pexels-photo-8969237.jpeg',
        validationType: 'checkmark'
      },
      {
        id: uuidv4(),
        title: 'Découverte fruitée',
        description: 'Faites découvrir un fruit de saison local à votre enfant. Observez sa réaction et partagez ce moment en famille.',
        day: 2,
        profileType: 'family',
        encouragement: 'Les découvertes alimentaires en famille créent des souvenirs et des habitudes positives !',
        tips: 'Transformez cette découverte en jeu: devine le goût, la texture, etc.',
        imageUrl: 'https://images.pexels.com/photos/1153655/pexels-photo-1153655.jpeg',
        validationType: 'photo'
      },
      {
        id: uuidv4(),
        title: 'Atelier cuisine en famille',
        description: 'Cuisinez ensemble un plat simple avec des ingrédients locaux. Impliquez les enfants dans la préparation.',
        day: 3,
        profileType: 'family',
        encouragement: 'Cuisiner ensemble est une excellente façon de sensibiliser à l\'alimentation durable !',
        imageUrl: 'https://images.pexels.com/photos/4149012/pexels-photo-4149012.jpeg',
        validationType: 'photo'
      },
      {
        id: uuidv4(),
        title: 'Histoire des aliments',
        description: 'Racontez à vos enfants d\'où viennent les aliments qu\'ils mangent aujourd\'hui. Créez une petite histoire autour du voyage des aliments.',
        day: 4,
        profileType: 'family',
        encouragement: 'L\'éducation alimentaire passe aussi par les histoires et les échanges en famille !',
        imageUrl: 'https://images.pexels.com/photos/296301/pexels-photo-296301.jpeg',
        validationType: 'text'
      },
      {
        id: uuidv4(),
        title: 'Projet plantation',
        description: 'Plantez ensemble une herbe aromatique ou un légume facile à cultiver. Responsabilisez les enfants pour l\'arrosage.',
        day: 5,
        profileType: 'family',
        encouragement: 'Un petit jardin pour comprendre le cycle de vie des plantes et la patience nécessaire !',
        tips: 'Le basilic, la ciboulette ou les radis sont très faciles à cultiver, même en appartement !',
        imageUrl: 'https://images.pexels.com/photos/4505167/pexels-photo-4505167.jpeg',
        validationType: 'photo'
      },
      {
        id: uuidv4(),
        title: 'Chasse au trésor locale',
        description: 'Organisez une chasse au trésor au marché ou au supermarché pour trouver des produits locaux. Préparez une liste adaptée à l\'âge de vos enfants.',
        day: 6,
        profileType: 'family',
        encouragement: 'Transformer les courses en jeu éducatif, quelle excellente idée !',
        imageUrl: 'https://images.pexels.com/photos/5699828/pexels-photo-5699828.jpeg',
        validationType: 'checkmark'
      },
      {
        id: uuidv4(),
        title: 'Repas complet locavore',
        description: 'Préparez un repas festif avec toute la famille, où chaque plat contient au moins un ingrédient local. Célébrez votre semaine d\'engagement !',
        day: 7,
        profileType: 'family',
        encouragement: 'Une semaine d\'exploration locale qui se termine en beauté ! Bravo à toute la famille !',
        imageUrl: 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg',
        validationType: 'photo'
      }
    ],
    eco: [
      {
        id: uuidv4(),
        title: 'Audit de votre cuisine',
        description: 'Faites l\'inventaire des produits dans votre cuisine et identifiez ceux qui pourraient être remplacés par des alternatives locales.',
        day: 1,
        profileType: 'eco',
        encouragement: 'La prise de conscience est la première étape du changement. Bravo pour ce premier pas !',
        tips: 'Concentrez-vous d\'abord sur les produits que vous consommez régulièrement.',
        imageUrl: 'https://images.pexels.com/photos/4099237/pexels-photo-4099237.jpeg',
        validationType: 'checkmark'
      },
      {
        id: uuidv4(),
        title: 'Substitution locale',
        description: 'Remplacez un produit importé par son équivalent local. Comparez le goût, le prix et l\'empreinte carbone si possible.',
        day: 2,
        profileType: 'eco',
        encouragement: 'Chaque substitution compte ! Vous contribuez à réduire l\'empreinte carbone de votre alimentation.',
        imageUrl: 'https://images.pexels.com/photos/7521302/pexels-photo-7521302.jpeg',
        validationType: 'photo'
      },
      {
        id: uuidv4(),
        title: 'Recherche producteurs',
        description: 'Identifiez trois producteurs locaux (moins de 50km) dont vous pourriez acheter les produits régulièrement.',
        day: 3,
        profileType: 'eco',
        encouragement: 'Créer un réseau d\'approvisionnement local est essentiel pour une consommation durable !',
        tips: 'Pensez aux AMAP, marchés fermiers, et vente directe à la ferme.',
        imageUrl: 'https://images.pexels.com/photos/2889741/pexels-photo-2889741.jpeg',
        validationType: 'text'
      },
      {
        id: uuidv4(),
        title: 'Partage d\'astuce',
        description: 'Partagez une astuce zéro déchet liée à la consommation locale avec votre entourage ou sur les réseaux sociaux.',
        day: 4,
        profileType: 'eco',
        encouragement: 'Partager son savoir, c\'est multiplier l\'impact positif de ses actions !',
        imageUrl: 'https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg',
        validationType: 'text'
      },
      {
        id: uuidv4(),
        title: 'Menu saisonnier',
        description: 'Planifiez vos repas de la semaine en respectant strictement la saisonnalité des fruits et légumes.',
        day: 5,
        profileType: 'eco',
        encouragement: 'Manger de saison, c\'est suivre le rythme de la nature et réduire son impact environnemental !',
        tips: 'Utilisez un calendrier de saisonnalité pour vous guider dans vos choix.',
        imageUrl: 'https://images.pexels.com/photos/6607387/pexels-photo-6607387.jpeg',
        validationType: 'photo'
      },
      {
        id: uuidv4(),
        title: 'Calcul d\'impact',
        description: 'Estimez l\'économie de CO2 réalisée en remplaçant un de vos repas habituels par un repas 100% local.',
        day: 6,
        profileType: 'eco',
        encouragement: 'Quantifier ses efforts permet de mesurer son impact réel et de rester motivé !',
        imageUrl: 'https://images.pexels.com/photos/9941060/pexels-photo-9941060.jpeg',
        validationType: 'text'
      },
      {
        id: uuidv4(),
        title: 'Engagement durable',
        description: 'Définissez trois habitudes de consommation locale que vous souhaitez maintenir à long terme et expliquez pourquoi.',
        day: 7,
        profileType: 'eco',
        encouragement: 'Félicitations ! Ces changements durables auront un impact significatif sur votre empreinte écologique.',
        imageUrl: 'https://images.pexels.com/photos/7262774/pexels-photo-7262774.jpeg',
        validationType: 'text'
      }
    ]
  };

  // Flatten all challenges into a single array
  return [
    ...profileChallenges.young,
    ...profileChallenges.family,
    ...profileChallenges.eco
  ];
};

export const challenges = generateChallenges();

// Helper function to get challenges for a specific profile
export const getChallengesByProfile = (profileType: UserProfile): Challenge[] => {
  return challenges.filter(challenge => challenge.profileType === profileType)
    .sort((a, b) => a.day - b.day);
};

// Helper function to get a challenge by ID
export const getChallengeById = (id: string): Challenge | undefined => {
  return challenges.find(challenge => challenge.id === id);
};

// Helper function to get a challenge for a specific day and profile
export const getChallengeByDayAndProfile = (day: number, profileType: UserProfile): Challenge | undefined => {
  return challenges.find(challenge => challenge.day === day && challenge.profileType === profileType);
};

// Helper function to get encouraging messages
export const getRandomEncouragement = (): string => {
  const encouragements = [
    "Chaque petit geste compte ! Continue ainsi !",
    "Tu fais une différence réelle pour l'environnement !",
    "Bravo pour ton engagement dans cette démarche écoresponsable !",
    "La planète te remercie pour tes efforts !",
    "Ton impact positif se multiplie jour après jour !",
    "Continue sur cette belle lancée verte !",
    "Tes choix d'aujourd'hui façonnent le monde de demain !",
    "Quelle belle initiative ! Tu peux être fier(e) de toi !"
  ];
  
  return encouragements[Math.floor(Math.random() * encouragements.length)];
};