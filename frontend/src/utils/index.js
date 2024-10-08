import axios from "axios";
import { store } from "../store";

const baseURL = process.env.NODE_ENV === 'production'
  ? "https://budgetbuddyfinancemanagement.onrender.com/api"
  : "http://localhost:5000/api"; // for local development
  
export const customFetch = axios.create({
  baseURL,
});

export const formatPrice = (price) => {
  let rupee = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  const formattedPrice = rupee.format(price);

  return formattedPrice;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export const formatToKPrice = (price) => {
  const rupee = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  let formattedPrice;

  if (price > 1000) {
    // Convert price to thousands (k format)
    formattedPrice = `${(price / 1000).toFixed(1)}k`;
  } else {
    formattedPrice = rupee.format(price);
  }

  return formattedPrice;
};
