// @flow

import * as React from 'react'
import styled from 'styled-components'
import { Header } from 'components/typography'
import TeamMemberCard from 'components/TeamMemberCard'
import { UpsideDownLightWave } from 'components/waves'
import { currentMembers, alumni, sortByAll } from './TeamData'

const BannerDiv = styled.div`
  padding-top: 70px;
  padding-bottom: 70px;
`

const TeamGrid = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  & > * {
    margin: 20px;
    flex-grow: 1;
  }
`

const AboutWrapper = styled.div`
  padding-bottom: 100px;
`

export default function AboutPage(): React.Element<*> {
  return (
    <div>
      <AboutWrapper>
        <UpsideDownLightWave>
          <BannerDiv>
            <Header>Meet the Team</Header>
          </BannerDiv>

          <TeamGrid>
            {currentMembers
              .sort(sortByAll)
              .map((member: MemberDataType) => (
                <TeamMemberCard key={`${member.name.first} ${member.name.last}`} member={member} />
              ))}
          </TeamGrid>

          <BannerDiv>
            <Header>Alumni</Header>
          </BannerDiv>

          <TeamGrid>
            {alumni
              .sort(sortByAll)
              .map((member: MemberDataType) => (
                <TeamMemberCard key={`${member.name.first} ${member.name.last}`} member={member} />
              ))}
          </TeamGrid>
        </UpsideDownLightWave>
      </AboutWrapper>
    </div>
  )
}
