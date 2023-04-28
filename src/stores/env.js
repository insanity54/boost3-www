

export function registerEnvStore(alpine) {
  alpine.store("env", {
    backend: ((window.location.hostname === 'localhost') ? 'http://localhost:1337' : 'https://boost3.sbtp.xyz'),
  })
}
