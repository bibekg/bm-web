// @flow

type FaqType = {
  question: string,
  answer: string
}

const faqs: Array<FaqType> = [
  {
    question: 'How will I know if I get matched?',
    answer:
      "Nope, you don't have to keep checking the match page. You will receive an e-mail from BruinMeet when you get matched with someone."
  },
  {
    question: 'How frequently will I receive new matches?',
    answer: 'We currently create new matches once per week.'
  },
  {
    question: 'Why does my countdown timer keep resetting?',
    answer:
      'Bruin Meet currently has a small member pool so not everyone can get matched each round. To increase your chances of getting a match, make sure your profile is fully filled out so that we can better compare your compatibility with other students.'
  },
  {
    question: "Why is my match's name hidden?",
    answer: "We hide your match's name until you've both liked each other in order to protect your privacy."
  },
  {
    question: 'Can I sign up or log in with something other than Facebook?',
    answer: 'At the moment, we only support Facebook log-in but plan to add other log-in methods in the future.'
  },
  {
    question: 'Can I change my profile picture from my default Facebook picture?',
    answer:
      'Yes you can! Go to the Profile page, press Edit, then press the profile picture on the edit form to upload a custom profile picture.'
  },
  {
    question: 'Why does the feedback form keep showing up even though I already submitted feedback?',
    answer:
      'Thank you for submitting feedback and helping us improve BruinMeet! The feedback form will always show up in case you ever have any concerns/questions but is completely optional.'
  },
  {
    question: "How do I temporarily deactivate my account so I don't get matched?",
    answer:
      'You can deactivate your account by clicking "Deactivate" on the Profile page. Upon clicking it, you will be logged out. If you log in again, your account will be reactivated.'
  },
  {
    question: 'How do I completely delete my account?',
    answer: 'If you want to completely delete your BruinMeet account, please e-mail us at support@bruinmeet.com'
  }
]

export default faqs
