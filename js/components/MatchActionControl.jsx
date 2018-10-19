// @flow

import * as React from 'react'
import styled from 'styled-components'
import { Title, Text } from 'components/typography'
import AutoDateCard from 'components/AutoDateCard'
import MatchActionButtons from 'components/MatchActionButtons'
import MatchCard from 'components/MatchCard'
import UnmatchedCountdownTimer from 'components/UnmatchedCountdownTimer'
import MatchFeedbackModal from 'components/MatchFeedbackModal'
import moment from 'moment'
import DislikeMatchFeedbackModal from 'components/DislikeMatchFeedbackModal'

const MessageWrapper = styled.div`
  margin: 50px 30px;
`

type PropsType = {
  user: UserType,
  match: MatchType
}

type StateType = {
  availability: Array<Date>,
  showDislikeFeedbackModal: boolean
}

export default class MatchActionControl extends React.Component<PropsType, StateType> {
  matchedUser: UserType

  constructor(props: PropsType) {
    super(props)
    this.state = {
      availability: props.user.availability || [],
      // it's ok to just update state on startup for this, since we only want users to see it once anyway
      showDislikeFeedbackModal: !props.match.participants.self.sawDislikeFeedbackModal
    }
    this.matchedUser = props.match.participants.match.user
  }

  componentWillReceiveProps(nextProps: PropsType) {
    // In the case that either a match becomes mutual and API sends back hidden informationa,
    // or a new match is sent while this component is still active,
    // update the "cached" matchedUser value
    // eslint-disable-next-line no-underscore-dangle
    if (!this.props.match.participants.match.user.name.first || nextProps.match._id !== this.props.match._id) {
      this.matchedUser = nextProps.match.participants.match.user
    }
  }

  closeDislikeMatchModal = () => {
    this.setState({
      showDislikeFeedbackModal: false
    })
  }

  handleAvailabilityChange = (newAvailability: Array<Date>) => {
    this.setState({ availability: newAvailability })
  }

  static renderHaveMatch = (): React.Element<*> => (
    <MessageWrapper>
      <Title>You have a match!</Title>
      <MatchActionButtons />
    </MessageWrapper>
  )

  static renderWaitingForMatch = (): React.Element<*> => (
    <MessageWrapper>
      <Title>Currently waiting for your match to respond</Title>
    </MessageWrapper>
  )

  // both user and match like each other
  renderMatchMade = (): React.Element<*> => (
    <MessageWrapper>
      <Title>{`Congrats! You and ${this.matchedUser.name.first} both liked each other!`}</Title>
      <Text center>What now? Message each other and pick a place or activity!</Text>
    </MessageWrapper>
  )

  // both user and match like each other
  renderRendezvousScheduled = (): React.Element<*> => {
    const { rendezvousTime } = this.props.match
    return (
      <MessageWrapper>
        <Title>
          {rendezvousTime
            ? `Congrats! You and ${this.matchedUser.name.first} have a date on ${moment(rendezvousTime).format(
                'dddd M/D/Y [at] hA'
              )}`
            : `Congrats! You and ${this.matchedUser.name.first} both liked each other!`}
        </Title>
        <Text center>What now? Message each other and pick a place or activity!</Text>
      </MessageWrapper>
    )
  }

  renderUnschedulableRendezvous = (): React.Element<*> => (
    <MessageWrapper>
      <Title>{"Oh no! It looks like your schedules aren't compatible for this week"}</Title>
      <Text center>{`Message ${this.matchedUser.name.first} to ask when they are available for a date!`}</Text>
    </MessageWrapper>
  )

  renderScheduleFirstFindingMatch = (): React.Element<*> => (
    <MessageWrapper>
      <Title>Finding you a match!</Title>
    </MessageWrapper>
  )

  renderScheduleFirstMatchMade = (): React.Element<*> => {
    const { rendezvousTime } = this.props.match
    return (
      <MessageWrapper>
        <Title>You have a date!</Title>
        <Text center>{moment(rendezvousTime).format('dddd M/D/Y [at] hA')}</Text>
        <MatchActionButtons scheduleFirst />
      </MessageWrapper>
    )
  }

  renderScheduleFirstWaitingForRSVP = (): React.Element<*> => (
    <MessageWrapper>
      <Title>Currently waiting for your match to RSVP</Title>
    </MessageWrapper>
  )

  shouldUserSeeMatchCard(): boolean {
    const { match } = this.props
    // Hide match if the user has disliked their match
    if (match.participants.self.likeState === 'disliked') return false
    // If ScheduleFirst, show match if it was successfully scheduled
    if (match.variants.ScheduleFirst) return match.rendezvousState === 'scheduled'
    // Otherwise, show match if it isn't ended
    return match.state !== 'ended'
  }

  renderMatchAction(): ?React.Element<*> {
    const { user, match } = this.props

    const { state: matchState, rendezvousState, participants, variants } = match

    // The following logic should perfectly reflect the flowchart on the BruinMeet Match Flow wiki page:
    // https://github.com/bibekg/Bruin-Meet/wiki/Match-Flow

    // Check match state
    if (matchState === 'ended') {
      if (
        participants.self.likeState === 'liked' && // match was mutual
        participants.match.likeState === 'liked' &&
        participants.self.matchFeedback == null // match feedback has not been given yet
        // The api should guarantee that a 'ended' match delivered to a client requires match feedback
        // but it's a good idea to check here just in case
      ) {
        return <MatchFeedbackModal user={this.props.user} match={this.props.match} />
      } else {
        return <UnmatchedCountdownTimer />
      }
    } else if (matchState === 'active') {
      if (variants.ScheduleFirst) {
        if (rendezvousState === 'unscheduled') {
          if (participants.self.updatedAvailability) {
            return this.renderScheduleFirstFindingMatch()
          } else {
            return <AutoDateCard availability={user.availability} onChange={this.handleAvailabilityChange} />
          }
        } else if (rendezvousState === 'unschedulable') {
          // This should never happen!
          // Backend save me
          return null // TODO: This is a bad boy, we want to know if this happens
        } else if (rendezvousState === 'scheduled') {
          // Date is scheduled
          if (participants.self.likeState === 'disliked') {
            return <UnmatchedCountdownTimer />
          } else if (participants.self.likeState === 'pending') {
            return this.renderScheduleFirstMatchMade()
          } else if (participants.self.likeState === 'liked') {
            if (participants.match.likeState === 'pending' || participants.match.likeState === 'disliked') {
              return this.renderScheduleFirstWaitingForRSVP()
            } else if (participants.match.likeState === 'liked') {
              return this.renderRendezvousScheduled()
            }
          }
        }
      } else if (participants.self.likeState === 'disliked') {
        // No ScheduleFirst variant from here on
        // Check your own like state
        return this.state.showDislikeFeedbackModal ? (
          <DislikeMatchFeedbackModal
            user={this.props.user}
            match={this.props.match}
            onOutClick={this.closeDislikeMatchModal}
          />
        ) : (
          <UnmatchedCountdownTimer />
        )
      } else if (participants.self.likeState === 'pending') {
        return MatchActionControl.renderHaveMatch()
      } else if (participants.self.likeState === 'liked') {
        // Check matched users's like state
        if (participants.match.likeState === 'disliked' || participants.match.likeState === 'pending') {
          return MatchActionControl.renderWaitingForMatch()
        } else if (participants.match.likeState === 'liked') {
          if (variants.AutoDate) {
            if (rendezvousState === 'unschedulable') {
              return this.renderUnschedulableRendezvous()
            } else if (rendezvousState === 'scheduled') {
              return this.renderRendezvousScheduled()
            } else if (participants.self.updatedAvailability) {
              return MatchActionControl.renderWaitingForMatch()
            } else if (user.availability) {
              return <AutoDateCard availability={user.availability} onChange={this.handleAvailabilityChange} />
            }
          } else {
            return this.renderMatchMade()
          }
        }
      }
    }

    // Should not reach here unless some state is VERY broken
    return null
  }

  render(): React.Element<*> {
    const { match } = this.props
    const showContactInfo =
      match.participants.self.likeState === 'liked' && match.participants.match.likeState === 'liked'

    return (
      <div>
        {this.renderMatchAction()}
        {this.shouldUserSeeMatchCard() && (
          <MatchCard
            user={this.matchedUser}
            matchBasis={this.props.match.matchBasis}
            hideContactInfo={!showContactInfo}
          />
        )}
      </div>
    )
  }
}
