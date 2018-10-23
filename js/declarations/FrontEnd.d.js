// @flow
/* eslint-disable */

import * as React from 'react'

type FaqType = {
  question: string,
  answer: string
}

type MemberDataType = {
  name: {
    first: string,
    last: string
  },
  position: string,
  description: string,
  joined: Date,
  image: string
}

type PageRouteType = {
  component: React.Element<*>,
  path: string,
  exact?: boolean,
  requireAuth?: boolean,
  requireAdmin?: boolean,
  showNavBar?: boolean
}

type StaticTextContentType = {
  title: string,
  content: Array<*>
}

type AdminStatsType = {
  matchFeedbacks: {
    total: number,
    met: number,
    contacted: number,
    satisfactions: [number]
  },
  users: {
    active: number,
    total: number,
    gender: { [UserGenderType]: number },
    year: { [UserYearType]: number },
    ethnicity: { [UserEthnicityType]: number },
    relationshipType: { [UserRelationshipType]: number }
  }
}
