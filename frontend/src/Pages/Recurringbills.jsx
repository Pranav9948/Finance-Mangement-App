import React, { useEffect, useState } from "react";
import { MdOutlineMessage } from "react-icons/md";
import SearchBar from "../Components/SearchBar";
import Dropdown from "rsuite/esm/Dropdown";
import { FaSort } from "react-icons/fa6";
import { FaSortAlphaDownAlt, FaSortAlphaUp } from "react-icons/fa";
import { customFetch, formatDate, formatPrice } from "../utils";
import { Form, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import PrimaryButton from "../Components/PrimaryButton";
import { FormInput } from "../Components";
import axios from "axios";
import CategorySelectBox from "../Components/CategorySelectBox";
import DatePicker from "../Components/DatePicker";
import { FcPaid } from "react-icons/fc";
import { BiRun } from "react-icons/bi";
import {
  createNewBills,
  listAllBills,
  updateBills,
  searchBills,
} from "../features/bills/BillSlice";
import { createNewtransaction } from "../features/transactions/TransactionSlice";
import { useDispatch, useSelector } from "react-redux";
import { setuser } from "../features/users/userSlice";
import {
  UpdateParentBills,
  createParentBills,
} from "../features/bills/ParentBillSlice";
import OverviewCard from "../Components/OverviewCard";
import { GiOverkill } from "react-icons/gi";
import { updatebudget } from "../features/budgets/BudgetSlice";

export const loader =
  (store) =>
  async ({ request, params }) => {
    try {
      const userInfo = store.getState()?.userState?.userInfo;

      const userId = userInfo?._id;

      const { data } = await customFetch.get(`/recurring-bills`, {
        headers: {
          "user-id": userId,
        },
      });

      const { parentRecurringBill, recurringBill } = data;

      store.dispatch(listAllBills(recurringBill));
      store.dispatch(UpdateParentBills(parentRecurringBill));

      return data;
    } catch (err) {
      let errorMsg = err?.response?.data?.message;
      console.error(errorMsg);
      toast.error(errorMsg);
      return err;
    }
  };

export const action =
  (store) =>
  async ({ request, params }) => {
    const userInfo = store.getState()?.userState?.userInfo;

    const userId = userInfo?._id;

    const formdata = Object.fromEntries(await request.formData());

    try {
      const { data } = await customFetch.post("/recurring-bills", formdata, {
        headers: { "user-id": userId },
      });

      const { bill, message, categoryBudget } = data;

      store.dispatch(createNewBills(bill));
      store.dispatch(createParentBills(parentRecurringBill));

      toast.success("bill added successfully...");

      return "hello";
    } catch (err) {
      let errorMsg = err?.response?.data?.message;
      console.error(errorMsg);
      toast.error(errorMsg);

      return err;
    }
  };

const Recurringbills = () => {
  const [recurringBillsModal, setRecurringbillsModal] = useState(false);
  const [merchantName, setMerchantName] = useState("");
  const [allCategories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [showPaidBills, setShowPaidBills] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("status");
  const [unpaidTime, setUnpaidTime] = useState("Timeframe");
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.userState?.userInfo._id);
  const billData = useSelector((state) => state.billState?.bills);
  const parentBillData = useSelector(
    (state) => state.parentBillsState?.ParentBills
  );

  const {
    totalBillsAmount,
    paidBillsAmount,
    totalUpcomingBills,
    dueSoonBills,
  } = parentBillData[0] ? parentBillData[0] : parentBillData;

  const { username, currentBalance, income, expense, _id } = useSelector(
    (state) => state?.userState?.userInfo
  );

  const [merchantImage, setMerchantImage] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg"
  );

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

  // Handle Merchant Name Change
  const handleMerchantChange = (e) => {
    const merchant = e.target.value;
    setMerchantName(merchant);
    if (merchant.length > 2) {
      debounce(fetchImageFromUnsplash(merchant), 500); // Debounce to prevent multiple API calls
    }
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    if (!merchantImage) {
      debounce(fetchImageFromUnsplash(selectedCategory), 500);
    }
  };

  const data = useLoaderData();

  const fetchAllCategories = async () => {
    try {
      const { data } = await customFetch.get("/recurring-bills/getcategories");

      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const frequency = ["Monthly", "Quarterly", "Yearly"];
  const status = ["Paid", "Unpaid", "Overdue"];

  const { parentRecurringBill, recurringBill } = data;

  const makePayment = async (BillId) => {
    try {
      const { data } = await customFetch.put(
        `/recurring-bills/${BillId}`,
        {},
        {
          headers: { "user-id": userId },
        }
      );

      const {
        parentRecurringBill,
        recurringBill,
        user,
        transaction,
        categoryBudget,
      } = data;

      dispatch(setuser(user));
      dispatch(createNewtransaction(transaction));
      dispatch(UpdateParentBills(parentRecurringBill));
      dispatch(updateBills(recurringBill));
      dispatch(updatebudget(categoryBudget));

      toast.success("Amount Payed Successfully successfully...");

      return "hello";
    } catch (err) {
      console.log("err", err);

      let errorMsg = err?.response?.data?.message;
      console.error(errorMsg);
      toast.error(errorMsg);

      return err;
    }
  };

  const getAllPaidBills = async () => {
    setShowPaidBills(true);
    setPaymentStatus("Paid");

    try {
      const userId = _id;

      const { data } = await customFetch.get(`/recurring-bills/paid-bills`, {
        headers: {
          "user-id": userId,
        },
      });

      dispatch(listAllBills(data?.paidBills));

      return data;
    } catch (err) {
      let errorMsg = err?.response?.data?.message;
      console.error(errorMsg);
      toast.error(errorMsg);
      return err;
    }
  };

  const getAllUnPaidBills = async () => {
    setShowPaidBills(true);
    setPaymentStatus("unpaid");

    try {
      const userId = _id;

      const { data } = await customFetch.get(`/recurring-bills/unpaid-bills`, {
        headers: {
          "user-id": userId,
        },
      });

      dispatch(listAllBills(data?.unpaidBills));

      return data;
    } catch (err) {
      let errorMsg = err?.response?.data?.message;
      console.error(errorMsg);
      toast.error(errorMsg);
      return err;
    }
  };

  const getUnPaidBillsWithinSevendays = async () => {
    setShowPaidBills(true);
    setUnpaidTime("withinSevendays");

    try {
      const userId = _id;

      const { data } = await customFetch.get(
        `/recurring-bills/unpaid-within-seven-days`,
        {
          headers: {
            "user-id": userId,
          },
        }
      );

      dispatch(listAllBills(data?.unpaidBills));

      return data;
    } catch (err) {
      let errorMsg = err?.response?.data?.message;
      console.error(errorMsg);
      toast.error(errorMsg);
      return err;
    }
  };

  const getUnPaidBillsWithinFourteendays = async () => {
    setShowPaidBills(true);
    setUnpaidTime("within 14 days");

    try {
      const userId = _id;

      const { data } = await customFetch.get(
        `/recurring-bills/unpaid-within-fourteen-days`,
        {
          headers: {
            "user-id": userId,
          },
        }
      );

      dispatch(listAllBills(data?.unpaidBills));

      return data;
    } catch (err) {
      let errorMsg = err?.response?.data?.message;
      console.error(errorMsg);
      toast.error(errorMsg);
      return err;
    }
  };

  const getUnPaidBillsAfterFourteendays = async () => {
    setShowPaidBills(true);
    setUnpaidTime("within 30 days");

    try {
      const userId = _id;

      const { data } = await customFetch.get(
        `/recurring-bills//unpaid-within-thirteen-days`,
        {
          headers: {
            "user-id": userId,
          },
        }
      );

      dispatch(listAllBills(data?.unpaidBills));

      return data;
    } catch (err) {
      let errorMsg = err?.response?.data?.message;
      console.error(errorMsg);
      toast.error(errorMsg);
      return err;
    }
  };

  const getAllOverdueBills = async () => {
    setShowPaidBills(false);
    setPaymentStatus("overdue");

    try {
      const userId = _id;

      const { data } = await customFetch.get(`/recurring-bills/overdue-bills`, {
        headers: {
          "user-id": userId,
        },
      });

      dispatch(listAllBills(data?.OverdueBills));

      return data;
    } catch (err) {
      let errorMsg = err?.response?.data?.message;
      console.error(errorMsg);
      toast.error(errorMsg);
      return err;
    }
  };

  const getSearchResults = (searchText) => {
    dispatch(searchBills(searchText));
  };

  return (
    <div className="h-full bg-[#F8F4F0] py-6 mobile:px-2">
      {recurringBillsModal ? (
        <div className="flex flex-col py-10 w-full my-10 justify-center items-center bg-white rounded-md shadow-sm px-7 mobile:px-10 smallDekstop:px-20 largeDekstop:px-28">
          <h5 className="capitalize text-xl font-bold ">
            create new Recurring Bill
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
                    name="title"
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

                <div className=" smallTablet:mt-0 w-full max-w-full  h-full ">
                  <div className="h-full">
                    <DatePicker label={"choose Due Date"} name={"dueDate"} />
                  </div>
                </div>

                <div className=" w-full max-w-full">
                  <FormInput label="Amount" type="number" name="amount" />
                </div>

                <div className="mt-4 smallTablet:mt-0 w-full max-w-full ">
                  <CategorySelectBox
                    onChange={handleCategoryChange}
                    allCategories={frequency}
                    label={"frequency"}
                    name={"frequency"}
                  />
                </div>

                <div className="mt-4 smallTablet:mt-0 w-full max-w-full ">
                  <CategorySelectBox
                    onChange={handleCategoryChange}
                    allCategories={status}
                    label={"status"}
                    name={"paidStatus"}
                  />
                </div>

                <div>
                  <input type="hidden" name="image" value={merchantImage} />
                </div>

                <div className="my-8 smallTablet:my-0 w-full max-w-full smallTablet:flex smallTablet:justify-center smallTablet:items-end">
                  <PrimaryButton
                    bg={"bg-black"}
                    text={"Create Bill"}
                    color={"text-white"}
                    type={"submit"}
                  />
                </div>
              </div>
            </Form>
          </div>
        </div>
      ) : (
        <div className="cart-container   h-full ">
          <div className="flex flex-col smallTablet:flex-row items-center justify-between gap-4 py-8 ">
            <h3 className="capitalize text-[#201f24] font-sans font-bold leading-10 text-3xl smallTablet:text-4xl smallDekstop:text-5xl">
              Recurring bills
            </h3>

            <div onClick={() => setRecurringbillsModal(true)}>
              <PrimaryButton
                bg={"bg-black"}
                text={"+ Add New Bill"}
                color={"text-white"}
              />
            </div>
          </div>

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

          {/* Grid-system */}

          <div className="grid laptop:grid-cols-8 laptop:grid-rows-4 gap-6  ">
            {/* total-bills */}

            <div className=" grid place-content-center place-items-center smallTablet:col-start-1 smallTablet:col-end-4 smallTablet:row-start-1 smallTablet:row-end-2 laptop:col-start-1 laptop:col-end-4 laptop:row-start-1 laptop:row-end-2 bg-black text-white rounded-md shadow-md p-6">
              <div className="mb-8">
                <MdOutlineMessage className="text-4xl" />
              </div>

              <h6 className="text-white font-sans text-sm font-normal leading-5 mb-3 ">
                Total Bills
              </h6>

              <h2 className="font-sans text-3xl font-bold leading-10">
                {!totalBillsAmount
                  ? formatPrice(0)
                  : formatPrice(totalBillsAmount)}
              </h2>
            </div>

            {/* recurring-bills-list */}

            <div className="smallTablet:row-start-2 smallTablet:row-end-3 smallTablet:col-start-1 smallTablet:col-end-9  laptop:col-start-4 laptop:col-end-9 laptop:row-start-1  bg-white rounded-md shadow-md p-0 smallTablet:p-8 ">
              <div className=" grid grid-cols-8 grid-rows-2 smallTablet:grid-rows-1 place-content-between  place-items-center p-5 ">
                <div className="col-start-1 col-end-8 row-start-1 row-end-2 smallTablet:col-end-4  w-full ">
                  <SearchBar
                    title="search Recurring Bills"
                    getSearchResults={getSearchResults}
                  />
                </div>

                {showPaidBills && (
                  <div className="col-start-4 col-end-9 row-start-2 row-end-3  smallTablet:row-start-1 smallTablet:row-end-2 smallTablet:col-start-7 smallTablet:col-end-9">
                    <Dropdown title={unpaidTime} icon={<FaSort />}>
                      <Dropdown.Item
                        onClick={() => getUnPaidBillsWithinSevendays()}
                        icon={<FaSortAlphaUp />}
                      >
                        Within 7 days
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => getUnPaidBillsWithinFourteendays()}
                        icon={<FaSortAlphaDownAlt />}
                      >
                        After 7 days
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => getUnPaidBillsAfterFourteendays()}
                        icon={<FaSortAlphaDownAlt />}
                      >
                        After 14 days
                      </Dropdown.Item>
                    </Dropdown>
                  </div>
                )}

                <div className="col-start-1 col-end-4 row-start-2 row-end-3 smallTablet:row-start-1 smallTablet:row-end-2 smallTablet:col-start-5 smallTablet:col-end-7 ">
                  <Dropdown title={paymentStatus} icon={<FaSort />}>
                    <Dropdown.Item
                      onClick={() => getAllPaidBills()}
                      icon={<FcPaid />}
                    >
                      Paid
                    </Dropdown.Item>
                    <Dropdown.Item
                      icon={<BiRun className="text-yellow-600" />}
                      onClick={() => getAllUnPaidBills()}
                    >
                      Unpaid
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => getAllOverdueBills()}
                      icon={<GiOverkill className="text-red-400" />}
                    >
                      OverDue
                    </Dropdown.Item>
                  </Dropdown>
                </div>
              </div>

              <div className="w-full my-6 ">
                <table className="table table-zebra w-full">
                  {/* head */}

                  <thead className="w-full px-5">
                    <tr className="w-full">
                      <div className="grid grid-cols-10 smallTablet:grid-cols-9">
                        <div className="col-start-1 col-end-3     smallTablet:col-start-1 smallTablet:col-end-3 smallTablet:row-start-1 smallTablet:row-end-2 flex items-center justify-center">
                          <th className="text-[#696868] font-sans text-xs font-normal leading-4">
                            Bill Title
                          </th>
                        </div>

                        <div className="col-start-3 col-end-5    smallTablet:col-start-4 smallTablet:col-end-6  smallTablet:row-start-1 smallTablet:row-end-2   flex items-center justify-center">
                          <th className="text-[#696868] font-sans text-xs font-normal leading-4">
                            Due Date
                          </th>
                        </div>

                        <div className="col-start-5 col-end-7  smallTablet:col-start-6 smallTablet:col-end-8  smallTablet:row-start-1 smallTablet:row-end-2 mobile:col-end-7 flex items-center ">
                          <th className="text-[#696868] font-sans text-xs font-normal leading-4">
                            Amount
                          </th>
                        </div>

                        <div className=" col-start-7 col-end-9  smallTablet:col-start-8 smallTablet:col-end-9  smallTablet:row-start-1 smallTablet:row-end-2 flex items-center justify-end">
                          <th className="text-[#696868] font-sans text-xs font-normal leading-4">
                            Status
                          </th>
                        </div>

                        <div className=" col-start-9 col-end-11  smallTablet:col-start-9 smallTablet:col-end-10  smallTablet:row-start-1 smallTablet:row-end-2 flex items-center justify-end">
                          <th className="text-[#696868] font-sans text-xs font-normal leading-4">
                            pay now
                          </th>
                        </div>
                      </div>
                    </tr>
                  </thead>

                  {/* body */}

                  <tbody className="w-full bg-white shadow-sm  ">
                    {billData.length > 0 ? (
                      <div>
                        {billData.map((data, idx) => {
                          return (
                            <>
                              <tr className="w-full bg-white" key={data._id}>
                                <div className="grid grid-cols-10  smallTablet:grid-cols-10 place-content-center place-items-center  px-1 py-4  ">
                                  {/* icon */}
                                  <div className="col-start-1 col-end-3 row-start-1 row-end-2 smallTablet:row-start-1 smallTablet:row-end-2   smallTablet:col-start-1 smallTablet:col-end-2    grid place-content-center place-items-center">
                                    <td className="p-0 w-10 h-10 overflow-hidden rounded-full flex justify-center items-center bg-[#F8F4F0] ">
                                      <img
                                        src={data.image}
                                        alt="image"
                                        className="h-full w-full "
                                      />
                                    </td>
                                  </div>

                                  {/* name, category */}

                                  <div className="col-start-1 col-end-3 row-start-2 row-end-3 smallTablet:row-start-1 smallTablet:row-end-2    smallTablet:col-start-2  smallTablet:col-end-4 ml-2 flex justify-center   smallTablet:justify-start  smallTablet:items-start w-full mt-3 smallTablet:mt-0  ">
                                    <td className="p-0  text-[#201F24] max-w-[70px] text-center mobile:max-w-full  font-sans text-xs largeMobile:text-sm font-bold leading-5 mb-1">
                                      {data.title}
                                    </td>
                                  </div>

                                  {/* amount, date */}

                                  <div className="col-start-3 col-end-5 row-start-1 row-end-3  smallTablet:col-start-4 smallTablet:col-end-7 smallTablet:row-start-1 smallTablet:row-end-2   ">
                                    <td className="p-0 text-[#277C78] font-sans text-xs font-bold leading-5 mb-1 text-center smallTablet:text-sm smallTablet:text-start">
                                      {formatDate(data?.dueDate)}
                                    </td>
                                  </div>

                                  {/* amount */}

                                  <div className="col-start-5 col-end-7 row-start-1 row-end-3 smallTablet:col-start-7 smallTablet:col-end-8 smallTablet:row-start-1 smallTablet:row-end-2 ">
                                    <td className="p-0 text-[#201F24] font-sans text-sm font-bold leading-5 mb-1 ">
                                      {formatPrice(data.amount)}
                                    </td>
                                  </div>

                                  {/* status */}

                                  <div className="col-start-7 col-end-9 row-start-1 row-end-3  smallTablet:col-start-9 smallTablet:col-end-10  smallTablet:row-start-1 smallTablet:row-end-2 ">
                                    <td
                                      className={`p-0 text-[#201F24] font-sans text-sm font-bold leading-5 mb-1 ${
                                        data.status !== "Paid"
                                          ? "text-green-700 font-semibold"
                                          : "text-red-700 font-semibold"
                                      }`}
                                    >
                                      {data.paidStatus}
                                    </td>
                                  </div>

                                  {/* make payment */}

                                  <div className="col-start-9 col-end-11 row-start-1 row-end-3  smallTablet:col-start-10 smallTablet:col-end-11 smallTablet:row-start-1 smallTablet:row-end-2  ">
                                    {data.paidStatus !== "Paid" ? (
                                      <button
                                        onClick={() => makePayment(data._id)}
                                        className="bg-yellow-400 text-white py-1 px-3 capitalize text-base rounded-md font-medium font-sans"
                                      >
                                        pay
                                      </button>
                                    ) : (
                                      <div> </div>
                                    )}
                                  </div>

                                  {/* * */}
                                </div>
                              </tr>
                            </>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex flex-col justify-center items-center gap-8 py-20 w-full bg-white shadow-sm">
                        {" "}
                        <h3 className=" text-xl smallTablet:text-3xl font-semibold">
                          No Bills yet
                        </h3>{" "}
                        <div onClick={() => setRecurringbillsModal(true)}>
                          <PrimaryButton
                            bg={"bg-black"}
                            text={"+ Add New Bill"}
                            color={"text-white"}
                          />
                        </div>
                      </div>
                    )}
                  </tbody>

                  {/* ends */}
                </table>
              </div>
            </div>

            {/* summary */}

            <div className=" bg-white smallTablet:row-start-1 smallTablet:row-end-2 smallTablet:col-start-4 smallTablet:col-end-9  laptop:col-start-1 laptop:col-end-4 laptop:row-start-2  rounded-md shadow-md p-5">
              <h5 className="text-[#201f24] font-sans font-bold text-base leading-6 mb-5">
                Summary
              </h5>

              {/* summaryBills */}

              <div className="flex flex-col my-2 ">
                <div className="flex justify-between items-center py-3 border-t-2  border-b-gray-200 px-5">
                  <h6 className="text-[#696868] font-sans text-xs font-normal leading-5 capitalize">
                    totalUpcomingBills
                  </h6>

                  <h4 className="text-[#201f24] font-sans text-xs font-bold leading-4">
                    {totalUpcomingBills}
                  </h4>
                </div>
              </div>

              <div className="flex flex-col my-2 ">
                <div className="flex justify-between items-center py-3 border-t-2  border-b-gray-200 px-5">
                  <h6 className="text-[#696868] font-sans text-xs font-normal leading-5 capitalize">
                    paidBillsAmount
                  </h6>

                  <h4 className="text-[#201f24] font-sans text-xs font-bold leading-4">
                    {paidBillsAmount}
                  </h4>
                </div>
              </div>

              <div className="flex flex-col my-2 ">
                <div className="flex justify-between items-center py-3 border-t-2 border-b-2 border-b-gray-200 px-5">
                  <h6 className="text-[#696868] font-sans text-xs font-normal leading-5 capitalize">
                    dueSoonBills
                  </h6>

                  <h4 className="text-[#201f24] font-sans text-xs font-bold leading-4">
                    {dueSoonBills}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recurringbills;
