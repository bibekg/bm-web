// @flow
import * as USER_PROPS from 'constants/user-props'

export const formatHeight = (height: UserHeightType): string => `${Math.floor(height / 12)}' ${height % 12}"`

export const formatInstagramLink = (userId: string) => `https://www.instagram.com/${userId}`

export const formatUserYear = (year: number): string =>
  ({
    '1': 'Freshman',
    '2': 'Sophomore',
    '3': 'Junior',
    '4': 'Senior',
    '5': '5th Year+'
  }[year] || 'Unknown')

export const formatRelationshipType = (type: string): string =>
  ({
    short: 'Short-term dating',
    long: 'Long-term dating',
    hookup: 'Hookup',
    friendship: 'Friendship'
  }[type] || 'Unknown')

export const formatGender = (gender: UserGenderType): string => `${gender.slice(0, 1).toUpperCase()}${gender.slice(1)}`

export const formatQuestion = (question: *): string => USER_PROPS.QUESTIONS[question]

export const formatName = (name: UserNameType): string => [name.first, name.middle, name.last].filter(Boolean).join(' ')
