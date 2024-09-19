import React, { useEffect, useState } from "react";
import SearchBar from "../Components/SearchBar";
import { FaFilterCircleDollar, FaSort, FaSpa } from "react-icons/fa6";
import { ImSortAmountAsc } from "react-icons/im";
import { FaSortAlphaDownAlt, FaSortAlphaUp } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import Dropdown from "rsuite/Dropdown";
import "rsuite/dist/rsuite.min.css";
import { FcNegativeDynamic, FcPositiveDynamic } from "react-icons/fc";
import PrimaryButton from "../Components/PrimaryButton";
import { Form, Link, useLoaderData } from "react-router-dom";
import { FormInput } from "../Components";
import SelectBox from "../Components/SelectBox";
import axios from "axios";
import CategorySelectBox from "../Components/CategorySelectBox";
import DatePicker from "../Components/DatePicker";
import { customFetch, formatDate, formatPrice } from "../utils";
import { FaSmile } from "react-icons/fa";
import { FaAngry } from "react-icons/fa";
import {
  listAllTransactions,
  createNewtransaction,
  sortAscendingTransaction,
  sortDescendingTransaction,
  getAllCreditTransactions,
  getAllDebitTransactions,
  getAllTransactions,
  searchTransactions,
  deleteTransactions,
} from "../features/transactions/TransactionSlice";
import { setuser } from "../features/users/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import OverviewCard from "../Components/OverviewCard";

export const action =
  (store) =>
  async ({ request, params }) => {
    const userInfo = store.getState()?.userState?.userInfo;

    const userId = userInfo?._id;

    const formdata = Object.fromEntries(await request.formData());

    console.log("form", formdata);

    try {
      const { data } = await customFetch.post("/transactions", formdata, {
        headers: { "user-id": userId },
      });

      const { transaction, user, message } = data;

      store.dispatch(createNewtransaction(transaction));
      store.dispatch(setuser(user));

      if (message) {
        toast.error("Insufficent Balance");
        return "hello";
      }

      toast.success("transactions made successfully");

      return "hello";
    } catch (err) {
      let errorMsg = err?.response?.data?.message;
      console.error(errorMsg);
      toast.error(errorMsg);

      return err;
    }
  };

export const loader =
  (store) =>
  async ({ request, params }) => {
    try {
      const userInfo = store.getState()?.userState?.userInfo;

      const userId = userInfo?._id;

      const { data } = await customFetch.get("/transactions", {
        headers: {
          "user-id": userId,
        },
      });

      store.dispatch(listAllTransactions(data));

      return data;
    } catch (err) {
      let errorMsg = err?.response?.data?.message;
      console.error(errorMsg);
      toast.error(errorMsg);
      return err;
    }
  };

const Transactions = () => {
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

  const dispatch = useDispatch();

  const [merchantName, setMerchantName] = useState("");
  const [category, setCategory] = useState("");
  const [merchantImage, setMerchantImage] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg"
  );
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  const [sortOption, setSortOption] = useState("Sort by");
  const [categoryOption, setCategoryOption] = useState("AllTransactions");
  const [allCategories, setCategories] = useState([]);

  const transactionData = useLoaderData();

  const { transactions } = useSelector((state) => state?.transactionState);

  const { username, currentBalance, income, expense } = useSelector(
    (state) => state?.userState?.userInfo
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

  // Handle Merchant Name Change
  const handleMerchantChange = (e) => {
    const merchant = e.target.value;
    setMerchantName(merchant);
    if (merchant.length > 2) {
      debounce(fetchImageFromUnsplash(merchant), 500); // Debounce to prevent multiple API calls
    }
  };

  // Handle Category Change
  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    if (!merchantImage) {
      debounce(fetchImageFromUnsplash(selectedCategory), 500);
    }
  };

  const getSearchResults = (searchText) => {
    dispatch(searchTransactions(searchText));
  };

  const handleTransactions = (option, dispacthFn) => {
    setSortOption(option);
    dispatch(dispacthFn());
  };

  const handleCategory = (option, dispacthFn) => {
    setCategoryOption(option);
    dispatch(dispacthFn());
  };

  const fetchAllCategories = async () => {
    try {
      const { data } = await customFetch.get("/transactions/getcategories");

    
      
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  // UseEffect to trigger an image update if either the merchant or category changes
  useEffect(() => {
    if (merchantName) {
      fetchImageFromUnsplash(merchantName);
    } else if (category) {
      fetchImageFromUnsplash(category);
    }
  }, [merchantName, category]);

  useEffect(() => {
    fetchAllCategories();
  }, []);

 

  return (
    <div className="bg-[#F8F4F0] ">
      <div className="small-main-menu-container  large-main-menu-container h-full  ">
        {showTransactionModal ? (
          <div className="flex flex-col py-10 w-full my-10 justify-center items-center bg-white rounded-md shadow-sm px-7 mobile:px-10 smallDekstop:px-20 largeDekstop:px-28">
            <h5 className="capitalize text-xl font-bold ">
              create new transaction
            </h5>

            <div className="bg-slate-400 w-32 h-32 rounded-full my-8 overflow-hidden ">
              <img
                src={merchantImage}
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
                      onChange={handleMerchantChange}
                    />
                  </div>

                  <div className="mt-4 smallTablet:mt-0 w-full max-w-full ">
                    <CategorySelectBox
                      onChange={handleCategoryChange}
                      allCategories={allCategories}
                      label={"choose category of merchant"}
                      name={"category"}
                    />
                  </div>

                  <div className="mt-4 smallTablet:mt-0  w-full max-w-full ">
                    <SelectBox
                      label={"choose type of transaction"}
                      id="transactionType"
                      name="type"
                      datas={transactionTypeData}
                    />
                  </div>

                  <div className="mt-4 smallTablet:mt-0 w-full max-w-full ">
                    <DatePicker label={"choose Date"} name={'date'} />
                  </div>

                  <div className="mt-4 smallTablet:mt-0 w-full max-w-full">
                    <FormInput label="Amount" type="number" name="amount" />
                  </div>

                  <div>
                    <input type="hidden" name="image" value={merchantImage} />
                  </div>

                  <div className="my-8 smallTablet:my-0 w-full max-w-full smallTablet:flex smallTablet:justify-center smallTablet:items-end">
                    <PrimaryButton
                      bg={"bg-black"}
                      text={"Create Transaction"}
                      color={"text-white"}
                      type={"submit"}
                    />
                  </div>
                </div>
              </Form>
            </div>
          </div>
        ) : (
          <div className="card-container  py-6">
            <div className="flex flex-col smallTablet:flex-row items-center justify-between gap-4 py-8 ">
              <h3 className="capitalize text-[#201f24] font-sans font-bold leading-10 text-3xl smallTablet:text-4xl smallDekstop:text-5xl">
                Transactions
              </h3>

              <div onClick={() => setShowTransactionModal(true)}>
                <PrimaryButton
                  bg={"bg-black"}
                  text={"+ Add New Transaction"}
                  color={"text-white"}
                />
              </div>
            </div>

            <div>
              {/* first section---balance, income, expenses */}

              <div className="flex flex-col smallTablet:flex-row gap-6  w-full max-w-full my-10">
                {/* card-1 */}

                <OverviewCard
                  bg={"black"}
                  color={"white"}
                  text={"Current Balance"}
                  amount={formatPrice(currentBalance)}
                />

                {/* card-2 */}

                <OverviewCard
                  bg={"white"}
                  color={"black"}
                  text={"Income"}
                  amount={formatPrice(income)}
                />

                {/* card-3 */}

                <OverviewCard
                  bg={"white"}
                  color={"black"}
                  text={"Expenses"}
                  amount={formatPrice(expense)}
                />
              </div>
            </div>

            {/* search-filter-container */}

            <div className="bg-white py-6">
              <div className=" grid grid-cols-1 gap-4 smallTablet:grid-cols-2 mb-6  px-5 ">
                {/* search-bar */}

                <SearchBar
                  title={"search Transactions"}
                  getSearchResults={getSearchResults}
                />

                {/* sorting icon only on mobile devices */}

                <div className="flex flex-col   gap-3 mobile:flex-row items-start mobile:items-center mobile:gap-3 justify-between  smallTablet:justify-around">
                  <Dropdown title={sortOption} icon={<FaSort />}>
                    <Dropdown.Item
                      icon={<FaSortAlphaUp />}
                      onClick={() =>
                        handleTransactions("Latest", sortDescendingTransaction)
                      }
                    >
                      Latest
                    </Dropdown.Item>
                    <Dropdown.Item
                      icon={<FaSortAlphaDownAlt />}
                      onClick={() =>
                        handleTransactions("Oldest", sortAscendingTransaction)
                      }
                    >
                      Oldest
                    </Dropdown.Item>
                  </Dropdown>

                  {/* filter icon only in mobile devices */}

                  <Dropdown title={categoryOption} icon={<MdCategory />}>
                    <Dropdown.Item
                      icon={<GrTransaction />}
                      onClick={() =>
                        handleCategory("All Transactions", getAllTransactions)
                      }
                    >
                      AllTransactions
                    </Dropdown.Item>
                    <Dropdown.Item
                      icon={<FcNegativeDynamic />}
                      onClick={() =>
                        handleCategory("Debited", getAllDebitTransactions)
                      }
                    >
                      Debited
                    </Dropdown.Item>
                    <Dropdown.Item
                      icon={<FcPositiveDynamic />}
                      onClick={() =>
                        handleCategory("Credited", getAllCreditTransactions)
                      }
                    >
                      Credited
                    </Dropdown.Item>
                  </Dropdown>
                </div>
              </div>

              {/* table */}

              <table className="table table-zebra w-full">
                {/* head */}

                <thead className="w-full ">
                  <tr className="w-full hidden smallTablet:grid grid-cols-10 grid-rows-2 w-full  ">
                    <th className="col-start-1 col-end-3 row-start-1 row-end-2 flex justify-center items-center">
                      <div className="text-[#696868] font-sans text-xs font-normal leading-4">
                        Recipient / Sender
                      </div>
                    </th>

                    <th className="col-start-5 col-end-7 flex justify-start items-center">
                      <div className="text-[#696868] font-sans text-xs font-normal leading-4">
                        Category
                      </div>
                    </th>

                    <th className="col-start-7 col-end-8 flex justify-end items-center">
                      <div className="text-[#696868] font-sans text-xs font-normal leading-4">
                        Transaction Date
                      </div>
                    </th>

                    <th className="col-start-9 col-end-10 flex justify-end items-center">
                      <div className="text-[#696868] font-sans text-xs font-normal leading-4">
                        Amount
                      </div>
                    </th>
                  </tr>
                </thead>

                {/* body */}

                <>
                  {transactions.length > 0 ? (
                    <>
                      {transactions?.map((data, idx) => {
                        return (
                          <tbody key={idx} className="w-full  shadow-sm  ">
                            <Link to={`/transactions/${data._id}`}>
                              {" "}
                              <tr
                                className="w-full cursor-pointer smallTablet:hidden grid grid-cols-5 grid-rows-2 px-1 py-4 w-full smallTablet:grid-cols-6 smallTablet:grid-rows-1  "
                                key={data.img}
                              >
                                {/* icon */}
                                <td className="col-start-1 col-end-2 row-start-1 row-end-3 flex  justify-center items-center   p-0    ">
                                  <img
                                    src={data.image}
                                    alt="image"
                                    className="w-14 h-14 flex rounded-full  "
                                  />
                                </td>

                                {/* name, category */}

                                <td className="col-start-2 col-end-5 row-start-1 row-end-3 smallTablet:col-start-2 smallTablet:col-end-5 flex flex-col justify-center smallTablet:row-start-1  smallTablet:row-end-2  items-start ml-4 ">
                                  {/* name */}
                                  <div className="col-start-2 col-end-4 row-start-1 row-end-2  grid place-content-start place-items-end smallTablet:col-start-2 w-full smallTablet:col-end-4 smallTablet:row-start-1  smallTablet:row-end-2  p-0 text-[#201F24] font-sans text-sm font-bold leading-5 mb-1">
                                    {data.name}
                                  </div>

                                  {/* category */}
                                  <div className="col-start-2 col-end-4 row-start-2 row-end-3 smallTablet:col-start-4 w-full smallTablet:row-start-1  smallTablet:row-end-2 smallTablet:col-end-5 p-0 text-[#696868] font-sans text-xs font-normal leading-5">
                                    {data.category}
                                  </div>
                                </td>

                                {/* amount, date */}

                                <td className="col-start-4 col-end-6 row-start-1 row-end-3 flex flex-col gap-1 smallTablet:col-start-5 smallTablet:col-end-7 justify-center items-center">
                                  {/* name */}
                                  <div className="col-start-5 col-end-6 row-start-1 row-end-2 smallTablet:col-start-6 smallTablet:col-end-7">
                                    <div
                                      className={`${
                                        data.type === "Credit"
                                          ? "text-[#277C78]"
                                          : "text-red-600"
                                      } flex items-center gap-3 p-0  font-sans text-sm font-bold leading-5 mb-1 `}
                                    >
                                      {data.type === "Credit" ? (
                                        <FaSmile className="text-lg font-semibold text-yellow-400" />
                                      ) : (
                                        <FaAngry className="text-orange-500 text-lg font-semibold" />
                                      )}{" "}
                                      {formatPrice(data.amount)}
                                    </div>
                                  </div>

                                  {/* name */}
                                  <div className="col-start-4 col-end-6 row-start-2 row-end-3 smallTablet:col-start-5 smallTablet:col-end-6">
                                    <div className="p-0 text-[#696868] font-sans text-xs font-normal leading-4">
                                      {formatDate(data.date)}
                                    </div>
                                  </div>
                                </td>

                                {/* * */}
                              </tr>
                            </Link>

                            {/* only on tablet devices */}
                            <Link to={`/transactions/${data._id}`}>
                              <tr
                                className=" hidden cursor-pointer smallTablet:grid   px-1 py-4  w-full smallTablet:grid-cols-7 smallTablet:grid-rows-1  "
                                key={data.image}
                              >
                                {/* icon */}
                                <td className="smallTablet:col-start-1 smallTablet:col-end-2 row-start-1 row-end-3  p-0  overflow-hidden rounded-full flex justify-center items-center ">
                                  <img
                                    src={data.image}
                                    alt="image"
                                    className="w-14 h-14 rounded-full"
                                  />
                                </td>

                                {/* name, category */}

                                {/* name */}
                                <td className=" grid place-content-start place-items-end smallTablet:col-start-2 w-full smallTablet:col-end-4 smallTablet:row-start-1  p-0 text-[#201F24]  flex justify-center items-center font-sans text-sm font-bold leading-5 mb-1  smallTablet:row-end-2 smallTablet:place-content-center smallTablet:place-items-center ">
                                  {data.name}
                                </td>

                                {/* category */}
                                <td className="smallTablet:col-start-4 w-full smallTablet:row-start-1  smallTablet:row-end-2 smallTablet:col-end-5 p-0 text-[#696868] font-sans text-xs font-normal leading-5 smallTablet:place-content-center smallTablet:place-items-center ">
                                  {data.category}
                                </td>

                                {/* amount, date */}

                                {/* name */}
                                <td className=" smallTablet:col-start-6 smallTablet:col-end-8 smallTablet:row-start-1  smallTablet:row-end-2 flex justify-center items-center ">
                                  <div
                                    className={`${
                                      data.type === "Credit"
                                        ? "text-[#277C78]"
                                        : "text-red-600"
                                    } flex items-center gap-3 p-0  font-sans text-sm font-bold leading-5 mb-1 `}
                                  >
                                    {data.type === "Credit" ? (
                                      <FaSmile className="text-lg font-semibold text-yellow-400" />
                                    ) : (
                                      <FaAngry className="text-orange-500 text-lg font-semibold" />
                                    )}{" "}
                                    {formatPrice(data.amount)}
                                  </div>
                                </td>

                                {/* name */}
                                <td className="smallTablet:col-start-5 smallTablet:col-end-6 smallTablet:row-start-1 p-0 text-[#696868] font-sans text-xs font-normal leading-4  smallTablet:row-end-2 smallTablet:flex smallTablet:justify-start smallTablet:items-center  ">
                                  {formatDate(data.date)}
                                </td>

                                {/* * */}
                              </tr>
                            </Link>
                          </tbody>
                        );
                      })}
                    </>
                  ) : (
                    <div className="flex flex-col justify-center items-center gap-8 py-20 w-full bg-white shadow-sm">
                      {" "}
                      <h3 className=" text-xl smallTablet:text-3xl font-semibold">
                        No Transactions yet
                      </h3>{" "}
                      <div onClick={() => setShowTransactionModal(true)}>
                        <PrimaryButton
                          bg={"bg-black"}
                          text={"+ Add New Transaction"}
                          color={"text-white"}
                        />
                      </div>
                    </div>
                  )}
                </>
              </table>

              {/* 1 */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
