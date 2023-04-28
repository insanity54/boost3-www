import ky from 'ky';

export function registerRequestStore(alpine) {
  alpine.store("request", {
    getClient () {
      return ky.create();
    }
  })
}