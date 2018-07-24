// @flow
/* eslint-disable global-require */

const membersData: Array<MemberDataType> = [
  {
    name: {
      first: 'Dmitri',
      last: 'Brereton'
    },
    position: 'Product Manager',
    description:
      'Memelord by day, asleep by night. Capable of having a conversation using only pusheen stickers. Usually found anywhere but class.',
    image: require('./images/dmitri-brereton.png')
  },
  {
    name: { first: 'Meera', last: 'Rachamallu' },
    position: 'Product Manager',
    description: 'I keep up with the kardashians, but they can’t keep up with me.',
    image: require('./images/meera-rachamallu.jpg')
  },
  {
    name: {
      first: 'Bibek',
      last: 'Ghimire'
    },
    position: 'Tech Lead',
    description:
      "Nomadic herbivore indigenous to NorCal. Current obsessions include web development, playing guitar, and pondering his life's purpose.",
    image: require('./images/bibek-ghimire.jpg')
  },
  {
    name: {
      first: 'Christopher',
      last: 'Aziz'
    },
    position: 'iOS Developer',
    description:
      'Born, raised, and educated in Los Angeles. A morning coffee or a happy doggo will always make my day.',
    image: require('./images/christopher-aziz.png')
  },
  {
    name: {
      first: 'Aidan',
      last: 'Wolk'
    },
    position: 'Back-End Developer',
    description:
      'Passionate programmer, amateur coffee enthusiast, professional nor-cal native, and only a bit of a kook.',
    image: require('./images/aidan-wolk.png')
  },
  {
    name: {
      first: 'Ken',
      last: 'Gu'
    },
    position: 'Machine Learning Developer',
    description: 'I like to ball and I like to think I can shoot as well Lonzo Ball.',
    image: require('./images/ken-gu.png')
  },
  {
    name: {
      first: 'Anirudh',
      last: 'Balasubramaniam'
    },
    position: 'Android Developer',
    description:
      "Native of the Bay Area. Connoisseur of tea and spicy food. Enthusiast of beautiful code and physics. When I'm not coding, you can find me balling or playing guitar.",
    image: require('./images/anirudh-balasubramaniam.png')
  },
  {
    name: {
      first: 'Steven',
      last: 'Truong'
    },
    position: 'Back-End Developer',
    description: 'Boba flows through my veins instead of blood.',
    image: require('./images/steven-truong.png')
  },
  {
    name: {
      first: 'Joss',
      last: 'Glenn'
    },
    position: 'User Researcher',
    description:
      'Writer, less than novice coder,  social rights activist, singer-songwriter, poet, comedienne. Raised by pandas and unicorns.',
    image: require('./images/joss-glenn.png')
  },
  {
    name: { first: 'Max', last: 'Wang' },
    position: 'Front-End Developer',
    description:
      'Software developer interested in everything technology-related. Love outdoor adventures, cycling, road trips and aviation.',
    image: require('./images/max-wang.jpg')
  },
  {
    name: { first: 'Luca', last: 'Matsumoto' },
    position: 'Back-End Developer',
    description: 'Bay Area native, developer, foodie, caffeine addict, and wannabe big baller. #Dubnation till I die.',
    image: require('./images/luca-matsumoto.png')
  },
  {
    name: { first: 'Alex', last: 'Zhao' },
    position: 'Front-End Developer',
    description:
      'Bay Area-raised computer science lover who likes starting and abandoning side projects on a monthly basis. Greatest fears include physics midterms and writing bios about himself.',
    image: require('./images/alex-zhao.jpg')
  },
  {
    name: { first: 'George', last: 'Zhang' },
    position: 'Front-End Developer',
    description: 'SoCal best Cal. Catch me taking pictures, writing code, hiking trails, or cheering for the Dodgers.',
    image: require('./images/george-zhang.jpg')
  }
]

export default membersData

/**
 * Members that have left
 * TODO: Create a smaller section for people that have contributed to the BM effort but no longer work with us
 */

/*
  {
    name: {
      first: 'Boon',
      last: 'Xin Tan'
    },
    position: 'Operations',
    description: 'Enjoy watching people playing game without actually playing it. Malfunctioned without caffeine.',
    image: require('./images/boon-xin-tan.jpg')
  },
  {
    name: {
      first: 'Karen',
      last: 'Fann'
    },
    position: 'Front-End Developer',
    description:
      'Short stack of pancakes but will break your ankles in basketball. Jasmine tea and aesthetic views keep me happy.',
    image: require('./images/karen-fann.png')
  },
  {
    name: {
      first: 'Jeffrey',
      last: 'Chan'
    },
    position: 'Back-End Developer',
    description:
      "626 native that's waiting for his wings to grow out. The only things that can hold me down are Chipotle, KBBQ, and Dim Sum.",
    image: require('./images/jeffrey-chan.png')
  },
  {
    name: {
      first: 'Jimmy',
      last: 'Zhou'
    },
    position: 'Operations',
    description:
      "Aspiring physician. Tried to code and then failed; now I'm premed. Reslife Programmer and Avid Events Planner",
    image: require('./images/jimmy-zhou.jpg')
  }
*/
