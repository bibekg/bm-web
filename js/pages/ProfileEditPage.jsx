// @flow

import * as React from 'react'
import PageContainer from 'components/PageContainer'
import { Header } from 'components/typography'
import { colors, sizes } from 'styles'
import ProfileEditForm from 'components/ProfileEditForm/ProfileEditForm'

const PageWrapper = PageContainer({
  noBackground: true,
  maxWidth: {
    large: `${sizes.profileEditWidth}px`
  }
}).extend`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.white};
  & > * {
    width: 100%;
  }
`

export default function ProfileEditPage(): React.Element<*> {
  return (
    <PageWrapper>
      <Header>Edit your profile</Header>
      <ProfileEditForm paginate="menu" redirect="/profile" />
    </PageWrapper>
  )
}
