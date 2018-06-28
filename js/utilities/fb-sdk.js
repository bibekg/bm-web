// @flow

/* global FB */
import CONFIG from 'config'

export const initializeFBSDK = (callback: () => void) => {
  window.fbAsyncInit = () => {
    FB.init({
      appId: CONFIG.FB.APP_ID,
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v2.11',
      cookie: true
    })
    callback()
  }

  /* eslint-disable */
  ;(function(d, s, id) {
    const fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) {
      return
    }
    const js = d.createElement(s)
    js.id = id
    js.src = 'https://connect.facebook.net/en_US/sdk.js'
    // flow-disable-next-line
    fjs.parentNode.insertBefore(js, fjs)
  })(document, 'script', 'facebook-jssdk')
  /* eslint-enable */
}
