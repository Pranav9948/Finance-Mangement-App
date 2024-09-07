import React, { useState } from "react";
import SearchBar from "../Components/SearchBar";
import { FaFilterCircleDollar, FaSort, FaSpa } from "react-icons/fa6";
import { ImSortAmountAsc } from "react-icons/im";
import { FaSortAlphaDownAlt, FaSortAlphaUp } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import Dropdown from "rsuite/Dropdown";
import "rsuite/dist/rsuite.min.css";
import CodeIcon from "@rsuite/icons/Code";
import PageIcon from "@rsuite/icons/Page";
import DetailIcon from "@rsuite/icons/Detail";
import FolderFillIcon from "@rsuite/icons/FolderFill";
import FileDownloadIcon from "@rsuite/icons/FileDownload";
import FileUploadIcon from "@rsuite/icons/FileUpload";
import { FcNegativeDynamic, FcPositiveDynamic } from "react-icons/fc";

const Transactions = () => {
  const transactionDummyData = [
    {
      image:
        "https://plus.unsplash.com/premium_photo-1683134297492-cce5fc6dae31?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3BhfGVufDB8fDB8fHww",
      title: "Bravo Zen Spa",
      category: "Personal Care",
      amount: 25.0,
      date: "29 Aug 2024",
      type: "Debit",
    },
    {
      image:
        "https://images.unsplash.com/photo-1577215451400-f207c63e30be?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Starbucks Coffee",
      category: "Food & Drink",
      amount: 12.5,
      date: "28 Aug 2024",
      type: "Debit",
    },
    {
      image:
        "https://images.unsplash.com/photo-1593950315186-76a92975b60c?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Uber Ride",
      category: "Transport",
      amount: 18.0,
      date: "27 Aug 2024",
      type: "Debit",
    },
    {
      image:
        "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YW1hem9ufGVufDB8fDB8fHww",
      title: "Amazon Purchase",
      category: "Shopping",
      amount: 89.99,
      date: "26 Aug 2024",
      type: "Debit",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1661301057249-bd008eebd06a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3ltfGVufDB8fDB8fHww",
      title: "Gym Membership",
      category: "Fitness",
      amount: 45.0,
      date: "25 Aug 2024",
      type: "Debit",
    },
    {
      image:
        "https://images.unsplash.com/photo-1413882353314-73389f63b6fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWxlY3RyaWNpdHl8ZW58MHx8MHx8fDA%3D",
      title: "Electricity Bill",
      category: "Utilities",
      amount: 65.5,
      date: "24 Aug 2024",
      type: "Debit",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1663047726632-4e56b16b75a7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnJlZWxhbmNlJTIwd29ya3xlbnwwfHwwfHx8MA%3D%3D",
      title: "Freelance Payment",
      category: "Income",
      amount: 150.0,
      date: "23 Aug 2024",
      type: "Credit",
    },
    {
      image:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5ldGZsaXh8ZW58MHx8MHx8fDA%3D",
      title: "Netflix Subscription",
      category: "Entertainment",
      amount: 15.99,
      date: "22 Aug 2024",
      type: "Debit",
    },
    {
      image:
        "https://images.unsplash.com/photo-1613332098721-054a53462d12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JvY2VyaWVzfGVufDB8fDB8fHww",
      title: "Grocery Store",
      category: "Groceries",
      amount: 72.0,
      date: "21 Aug 2024",
      type: "Debit",
    },
    {
      image:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww",
      title: "Online Course",
      category: "Education",
      amount: 35.0,
      date: "20 Aug 2024",
      type: "Debit",
    },
  ];

  return (
    <div className="bg-[#F8F4F0] ">
      <div className="small-main-menu-container  large-main-menu-container h-full  ">
        <div className="card-container  py-6">
          <h3 className="capitalize my-8 text-[#201f24] font-sans font-bold leading-10 text-3xl smallTablet:text-4xl smallDekstop:text-5xl">
            Transactions
          </h3>

          {/* search-filter-container */}

          <div className="bg-white py-6">
            <div className=" grid grid-cols-1 gap-4 smallTablet:grid-cols-2 mb-6  px-5 ">
              {/* search-bar */}

              <SearchBar title={"search Transactions"} />

              {/* sorting icon only on mobile devices */}

              <div className="flex flex-col   gap-3 mobile:flex-row items-start mobile:items-center mobile:gap-3 justify-between  smallTablet:justify-around">
                <Dropdown title="Sort by" icon={<FaSort />}>
                  <Dropdown.Item icon={<FaSortAlphaUp />}>Latest</Dropdown.Item>
                  <Dropdown.Item icon={<FaSortAlphaDownAlt />}>
                    Oldest
                  </Dropdown.Item>
                </Dropdown>

                {/* filter icon only in mobile devices */}

                <Dropdown title="Category" icon={<MdCategory />}>
                  <Dropdown.Item icon={<GrTransaction />}>
                    All Transactions
                  </Dropdown.Item>
                  <Dropdown.Item icon={<FcNegativeDynamic />}>
                    Debited
                  </Dropdown.Item>
                  <Dropdown.Item icon={<FcPositiveDynamic />}>
                    Crebited
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </div>

            {/* table header */}

            <div className="w-full ">
              <table className="table table-zebra w-full">
                {/* head */}
                <thead className="w-full ">
                  <tr className="w-full">
                    <div className=" hidden smallTablet:grid grid-cols-10 grid-rows-2 w-full  ">
                      <div className="col-start-1 col-end-4 row-start-1 row-end-2 flex justify-center items-center">
                        <th className="text-[#696868] font-sans text-xs font-normal leading-4">
                          Recipient / Sender
                        </th>
                      </div>
                      <div className="col-start-5 col-end-7 flex justify-start items-center">
                        <th className="text-[#696868] font-sans text-xs font-normal leading-4">
                          Category
                        </th>
                      </div>
                      <div className="col-start-7 col-end-8 flex justify-center items-center">
                        <th className="text-[#696868] font-sans text-xs font-normal leading-4">
                          Transaction Date
                        </th>
                      </div>
                      <div className="col-start-9 col-end-10">
                        <th className="text-[#696868] font-sans text-xs font-normal leading-4">
                          Amount
                        </th>
                      </div>
                    </div>
                  </tr>
                </thead>

                {/* body */}

                <tbody className="w-full bg-white shadow-sm  ">
                  {transactionDummyData.map((data, idx) => {
                    return (
                      <>
                        <tr
                          className="w-full smallTablet:hidden bg-white"
                          key={idx}
                        >
                          <div className="grid grid-cols-5 grid-rows-2 px-1 py-4  w-full smallTablet:grid-cols-6 smallTablet:grid-rows-1 ">
                            {/* icon */}
                            <div className="col-start-1 col-end-2 row-start-1 row-end-3   grid place-content-center place-items-center">
                              <td className="p-0 w-10 h-10 overflow-hidden rounded-full flex justify-center items-center bg-[#F8F4F0] ">
                                <img
                                  src={data.image}
                                  alt="image"
                                  className="h-full w-full "
                                />
                              </td>
                            </div>

                            {/* name, category */}

                            <div className="col-start-2 col-end-5 row-start-1 row-end-3 smallTablet:col-start-2 smallTablet:col-end-5 flex flex-col justify-center smallTablet:row-start-1  smallTablet:row-end-2  items-start ">
                              {/* name */}
                              <div className="col-start-2 col-end-4 row-start-1 row-end-2  grid place-content-start place-items-end smallTablet:col-start-2 w-full smallTablet:col-end-4 smallTablet:row-start-1  smallTablet:row-end-2  ">
                                <td className="p-0 text-[#201F24] font-sans text-sm font-bold leading-5 mb-1">
                                  {data.title}
                                </td>
                              </div>

                              {/* category */}
                              <div className="col-start-2 col-end-4 row-start-2 row-end-3 smallTablet:col-start-4 w-full smallTablet:row-start-1  smallTablet:row-end-2 smallTablet:col-end-5 ">
                                <td className="p-0 text-[#696868] font-sans text-xs font-normal leading-5">
                                  {data.category}
                                </td>
                              </div>
                            </div>

                            {/* amount, date */}

                            <div className="col-start-4 col-end-6 row-start-1 row-end-3 flex flex-col gap-1 smallTablet:col-start-5 smallTablet:col-end-7 justify-center items-center">
                              {/* name */}
                              <div className="col-start-5 col-end-6 row-start-1 row-end-2 smallTablet:col-start-6 smallTablet:col-end-7">
                                <td className="p-0 text-[#277C78] font-sans text-sm font-bold leading-5 mb-1">
                                  {data.amount}
                                </td>
                              </div>

                              {/* name */}
                              <div className="col-start-4 col-end-6 row-start-2 row-end-3 smallTablet:col-start-5 smallTablet:col-end-6">
                                <td className="p-0 text-[#696868] font-sans text-xs font-normal leading-4">
                                  {data.date}
                                </td>
                              </div>
                            </div>

                            {/* * */}
                          </div>
                        </tr>

                        <tr
                          className="w-full hidden smallTablet:flex "
                          key={idx}
                        >
                          <div className="grid  px-1 py-4  w-full smallTablet:grid-cols-7 smallTablet:grid-rows-1 bg-white">
                            {/* icon */}
                            <div className="smallTablet:col-start-1 smallTablet:col-end-2 row-start-1 row-end-3   grid place-content-center place-items-center">
                              <td className="p-0 w-10 h-10 overflow-hidden rounded-full flex justify-center items-center bg-[#F8F4F0] ">
                                <img
                                  src={data.image}
                                  alt="image"
                                  className="h-full w-full "
                                />
                              </td>
                            </div>

                            {/* name, category */}

                            {/* name */}
                            <div className=" grid place-content-start place-items-end smallTablet:col-start-2 w-full smallTablet:col-end-4 smallTablet:row-start-1  smallTablet:row-end-2 smallTablet:place-content-start smallTablet:place-items-center ">
                              <td className="p-0 text-[#201F24] font-sans text-sm font-bold leading-5 mb-1">
                                {data.title}
                              </td>
                            </div>

                            {/* category */}
                            <div className="smallTablet:col-start-4 w-full smallTablet:row-start-1  smallTablet:row-end-2 smallTablet:col-end-5 smallTablet:place-content-start smallTablet:place-items-center ">
                              <td className="p-0 text-[#696868] font-sans text-xs font-normal leading-5">
                                {data.category}
                              </td>
                            </div>

                            {/* amount, date */}

                            {/* name */}
                            <div className=" smallTablet:col-start-7 smallTablet:col-end-8 smallTablet:row-start-1  smallTablet:row-end-2 smallTablet:place-content-start smallTablet:place-items-center  ">
                              <td className="p-0 text-[#277C78] font-sans text-sm font-bold leading-5 mb-1">
                                {data.amount}
                              </td>
                            </div>

                            {/* name */}
                            <div className="smallTablet:col-start-6 smallTablet:col-end-7 smallTablet:row-start-1  smallTablet:row-end-2  smallTablet:place-content-start smallTablet:place-items-center ">
                              <td className="p-0 text-[#696868] font-sans text-xs font-normal leading-4">
                                {data.date}
                              </td>
                            </div>

                            {/* * */}
                          </div>
                        </tr>
                      </>
                    );
                  })}
                </tbody>

                {/* 1 */}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
