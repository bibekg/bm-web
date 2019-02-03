// @flow
export const requiredValue = value =>
  // eslint-disable-next-line eqeqeq
  value == undefined || value.length === 0 ? 'The above field cannot be empty.' : undefined

export const requiredValueArray = (value: [boolean]) =>
  value.filter(v => v === true).length === 0 ? 'You must select at least one item for the above field.' : undefined

export const phoneNumberFormat = value =>
  // eslint-disable-next-line eqeqeq
  value == undefined || !/^\d{10}$/.test(value) ? 'Invalid phone number.' : undefined
