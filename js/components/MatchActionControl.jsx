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
import { copy } from 'product-copy'
import HoneyPot from 'svg/honey-pot.svg'

const MessageWrapper = styled.div`
  margin: 50px 30px;
`
const Img = styled.img`
  display: block;
  margin: auto;
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
  constructor(props: PropsType) {
    super(props)
    this.state = {
      availability: props.user.availability || [],
      // it's ok to just update state on startup for this, since we only want users to see it once anyway
      showDislikeFeedbackModal: !props.match.participants.self.sawDislikeFeedbackModal
    }
  }

  getMatchedUser(): UserType {
    // Helper method just for avoiding long dot notation
    return this.props.match.participants.match.user
  }

  closeDislikeMatchModal = () => {
    this.setState({
      showDislikeFeedbackModal: false
    })
  }

  handleAvailabilityChange = (newAvailability: Array<Date>) => {
    this.setState({ availability: newAvailability })
  }

  static HaveMatch = (): React.Element<*> => (
    <MessageWrapper>
      <Title>{copy.matchActionControl.haveMatch}</Title>
      <MatchActionButtons />
    </MessageWrapper>
  )

  static WaitingForMatch = (): React.Element<*> => (
    <MessageWrapper>
      <Title>{copy.matchActionControl.matchWaiting}</Title>
    </MessageWrapper>
  )

  static LikedMatch = (): React.Element<*> => (
    <MessageWrapper>
      <Title>{copy.matchActionControl.likedMatch}</Title>
      <Img src={HoneyPot} alt="bear" height={400} width={400} />
      {/* <img src={Bear} alt="bear" height={400} width={400} display="block" margin="auto" /> */}
    </MessageWrapper>
  )

  // both user and match like each other
  static RendezvousScheduled = ({
    matchedUser,
    rendezvousTime
  }: {
    matchedUser: UserType,
    rendezvousTime: Date
  }): React.Element<*> => (
    <MessageWrapper>
      <Title>
        {rendezvousTime
          ? `Congrats! You and ${matchedUser.name.first} have a date on ${moment(rendezvousTime).format(
              'dddd M/D/Y [at] hA'
            )}`
          : `Congrats! You and ${matchedUser.name.first} both liked each other!`}
      </Title>
      <Text center>{copy.matchActionControl.mutualLike}</Text>
    </MessageWrapper>
  )

  static UnschedulableRendezvous = ({ matchedUser }: { matchedUser: UserType }): React.Element<*> => (
    <MessageWrapper>
      <Title>{copy.matchActionControl.scheduleBad}</Title>
      <Text center>{`Message ${matchedUser.name.first} to ask when they are available for a date!`}</Text>
    </MessageWrapper>
  )

  shouldUserSeeMatchCard(): boolean {
    const { match } = this.props
    // Hide match if the user has responsed to their match in that cycle
    if (match.participants.self.likeState !== 'pending' && match.rendezvousState === 'schedule-next-cycle') return false
    // Otherwise, show match if it isn't ended
    return match.state !== 'ended'
  }

  renderMatchAction(): ?React.Element<*> {
    const { user, match } = this.props

    const { state: matchState, rendezvousState, participants } = match

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
      if (participants.self.likeState === 'disliked') {
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
        return <MatchActionControl.HaveMatch />
      } else if (participants.self.likeState === 'liked') {
        // Check matched users's like state
        if (participants.match.likeState === 'disliked' || participants.match.likeState === 'pending') {
          return <MatchActionControl.LikedMatch />
        } else if (participants.match.likeState === 'liked') {
          if (rendezvousState === 'unschedulable') {
            return <MatchActionControl.UnschedulableRendezvous matchedUser={this.getMatchedUser()} />
          } else if (rendezvousState === 'scheduled') {
            return (
              <MatchActionControl.RendezvousScheduled
                matchedUser={this.getMatchedUser()}
                rendezvousTime={this.props.match.rendezvousTime}
              />
            )
          } else if (rendezvousState === 'schedule-next-cycle') {
            return <MatchActionControl.LikedMatch />
          } else if (rendezvousState === 'unscheduled') {
            if (participants.self.updatedAvailability) {
              return <MatchActionControl.WaitingForMatch />
            } else if (user.availability) {
              return <AutoDateCard availability={user.availability} onChange={this.handleAvailabilityChange} />
            }
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
            user={this.getMatchedUser()}
            matchBasis={this.props.match.matchBasis}
            hideContactInfo={!showContactInfo}
            foldable
          />
        )}
      </div>
    )
  }
}
