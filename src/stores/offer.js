
export function registerOfferStore(alpine) {
  alpine.store("offer", {
    async getOffer(id) {
      console.log(`fetchy offer ${id} from backend:${window.backend}`)
      const res = await fetch(encodeURI(`${window.backend}/api/scoped-offer/${id}`), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${alpine.store('auth').jwt}`
        }
      })
      return res.json()
    }
  })
}