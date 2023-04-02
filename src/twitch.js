
const clientId = process.env.TWITCH_CLIENT_ID;
const authorizeUrl = 'https://sakuraboost3.sbtp.xyz/api/connect/twitch'
const scopes = "user:read:email"


export default () => ({
  isLoggedIn: false,
  clientId: clientId,
  login() {
    window.location = authorizeUrl
  }
})