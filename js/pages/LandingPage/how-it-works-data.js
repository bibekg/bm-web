// @flow

import group from './img/group.svg'
import calendar from './img/calendar.svg'
import heart from './img/heart.svg'

type DescriptionType = {
  image: string,
  title: string,
  description: string,
  arrangement: boolean
}

const descriptions: Array<DescriptionType> = [
  {
    image: group,
    title: 'Profile',
    description: 'Customize and edit your profile. Customize and edit your profile. Customize and edit your profile.',
    arrangement: 'row'
  },
  {
    image: calendar,
    title: 'Matchmaking',
    description:
      'Receive a curated match every day. Our matchmaking algorithm does all the work for you so you don’t need to keep swiping.',
    arrangement: 'row-reverse'
  },
  {
    image: heart,
    title: 'Recent Matches',
    description:
      'View all your recent matches on one page. View all your recent matches on one page. View all your recent matches on one page.',
    arrangement: 'row'
  }
]

export default descriptions
