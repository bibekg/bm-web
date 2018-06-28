// @flow

import group from './img/group.svg'
import calendar from './img/calendar.svg'
import heart from './img/heart.svg'

type FeatureType = {
  image: string,
  title: string,
  description: string
}

const features: Array<FeatureType> = [
  {
    image: group,
    title: 'Matchmaking',
    description:
      'We give you one good match every week based on a variety of attributes including your interests, bio, and preferences.'
  },
  {
    image: calendar,
    title: 'Dating',
    description:
      'No more awkward ice-breaking conversations. When you get matched, we set you up on a date so you can find your spark IRL.'
  },
  {
    image: heart,
    title: 'Connection',
    description: 'With this streamlined process, you go from the app, to a date, to a real connection in no time.'
  }
]

export default features
