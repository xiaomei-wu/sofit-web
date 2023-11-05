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
  'Other'
];

export const getIcon = (name: string) => {
  switch (name) {
    case nameOptions[0]:
      return '/nausea.png';
    case nameOptions[1]:
      return '/vomiting.png';
    case nameOptions[2]:
      return '/diarrhea.png';
    case nameOptions[3]:
      return '/stomach-pain.png';
    case nameOptions[4]:
      return '/headache2.png';
    case nameOptions[5]:
      return '/bloating.png';
    case nameOptions[6]:
      return '/eczema.png';
    case nameOptions[7]:
      return '/hayfever.png';
    case nameOptions[8]:
      return '/asthma.png';
    case nameOptions[9]:
      return '/heartburn.png';
    case nameOptions[10]:
      return '/constipation.png';
    case nameOptions[11]:
      return '/sad-face.png';
    default:
      return '/sad-face.png';
  }
};
