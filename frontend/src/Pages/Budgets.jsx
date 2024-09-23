import React, { useEffect, useState } from "react";
import PrimaryButton from "../Components/PrimaryButton";
import PieCharts from "../Components/PieCharts";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineArrowRight } from "react-icons/md";
import { customFetch, formatPrice, formatDate } from "../utils";
import { Link, useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { listAllBudgets } from "../features/budgets/BudgetSlice";

export const loader = (store) => async (req, res) => {
  try {
    const userId = store.getState()?.userState?.userInfo?._id;

    const { data } = await customFetch.get("/budgets", {
      headers: { "user-id": userId },
    });

    store.dispatch(listAllBudgets(data));

    return data;
  } catch (err) {
    console.log(err);

    return err;
  }
};

const Budgets = () => {
  const data = useLoaderData();
  const budgets = useSelector((state) => state.budgetState.budgets) || [];

  let percentage;

  const pieData = budgets;

  return (
    <div className="bg-[#F8F4F0] ">
      <div className="small-main-menu-container  large-main-menu-container   h-full  ">
        <>
          <div className="flex items-center justify-between ">
            <h3 className="capitalize py-8 text-[#201f24] font-sans font-bold leading-10 text-3xl smallTablet:text-4xl smallDekstop:text-5xl">
              Budgets
            </h3>

            <div>
              <Link to={"/createBudget"}>
                <PrimaryButton
                  bg={"bg-black"}
                  text={"+ Add  Budget"}
                  color={"text-white"}
                />
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-between items-start gap-6 laptop:flex-row  ">
            {/* overall */}

            <div className=" bg-white w-full flex flex-col smallTablet:flex-row rounded-md shadow-sm px-2  mobile:px-5 py-6 smallTablet:gap-10 laptop:flex-col ">
              <div className="mx-auto my-5 smallTablet:hidden">
                <PieCharts
                  width={250}
                  height={250}
                  outerRadius={100}
                  pieData={pieData}
                />
              </div>

              <div className="mx-auto my-5 hidden smallTablet:flex">
                <PieCharts
                  width={300}
                  height={300}
                  outerRadius={120}
                  pieData={pieData}
                />
              </div>

              <div className="mx-auto my-5 hidden smallLaptop:flex">
                <PieCharts
                  width={400}
                  height={400}
                  outerRadius={160}
                  pieData={pieData}
                />
              </div>

              <div className="flex flex-col  smallTablet:w-full   ">
                <h5 className="text-[#201F24] font-sans text-center smallTablet:text-start font-bold leading-6 text-xl mb-6">
                  Spending Summary
                </h5>
                {/* 1 */}

                {data.map((datas, idx) => {
                  return (
                    <div
                      className={`py-4  flex items-center justify-between   shadow-sm px-1 mobile:px-2  `}
                      key={idx}
                    >
                      <div
                        style={{ backgroundColor: `${datas.color}` }}
                        className={`${datas.color} h-6 w-2 rounded-sm `}
                      ></div>

                      <h6 className="text-[#696868] w-full ml-2 text-start font-sans text-sm font-normal leading-5 flex justify-start items-start ">
                        {datas.category}
                      </h6>

                      <p className="text-[#696868] font-sans text-sm font-normal leading-5 w-full   ">
                        <span className="text-[#201F24] font-sans font-bold text-base leading-6">
                          {formatPrice(datas.currentAmount)}
                        </span>{" "}
                        of {formatPrice(datas.targetAmount)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* list view */}

            <div className="flex flex-col gap-6 w-full">
              {data.map((datas) => {
                return (
                  <div
                    key={datas._id}
                    className="p-2 smallMobile:p-4 p-6 bg-white rounded-md shadow-sm w-full "
                  >
                    {/* header */}

                    <div className="flex items-center justify-between mb-5 w-full ">
                      <div className="flex items-center gap-4  w-full">
                        <div
                          style={{ backgroundColor: `${datas.color}` }}
                          className={`w-4 h-4 rounded-full ${datas.bg}`}
                        ></div>

                        <h3 className="text-[#201F24] font-sans text-xl font-bold leading-6">
                          {datas.category}
                        </h3>
                      </div>

                      <div>
                        <BsThreeDots />
                      </div>
                    </div>

                    <p className="text-[#696868] font-sans text-sm font-normal leading-5">
                      Maximum of {datas.targetAmount}
                    </p>

                    <div className="hidden">
                      {(percentage =
                        (Number(datas.currentAmount) /
                          Number(datas.targetAmount)) *
                        100).toFixed(2)}
                      %
                    </div>

                    {/* progress */}

                    <div class="w-full bg-gray-200 rounded-md  h-6 dark:bg-gray-700 my-5">
                      <div
                        class={`${datas.color} h-6 rounded-md`}
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: `${datas.color}`,
                        }}
                      ></div>
                    </div>

                    {/* spent | free */}

                    <div className="flex items-center justify-between mb-7">
                      <div className="w-full border-l-4 rounded-md shadow-sm border-l-[#277c78] flex flex-col pl-4 gap-2">
                        <p className="text-[#696868] font-sans text-xs font-normal leading-5">
                          Spent
                        </p>
                        <h5 className="text-[#201F24] font-sans text-sm font-bold">
                          {datas.currentAmount}
                        </h5>
                      </div>

                      <div className="w-full border-l-4 rounded-md shadow-sm  flex flex-col pl-4 gap-2">
                        <p className="text-[#696868] font-sans text-xs font-normal leading-5">
                          Free
                        </p>
                        <h5 className="text-[#201F24] font-sans text-sm font-bold">
                          {Number(datas.targetAmount) -
                            Number(datas.currentAmount)}
                        </h5>
                      </div>
                    </div>

                    {/* Latest spending */}

                    <div className="flex flex-col bg-[#F8F4F0] p-2 mobile:p-4 rounded-md shadow-sm">
                      {/* header */}

                      <div className="flex items-center justify-between mb-5">
                        <h4 className="text-[#201F24] font-sans text-base font-bold leading-6">
                          Latest Spending
                        </h4>

                        <div className="flex items-center gap-2">
                          <p className="text-[#696868] font-sans text-sm font-normal leading-5">
                            See all
                          </p>

                          <div>
                            <MdOutlineArrowRight className="text-lg font-semibold text-[#696868]" />
                          </div>
                        </div>
                      </div>

                      {/* body */}

                      <div className="flex flex-col  ">
                        {datas?.transactionIds?.map((eachData, idx) => {
                          return (
                            <div
                              className="flex items-center justify-between py-4 shadow-sm px-2"
                              key={idx}
                            >
                              <h6 className="text-[#201F24] font-sans text-xs font-bold leading-5">
                                {eachData.name}
                              </h6>

                              <div className="flex flex-col items-center">
                                <h6 className="text-[#201F24] font-sans text-xs font-bold leading-5">
                                  {formatPrice(eachData.amount)}
                                </h6>
                                <p className="text-[#696868] font-sans text-sm font-normal leading-5">
                                  {formatDate(eachData.date)}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default Budgets;
