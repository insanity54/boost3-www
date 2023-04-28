// greets https://github.com/horikeso/alpinejs-website-with-authentication-example/blob/main/src/stores/auth.js

export function registerAuthStore(alpine) {
  alpine.store("auth", {
    jwt: alpine.$persist(""),
    user_id: alpine.$persist(""),
    username: alpine.$persist(""),
    twitchId: alpine.$persist("")
  })
}