export function auth() {
  return {
    username: Alpine.store('auth').username,
    twitchId: Alpine.store('auth').twitchId,
    errors: [],
    isLoggedIn() {
      return (Alpine.store('auth').jwt === '') ? false : true
    },
    logOut() {
      console.log(`Logging out! loggedIn?:${this.isLoggedIn()}`)
      Alpine.store('auth').jwt = ''
      this.username = ''
    },
    init() {
      console.log(`alpine path:${Alpine.$router.path}`)
      if (Alpine.$router.path === '/connect/redirect') {
        this.redirect()
      }
    },
    async redirect() {
      console.log('redirecting!')

      // load access_token and refresh_token from qs if possible
      
      let accessToken = Alpine.$router.query.access_token;
      let refreshToken = Alpine.$router.query.refresh_token;

      if (!accessToken || !refreshToken) {
        if (!accessToken) {
          this.errors.push('access_token is missing!')
        }

        if (!refreshToken) {
          this.errors.push('refresh_token is missing!')
        }
        return
      }

      try {
        const res = await fetch(`${Alpine.store('env').backend}/api/auth/twitch/callback?access_token=${accessToken}`)

        const json = await res.json()

        console.log(json)

        if (json?.jwt === undefined) {
          this.errors.push('token was missing in response from server')
        } else {
          Alpine.store("auth").jwt = json.jwt;
          Alpine.store("auth").user_id = json.user.id;
          Alpine.store("auth").username = json.user.username;
          Alpine.store("auth").twitchId = json.user.twitchId;
        }


        Alpine.$router.push('/account')
      } catch (e) {
        this.errors.push(e)
      }

      

    }
  };
}

