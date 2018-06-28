/* eslint-disable */

type FeedbackType = {
  profileId: string,
  content: string,
  category: FeedbackCategoryType,
  handled: boolean,
  date: Date,
  creator: ?{
    fullName: string,
    profileId: string,
    email: string
  }
}

type FeedbackCategoryType = 'general' | 'deactivation'
