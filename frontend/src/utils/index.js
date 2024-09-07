import axios from "axios";

const baseURL = "http://localhost:5000/api";

export const customFetch = axios.create({
  baseURL,
});

export const formatPrice = (price) => {
  let rupee = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  const formattedPrice = rupee.format(price);

  console.log("Rupees: ", formattedPrice);
  return formattedPrice;
};
