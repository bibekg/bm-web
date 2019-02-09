// @flow

import * as React from 'react'
import { ProfileEditForm } from 'components/ProfileEditForm'

export default function MainSignUp(): React.Element<*> {
  return <ProfileEditForm paginate="process" redirect="/main" />
}
