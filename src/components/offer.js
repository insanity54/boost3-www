export function offer() {
  return {
    id: 3,
    offers: [],
    isWinner () {
      if (this.offers.length === 0) return false;
      return Alpine.store("auth").twitchId == this.offers[0].winnerId
    },
    getOfferUrl (id) {
      return `${window.frontend}/offer/${id}`
    },
    getCheckoutUrl () {
      return `${window.backend}/api/buy/order`
    },
    formatMoney (priceInCents) {
      if (!priceInCents) return null
      const formattedPrice = (priceInCents / 100).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      return formattedPrice
    },
    async checkout() {
      Snipcart.api.theme.cart.open()
    },
    async addToCart() {

      // create a ProductDefinition for each offer in offers

      const productDefinitions = this.offers.map((o) => {
        console.log(o.id)
        return {
          id: o.id,
          name: o.title,
          price: o.priceCents,
          url: this.getOfferUrl(o.id),
          image: o.image,
          shippable: true,
          taxable: true,
          stackable: "never",
          maxQuantity: 1
        }
      })

      try {
        await Snipcart.api.cart.items.replace(...productDefinitions);

      } catch (error) {
        console.log(error)
      }
    },
    async init() {
      this.id = Alpine.$router.params.id
      const offers = await Alpine.store("offer").getOffer(this.id)
      this.offers = offers
      if (this.isWinner()) {

        // load snipcart
        document.addEventListener('snipcart.ready', () => {
          this.addToCart()
        })
        window.LoadSnipcart()
      }
    }
  };
}

