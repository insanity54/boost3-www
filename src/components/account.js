export function account() {
  return {
    offers: [],
    async init () {
      const res = await Alpine.store('offer').getOffers()
      this.offers = res.data
      console.log(this.offers)
    },
    getOfferUrl(offer) {
      return `/offer/${offer.id}`
    }
  }
}