import { loadScript } from "@paypal/paypal-js";


export function offer() {
  return {
    id: 3,
    offers: [],
    shippingFee: 342,
    totalPrice () {
      const t = this.offers.reduce((acc, o) => (o.priceCents === null) ? acc : acc + o.priceCents, this.shippingFee)
      return this.formatMoney(t)
    },
    isPaid () {
      return (this.offers[0].order.attributes.status !== 'awaitingPayment')
    },
    isOffer () {
      return (this.offers.length > 0) ? true : false
    },
    isMultiple () {
      return (this.offers.length > 1) ? true : false
    },
    isWinner () {
      if (this.offers[0] === undefined) return false;
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
    async loadPaypal () {
      // load paypal
      let that = this
      try {
        // start to use the PayPal JS SDK script
        const paypal = await loadScript({ "client-id": process.env.PAYPAL_CLIENT_ID })
        console.log(paypal)
        paypal.Buttons({
          style: {
            color: 'blue'
          },
          createOrder() {

            console.log(`Lets create a Paypal order. Our offer id is ${that.id}`)

            // ref https://developer.paypal.com/docs/checkout/standard/integrate/
            // call backend to get an order ID
            return fetch(`${window.backend}/api/buy/create-paypal-order`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${Alpine.store("auth").jwt}`
              },
              // use the "body" param to optionally pass additional order information
              // like product skus and quantities
              body: JSON.stringify({
                offerId: that.id
              }),
            })
            .then((response) => response.json())
            .then((order) => order.id);
          },
          // Finalize the transaction on the server after payer approval
          onApprove(data) {
            console.log(`onApprove! `)
            console.log(data)
            return fetch(`${window.backend}/api/buy/capture-paypal-order`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${Alpine.store('auth').jwt}`
              },
              body: JSON.stringify({
                paypalOrderId: data.orderID
              })
            })
            .then((response) => response.json())
            .then((orderData) => {
              // Successful capture! For dev/demo purposes:
              console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
              const transaction = orderData.purchase_units[0].payments.captures[0];
              that.offers[0].attributes.order.status = 'awaitingShipment' // mark as paid
              // When ready to go live, remove the alert and show a success message within this page. For example:
              // const element = document.getElementById('paypal-button-container');
              // element.innerHTML = '<h3>Thank you for your payment!</h3>';
              // Or go to another URL:  window.location.href = 'thank_you.html';
            });
          }
        }).render('#paypal-buttons-container');
      } catch (e) {
        console.error("failed to load the PayPal JS SDK script", e)
      }
    },
    async init() {
      this.id = Alpine.$router.params.id
      const offers = await Alpine.store("offer").getOffers(this.id)
      this.offers = offers
      
      console.log(offers)
      if (
        this.isOffer() && 
        this.isWinner()
      ) {
        await this.loadPaypal()
      }
    }
  };
}

