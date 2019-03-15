// @flow

import profile from './img/profile.png'
import schedule from './img/schedule.png'
import match from './img/match.png'
import recentMatch from './img/recent-matches.jpg'

type DescriptionType = {
  image: string,
  title: string,
  description: string,
  arrangement: boolean
}

const descriptions: Array<DescriptionType> = [
  {
    image: profile,
    title: 'Profile',
    description:
      'Customize your bio with a mix of basic and fun questions. Add your dating preferences to help our algorithm find you the perfect match.',
    arrangement: 'row'
  },
  {
    image: match,
    title: 'Matchmaking',
    description:
      'Receive a curated match every day. Our matchmaking algorithm does all the work for you so you don’t need to keep swiping.',
    arrangement: 'row-reverse'
  },
  {
    image: recentMatch,
    title: 'Recent Matches',
    description:
      "Introducing our newest feature: Forget to contact a match? View all your recent matches on a single page and reach out to them whenever you'd like. 😉",
    arrangement: 'row'
  },
  {
    image: schedule,
    title: 'Scheduler',
    description:
      "Our built-in, simple scheduler feature helps you and your match schedule a date hassle-free. Once you and your match enter your availabilities, you'll receive an email for a scheduled date.",
    arrangement: 'row-reverse'
  }
]

export default descriptions
