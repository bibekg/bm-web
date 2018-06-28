// @flow

type PositionType = {
  title: string,
  description: string,
  responsibilities: Array<string>,
  applicationLink: string
}

const positions: Array<PositionType> = [
  {
    title: 'Marketing',
    description:
      "Marketing isn't about making Facebook posts, it’s about sending a message. In addition to the usual facebook posts and flyering, you will think of creative ways to spread the word about BruinMeet. You will also have to maintain a consistent voice in all marketing material.",
    responsibilities: [
      'Think of creative ways to spread the word about BruinMeet',
      'Maintain a consistent voice in all marketing material'
    ],
    applicationLink: 'https://goo.gl/forms/1SreATSJuNCt3Dpj2'
  },
  {
    title: 'Social Media / Photography',
    description:
      'Your job is to promote BruinMeet indirectly. Instead of promoting the website or product, you will be promoting the BruinMeet name.',
    responsibilities: [
      'Come up with creative ways to promote our Facebook page',
      'Start a series on our facebook page that involves interacting with people IRL. (Think of ‘Humans of UCLA’)',
      'Take our Facebook page from 100 likes to 10,000 likes'
    ],
    applicationLink: 'https://goo.gl/forms/JSsc9VAyrh6xs8nU2'
  },
  {
    title: 'Operations',
    description:
      'As operations your job is to make things happen. You will be coordinating fun and potentially large scale events.',
    responsibilities: ['Make it happen', 'Coordinate large scale events', 'Handle crazy logistics'],
    applicationLink: 'https://goo.gl/forms/FP92qdD10FBaHVXc2'
  }
]

export default positions
