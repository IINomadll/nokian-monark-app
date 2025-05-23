import axios from "axios";
const baseUrl = "http://localhost:3001/api/checkout";

const checkout = (cart) => {
  return axios
    .post(`${baseUrl}/create-checkout-session`, { cart })
    .then((response) => {
      return response.data.url; // return the stripe checkout URL
    })
    .catch((error) => {
      console.error("Error creating checkout session:", error);
      throw error;
    });
};

export default checkout;
