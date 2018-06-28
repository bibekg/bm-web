// @flow

import * as React from 'react'
import styled from 'styled-components'
import Card from 'components/Card'
import Spinner from 'components/Spinner'
import { connect } from 'react-redux'
import { Title } from 'components/typography'
import * as actions from 'actions'
import { colors } from 'styles'
import { Pie as PieChart, Bar as BarChart } from 'react-chartjs'
import { formatUserYear, formatRelationshipType } from 'utilities/user-formatters'

const StatCard = Card.extend`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`

const ViewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  & > * {
    margin: 10px;
  }
`

type PropsType = {
  stats: ?AdminStatsType
}

function AdminStatsPanel(props: PropsType): ?React.Element<*> {
  if (props.stats == null) return <Spinner />
  const { users: userStats, matchFeedbacks: matchStats } = props.stats

  const satisfactionCounts = Array(5).fill(0)
  matchStats.satisfactions.forEach(val => {
    satisfactionCounts[val - 1] += 1
  })

  return (
    <div>
      <ViewWrapper>
        <StatCard>
          <Title>Active Users</Title>
          <PieChart
            data={[
              { value: userStats.active, color: colors.green, label: 'Active' },
              { value: userStats.total - userStats.active, color: colors.red, label: 'Inactive' }
            ]}
          />
        </StatCard>

        <StatCard>
          <Title>Gender</Title>
          <PieChart
            data={[
              { value: userStats.gender.male, color: colors.blue, label: 'Male' },
              { value: userStats.gender.female, color: colors.pink, label: 'Female' },
              { value: userStats.gender['non-binary'] || 0, color: colors.grey, label: 'Non-binary' }
            ]}
          />
        </StatCard>

        <StatCard>
          <Title>Contacted and Met Matches</Title>
          <PieChart
            data={[
              { value: matchStats.met, color: colors.green, label: 'Contacted and Met' },
              { value: matchStats.contacted - matchStats.met, color: colors.blue, label: 'Contacted Only' },
              { value: matchStats.total - matchStats.contacted, color: colors.grey, label: 'Neither' }
            ]}
          />
        </StatCard>

        <StatCard>
          <Title>Year</Title>
          <BarChart
            data={{
              labels: Object.keys(userStats.year).map(formatUserYear),
              datasets: [{ data: Object.values(userStats.year) }]
            }}
            height="250px"
          />
        </StatCard>

        <StatCard>
          <Title>Ethnicity</Title>
          <BarChart
            data={{
              labels: Object.keys(userStats.ethnicity),
              datasets: [{ data: Object.values(userStats.ethnicity) }]
            }}
            height="250px"
          />
        </StatCard>

        <StatCard>
          <Title>Relationship Type</Title>
          <BarChart
            data={{
              labels: Object.keys(userStats.relationshipType).map(formatRelationshipType),
              datasets: [{ data: Object.values(userStats.relationshipType) }]
            }}
            height="250px"
          />
        </StatCard>

        <StatCard>
          <Title>Match Satisfaction</Title>
          <PieChart
            data={[
              { value: satisfactionCounts[0], color: colors.grey, label: '1' },
              { value: satisfactionCounts[1], color: colors.pink, label: '2' },
              { value: satisfactionCounts[2], color: colors.yellow, label: '3' },
              { value: satisfactionCounts[3], color: colors.blue, label: '4' },
              { value: satisfactionCounts[4], color: colors.green, label: '5' }
            ]}
          />
        </StatCard>
      </ViewWrapper>
    </div>
  )
}

const mapStateToProps = (state: ReduxStateType) => ({
  stats: state.admin && state.admin.stats
})

export default connect(mapStateToProps, actions)(AdminStatsPanel)
