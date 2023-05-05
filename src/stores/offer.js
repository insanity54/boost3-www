
export function registerOfferStore(alpine) {
  alpine.store("offer", {
    async getOffer(id) {
      return this.getOffers(id)
    },
    async getOffers(id) {
      console.log(`fetchy offers ${id} from backend:${window.backend}`)
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