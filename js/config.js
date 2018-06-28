// @flow

export default {
  FB: {
    APP_ID: {
      development: '2239064522786546',
      staging: '129957770884342',
      production: '1821277464763864'
    }[process.env.NODE_ENV || 'development']
  }
}
