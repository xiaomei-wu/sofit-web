export const nameOptions = [
  'Nausea',
  'Vomiting',
  'Diarrhea',
  'Stomach pain',
  'Headache',
  'Bloating',
  'Eczema',
  'Hayfever',
  'Asthma',
  'Heartburn',
  'Constipation',
  'Other',
];

export const getIcon = (name: string) => {
  switch (name) {
    case nameOptions[0]:
      return '/nausea.png';
      break;
    case nameOptions[1]:
      return '/vomiting.png';
      break;
    case nameOptions[2]:
      return '/diarrhea.png';
      break;
    case nameOptions[3]:
      return '/stomach-pain.png';
      break;
    case nameOptions[4]:
      return '/headache2.png';
      break;
    case nameOptions[5]:
      return '/bloating.png';
      break;
    case nameOptions[6]:
      return '/eczema.png';
      break;
    case nameOptions[7]:
      return '/hayfever.png';
      break;
    case nameOptions[8]:
      return '/asthma.png';
      break;
    case nameOptions[9]:
      return '/heartburn.png';
      break;
    case nameOptions[10]:
      return '/constipation.png';
      break;
    case nameOptions[11]:
      return '/sad-face.png';
      break;
    default:
      break;
  }
};
