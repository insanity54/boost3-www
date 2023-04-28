export function registerErrorStore(alpine) {
  alpine.store("error", {
    errors: [],
    async add (e) {
      this.errors.push(e)
    }
  })
}