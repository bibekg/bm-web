// @flow
import axios from 'axios'

export const makeApiRequest = (http, accessToken, data) =>
  axios({
    method: http.METHOD,
    url: http.URL,
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    [http.METHOD.toLowerCase() === 'get' ? 'params' : 'data']: data
  })

export * from './admin'
export * from './user'
export * from './match'
export * from './auth'
