// @flow
/* eslint-disable global-require */

export const currentMembers: Array<MemberDataType> = [
  {
    name: { first: 'Meera', last: 'Rachamallu' },
    position: 'Product Manager',
    description: 'I keep up with the kardashians, but they can’t keep up with me.',
    joined: new Date('2018-04-01T00:00:00.000Z'),
    image: require('./images/meera-rachamallu.jpg')
  },
  {
    name: { first: 'Bibek', last: 'Ghimire' },
    position: 'Tech Lead',
    description:
      "Nomadic herbivore indigenous to NorCal. Current obsessions include web development, playing guitar, and pondering his life's purpose.",
    joined: new Date('2017-10-10T00:00:00.000Z'),
    image: require('./images/bibek-ghimire.jpg')
  },
  {
    name: { first: 'Christopher', last: 'Aziz' },
    position: 'Front-End Developer',
    description:
      'Born, raised, and educated in Los Angeles. A morning coffee or a happy doggo will always make my day.',
    joined: new Date('2017-10-10T00:00:00.000Z'),
    image: require('./images/christopher-aziz.png')
  },
  {
    name: { first: 'Aidan', last: 'Wolk' },
    position: 'Full-Stack Developer',
    description:
      'Passionate programmer, amateur coffee enthusiast, professional nor-cal native, and only a bit of a kook.',
    joined: new Date('2017-10-10T00:00:00.000Z'),
    image: require('./images/aidan-wolk.png')
  },
  {
    name: { first: 'Anirudh', last: 'Balasubramaniam' },
    position: 'Mobile Developer',
    description:
      "Native of the Bay Area. Connoisseur of tea and spicy food. Enthusiast of beautiful code and physics. When I'm not coding, you can find me balling or playing guitar.",
    joined: new Date('2017-10-10T00:00:00.000Z'),
    image: require('./images/anirudh-balasubramaniam.png')
  },
  {
    name: { first: 'Steven', last: 'Truong' },
    position: 'Back-End Developer',
    description: 'Boba flows through my veins instead of blood.',
    joined: new Date('2018-01-01T00:00:00.000Z'),
    image: require('./images/steven-truong.png')
  },
  {
    name: { first: 'Max', last: 'Wang' },
    position: 'Front-End Developer',
    description:
      'Software developer interested in everything technology-related. Love outdoor adventures, cycling, road trips and aviation.',
    joined: new Date('2018-05-07T00:00:00.000Z'),
    image: require('./images/max-wang.jpg')
  },
  {
    name: { first: 'Luca', last: 'Matsumoto' },
    position: 'Back-End Developer',
    description: 'Bay Area native, developer, foodie, caffeine addict, and wannabe big baller. #Dubnation till I die.',
    joined: new Date('2018-04-09T00:00:00.000Z'),
    image: require('./images/luca-matsumoto.png')
  },
  {
    name: { first: 'Alex', last: 'Zhao' },
    position: 'Front-End Developer',
    description:
      'Bay Area-raised computer science lover who likes starting and abandoning side projects on a monthly basis. Greatest fears include physics midterms and writing bios about himself.',
    joined: new Date('2018-04-09T00:00:00.000Z'),
    image: require('./images/alex-zhao.jpg')
  },
  {
    name: { first: 'George', last: 'Zhang' },
    position: 'Front-End Developer',
    description: 'SoCal best Cal. Catch me taking pictures, writing code, hiking trails, or cheering for the Dodgers.',
    joined: new Date('2018-05-07T00:00:00.000Z'),
    image: require('./images/george-zhang.jpg')
  },
  {
    name: { first: 'Isra', last: 'Ameen' },
    position: 'Designer',
    description:
      'New Yorker who realized the west coast is the best coast. Ex coffee addict finding new meaning to life through photography, design, and Appalachian folk music.',
    joined: new Date('2018-10-10T00:00:00.000Z'),
    image: require('./images/isra-ameen.png')
  },
  {
    name: { first: 'Maliha', last: 'Lakhani' },
    position: 'Marketing',
    description: 'Tall, clumsy giant.',
    joined: new Date('2018-10-10T00:00:00.000Z'),
    image: require('./images/maliha-lakhani.jpg')
  },
  {
    name: { first: 'Sijay', last: 'Liu' },
    position: 'Back-End Developer',
    description: 'Often preoccupied with games and play. Occasional hipster. Ask me about my social anxiety.',
    joined: new Date('2018-10-10T00:00:00.000Z'),
    image: require('./images/sijay-liu.jpg')
  },
  {
    name: { first: 'Jack', last: 'Van Boening' },
    position: 'Front-End Developer',
    description: 'Developer, hip-hop enthusiast, and professional 2k player from Sac-Town. LeBron is the GOAT.',
    joined: new Date('2018-10-10T00:00:00.000Z'),
    image: require('./images/jack-van-boening.png')
  },
  {
    name: { first: 'Pratyusha', last: 'Majumder' },
    position: 'Data Analyst',
    description:
      'Wakes up every morning with the joy and excitement of wanting to go directly back to sleep. Very outdoorsy; camped out for a One Direction concert once.',
    joined: new Date('2018-10-10T00:00:00.000Z'),
    image: require('./images/pratyusha-majumder.jpg')
  }
]

export const alumni: Array<MemberDataType> = [
  {
    name: {
      first: 'Dmitri',
      last: 'Brereton'
    },
    position: 'Product Manager',
    description:
      'Memelord by day, asleep by night. Capable of having a conversation using only pusheen stickers. Usually found anywhere but class.',
    joined: new Date('2017-01-01T00:00:00.000Z'),
    image: require('./images/dmitri-brereton.png')
  },
  {
    name: {
      first: 'Karen',
      last: 'Fann'
    },
    position: 'Front-End Developer',
    description:
      'Short stack of pancakes but will break your ankles in basketball. Jasmine tea and aesthetic views keep me happy.',
    joined: new Date('2017-01-01T00:00:00.000Z'),
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
    joined: new Date('2017-01-01T00:00:00.000Z'),
    image: require('./images/jeffrey-chan.png')
  },
  {
    name: {
      first: 'Ken',
      last: 'Gu'
    },
    position: 'Machine Learning Developer',
    description: 'I like to ball and I like to think I can shoot as well Lonzo Ball.',
    joined: new Date('2017-10-10T00:00:00.000Z'),
    image: require('./images/ken-gu.png')
  },
  {
    name: {
      first: 'Boon',
      last: 'Xin Tan'
    },
    position: 'Operations',
    description: 'Enjoy watching people playing game without actually playing it. Malfunctioned without caffeine.',
    joined: new Date('2018-01-01T00:00:00.000Z'),
    image: require('./images/boon-xin-tan.jpg')
  },
  {
    name: {
      first: 'Joss',
      last: 'Glenn'
    },
    position: 'User Researcher',
    description:
      'Writer, less than novice coder,  social rights activist, singer-songwriter, poet, comedienne. Raised by pandas and unicorns.',
    joined: new Date('2018-04-01T00:00:00.000Z'),
    image: require('./images/joss-glenn.png')
  },
  {
    name: {
      first: 'Jimmy',
      last: 'Zhou'
    },
    position: 'Operations',
    description:
      "Aspiring physician. Tried to code and then failed; now I'm premed. Reslife Programmer and Avid Events Planner",
    joined: new Date('2018-01-01T00:00:00.000Z'),
    image: require('./images/jimmy-zhou.jpg')
  }
]

const sortByPosition = positions => (a: MemberDataType, b: MemberDataType): number => {
  const aPosition = positions.indexOf(a.position)
  const bPosition = positions.indexOf(b.position)

  if (aPosition === -1 && bPosition === -1) return 0

  return (aPosition === -1 ? Infinity : aPosition) - (bPosition === -1 ? Infinity : bPosition)
}

export const sortByJoinDate = (a: MemberDataType, b: MemberDataType): number => {
  const aTime = a.joined.getTime()
  const bTime = b.joined.getTime()
  return aTime - bTime
}

type SortComparatorType = (a: MemberDataType, b: MemberDataType) => number

/**
 * Accepts an array of sort comparators and returns a single sort comparator
 * The resulting sort comparator will sort by each criteria in sequential order
 * That is: if the criteria are [A, B, C]
 * It will first try to sort by A
 * If two entities are equal for the A comparator, sort using B, and so on
 */
const makeCompoundSorter = (criteria: Array<SortComparatorType>) => (a: MemberDataType, b: MemberDataType): number => {
  for (let i = 0; i < criteria.length; i += 1) {
    const result = criteria[i](a, b)
    if (result !== 0) {
      return result
    }
  }
  return 0
}

export const sortByAll = makeCompoundSorter([
  sortByPosition(['Product Manager', 'Tech Lead']),
  sortByJoinDate,
  sortByPosition([
    'Full-Stack Developer',
    'Front-End Developer',
    'Back-End Developer',
    'Mobile Developer',
    'Design',
    'Marketing'
  ])
])
