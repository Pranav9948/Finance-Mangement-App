import React, { useEffect, useState } from "react";

import "rsuite/dist/rsuite.min.css";

import PrimaryButton from "../Components/PrimaryButton";
import { Form, Link, redirect, useLoaderData } from "react-router-dom";
import { FormInput } from "../Components";
import SelectBox from "../Components/SelectBox";

import CategorySelectBox from "../Components/CategorySelectBox";
import DatePicker from "../Components/DatePicker";
import { customFetch, formatDate, formatPrice } from "../utils";
import { FaSmile } from "react-icons/fa";
import { FaAngry } from "react-icons/fa";
import { createNewtransaction } from "../features/transactions/TransactionSlice";
import { setuser } from "../features/users/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

export const action =
  (store) =>
  async ({ request, params }) => {
  

    const userInfo = store.getState()?.userState?.userInfo;

    const userId = userInfo?._id;

    const formdata = Object.fromEntries(await request.formData());


    try {
      const { data } = await customFetch.put(
        `/transactions/${params.id}`,
        formdata,
        {
          headers: { "user-id": userId },
        }
      );

      const { transaction, user, message } = data;

      if (message) {
        toast.error("Insufficent Balance");
        return "hello";
      }

      toast.success("transactions updated successfully");
      return redirect("/transactions");
    } catch (err) {
      let errorMsg = err?.response?.data?.message;
      console.error(errorMsg);
      toast.error(errorMsg);

      return err;
    }
  };

export const loader =
  (store) =>
  async ({ params, request }) => {
    const userInfo = store.getState()?.userState?.userInfo;

    const userId = userInfo?._id;

    const { id } = params;

    try {
      const { data } = await customFetch.get(`/transactions/${id}`, {
        headers: {
          "user-id": userId,
        },
      });

      return data;
    } catch (err) {
      console.log(err);

      let errorMsg = err?.response?.data?.message;
      console.error(errorMsg);
      toast.error(errorMsg);

      return err;
    }
  };

const EditTransactions = () => {
  const data = useLoaderData();



  const [merchantName, setMerchantName] = useState(data?.name || "");
  const [category, setCategory] = useState(data?.category || "");
  const [transactionType, setTransactionType] = useState(data?.type || "");
  const [amount, setAmount] = useState(data?.amount || 0);
  const [date, setDate] = useState(data?.date || new Date());
  const [merchantImage, setMerchantImage] = useState(
    data?.image ||
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg"
  );

  // Debounce the API call to prevent multiple calls for quick typing
  const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const transactionTypeData = [
    {
      id: 2,
      type: "Credit",
    },
    {
      id: 1,
      type: "Debit",
    },
  ];
  // Handle Merchant Name Change
  const handleMerchantChange = (e) => {
    const merchant = e.target.value;
    setMerchantName(merchant);
    if (merchant.length > 2) {
      debounce(fetchImageFromUnsplash(merchant), 500);
    }
  };

  // Unified function to fetch the image from Unsplash
  const fetchImageFromUnsplash = async (query) => {
    try {
      const { data } = await axios.get(
        `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${
          import.meta.env.VITE_REACT_APP_UNSPLASH_API_ACCESS_KEY
        }`
      );
      const imageUrl = data?.results[0]?.urls?.small_s3;

      if (imageUrl) {
        setMerchantImage(imageUrl);
      } else {
        const { data } = await axios.get(
          `https://api.unsplash.com/search/photos?page=1&query=${category}&client_id=${
            import.meta.env.VITE_REACT_APP_UNSPLASH_API_ACCESS_KEY
          }`
        );
        const imageUrl = data?.results[0]?.urls?.small_s3;

        if (imageUrl) {
          setMerchantImage(
            imageUrl ||
              "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg"
          );
        }
      }
    } catch (err) {
      console.error("Error fetching image from Unsplash", err);
    }
  };

  // Handle Category Change
  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    if (!merchantImage) {
      debounce(fetchImageFromUnsplash(selectedCategory), 500);
    }
  };

  // Handle Transaction Type Change
  const handleTransactionTypeChange = (e) => {
    setTransactionType(e.target.value);
  };

  // Handle Amount Change
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  // Handle Date Change
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  function convertToNormalDate(isoDateString) {
    const date = new Date(isoDateString);

    // Options for formatting the date
    const options = { year: "numeric", month: "long", day: "numeric" };

    // Return the formatted date
    return date.toLocaleDateString("en-US", options);
  }

  // Example usage
  const isoDateString = "2022-01-04T18:30:00.000Z";
  const normalDate = convertToNormalDate(isoDateString);


  return (
    <div className="bg-[#F8F4F0] ">
      <div className="small-main-menu-container  large-main-menu-container h-full  ">
        <div className="flex flex-col py-10 w-full my-10 justify-center items-center bg-white rounded-md shadow-sm px-7 mobile:px-10 smallDekstop:px-20 largeDekstop:px-28">
          <h5 className="capitalize text-xl font-bold ">Edit transaction</h5>

          <div className="bg-slate-400 w-32 h-32 rounded-full my-8 overflow-hidden ">
            <img
              src={data?.image}
              alt="merchantimage"
              className="w-full h-full"
            />
          </div>

          <div className=" w-full">
            <Form method="post">
              <div className="grid grid-cols-1 smallTablet:grid-cols-2  smallTablet:gap-6 smallDekstop:gap-10">
                <div className="w-full max-w-full ">
                  <FormInput
                    label="merchant"
                    type="text"
                    name="name"
                    value={merchantName}
                    onChange={handleMerchantChange}
                  />
                </div>

                <div className="mt-4 smallTablet:mt-0 w-full max-w-full ">
                  <CategorySelectBox
                    onChange={handleCategoryChange}
                    selected={category}
                  />
                </div>

                <div className="mt-4 smallTablet:mt-0  w-full max-w-full ">
                  <SelectBox
                    label={"choose type of transaction"}
                    id="transactionType"
                    name="type"
                    datas={transactionTypeData}
                    value={transactionType}
                  />
                </div>

                <div className="mt-4 smallTablet:mt-0 w-full max-w-full">
                  <FormInput
                    label="Amount"
                    type="number"
                    name="amount"
                    value={amount}
                    onChange={handleAmountChange}
                  />
                </div>

                <div>
                  <input type="hidden" name="image" value={merchantImage} />
                </div>

                <div className="my-8 smallTablet:my-0 w-full max-w-full smallTablet:flex smallTablet:justify-center smallTablet:items-end">
                  <PrimaryButton
                    bg={"bg-black"}
                    text={"Update Transaction"}
                    color={"text-white"}
                    type={"submit"}
                  />
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTransactions;
