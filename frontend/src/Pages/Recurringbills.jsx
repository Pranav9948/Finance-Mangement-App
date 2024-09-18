import React, { useState } from "react";
import { MdOutlineMessage } from "react-icons/md";
import SearchBar from "../Components/SearchBar";
import Dropdown from "rsuite/esm/Dropdown";
import { FaSort } from "react-icons/fa6";
import { FaSortAlphaDownAlt, FaSortAlphaUp } from "react-icons/fa";
import { customFetch, formatDate, formatPrice } from "../utils";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import PrimaryButton from "../Components/PrimaryButton";

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

      return data;
    } catch (err) {
      let errorMsg = err?.response?.data?.message;
      console.error(errorMsg);
      toast.error(errorMsg);
      return err;
    }
  };

const Recurringbills = () => {
  const summaryDetails = [
    {
      key: "Paid Bills",
      value: "4($190.00)",
    },
    {
      key: "TotalUpcoming",
      value: "4($194.00)",
    },
    {
      key: "DueSoon",
      value: "2($59.98)",
    },
  ];

  const [recurringBillsModal, setRecurringbillsModal] = useState(false);

  const data = useLoaderData();

  const { parentRecurringBill, recurringBill } = data;

  console.log("data", parentRecurringBill[0]);

  const { totalBillsAmount } = parentRecurringBill[0];

  return (
    <div className="h-full bg-[#F8F4F0] py-6 mobile:px-2">
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
              {formatPrice(totalBillsAmount)}
            </h2>
          </div>

          {/* recurring-bills-list */}

          <div className="smallTablet:row-start-2 smallTablet:row-end-3 smallTablet:col-start-1 smallTablet:col-end-9  laptop:col-start-4 laptop:col-end-9 laptop:row-start-1 laptop:row-end-4 bg-white rounded-md shadow-md p-0 smallTablet:p-8">
            <div className="grid grid-cols-4 place-content-between  place-items-center p-5 ">
              <div className="col-start-1 col-end-3 w-full ">
                <SearchBar title="search Recurring Bills" />
              </div>

              <div className="col-start-3 col-end-5">
                <Dropdown title="Within 7 days" icon={<FaSort />}>
                  <Dropdown.Item icon={<FaSortAlphaUp />}>
                    Within 7 days
                  </Dropdown.Item>
                  <Dropdown.Item icon={<FaSortAlphaDownAlt />}>
                    After 7 days
                  </Dropdown.Item>
                  <Dropdown.Item icon={<FaSortAlphaDownAlt />}>
                    After 14 days
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
                  {recurringBill.length > 0 ? (
                    <div>
                      {recurringBill.map((data, idx) => {
                        return (
                          <>
                            <tr className="w-full bg-white" key={idx}>
                              <div className="grid grid-cols-10  smallTablet:grid-cols-9 place-content-center place-items-center  px-1 py-4  ">
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

                                <div className="col-start-3 col-end-5 row-start-1 row-end-3  smallTablet:col-start-4 smallTablet:col-end-6 smallTablet:row-start-1 smallTablet:row-end-2 ">
                                  <td className="p-0 text-[#277C78] font-sans text-xs font-bold leading-5 mb-1 text-center smallTablet:text-sm smallTablet:text-start">
                                    {formatDate(data?.dueDate)}
                                  </td>
                                </div>

                                {/* amount */}

                                <div className="col-start-5 col-end-7 row-start-1 row-end-3 smallTablet:col-start-6 smallTablet:col-end-7 smallTablet:row-start-1 smallTablet:row-end-2 ">
                                  <td className="p-0 text-[#201F24] font-sans text-sm font-bold leading-5 mb-1 ">
                                    {formatPrice(data.amount)}
                                  </td>
                                </div>

                                {/* status */}

                                <div className="col-start-7 col-end-9 row-start-1 row-end-3  smallTablet:col-start-8 smallTablet:col-end-9  smallTablet:row-start-1 smallTablet:row-end-2 ">
                                  <td
                                    className={`p-0 text-[#201F24] font-sans text-sm font-bold leading-5 mb-1 ${
                                      data.status === "paid"
                                        ? "text-green-700 font-semibold"
                                        : "text-red-700 font-semibold"
                                    }`}
                                  >
                                    {data.paidStatus}
                                  </td>
                                </div>

                                {/* make payment */}

                                <div className="col-start-9 col-end-11 row-start-1 row-end-3  smallTablet:col-start-9 smallTablet:col-end-10 smallTablet:row-start-1 smallTablet:row-end-2  ">
                                  {data.status !== "paid" ? (
                                    <button className="bg-yellow-400 text-white py-1 px-3 capitalize text-base rounded-md font-medium font-sans">
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
                      <div onClick={() => setRecurringBillsModal(true)}>
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
                  {parentRecurringBill[0].totalUpcomingBills}
                </h4>
              </div>
            </div>

            <div className="flex flex-col my-2 ">
              <div className="flex justify-between items-center py-3 border-t-2  border-b-gray-200 px-5">
                <h6 className="text-[#696868] font-sans text-xs font-normal leading-5 capitalize">
                  paidBillsAmount
                </h6>

                <h4 className="text-[#201f24] font-sans text-xs font-bold leading-4">
                  {parentRecurringBill[0].paidBillsAmount}
                </h4>
              </div>
            </div>

            <div className="flex flex-col my-2 ">
              <div className="flex justify-between items-center py-3 border-t-2 border-b-2 border-b-gray-200 px-5">
                <h6 className="text-[#696868] font-sans text-xs font-normal leading-5 capitalize">
                  dueSoonBills
                </h6>

                <h4 className="text-[#201f24] font-sans text-xs font-bold leading-4">
                  {parentRecurringBill[0].dueSoonBills}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recurringbills;
