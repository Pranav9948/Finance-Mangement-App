import React from "react";
import OverviewCard from "../Components/OverviewCard";

import PieCharts from "../Components/PieCharts";
import { GiReceiveMoney } from "react-icons/gi";

const Landing = () => {
  const potDetailsCard = [
    {
      id: 1,
      amount: "$159",
      title: "Savings",
      borderColor: "border-l-emerald-800",
    },
    {
      id: 2,
      amount: "$40",
      title: "Gift",
      borderColor: "border-l-cyan-600",
    },
    {
      id: 3,
      amount: "$110",
      title: "Concert Ticket",
      borderColor: "border-l-lime-600",
    },
    {
      id: 4,
      amount: "$10",
      title: "New Laptop",
      borderColor: "border-l-orange-300",
    },
  ];

  const transactionsDummyData = [
    {
      id: 1,
      name: "Emma Richardson",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHVzZXJzfGVufDB8fDB8fHww",
      amount: 75,
      date: "19 Aug 2024",
    },
    {
      id: 2,
      name: "Savory Bites Bistro",
      image:
        "https://images.unsplash.com/photo-1688264529550-04f8196964b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8a2ZjfGVufDB8fDB8fHww",
      amount: 550,
      date: "21 Aug 2024",
    },

    {
      id: 3,
      name: "Emma Richardson",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHVzZXJzfGVufDB8fDB8fHww",
      amount: 75,
      date: "19 Aug 2024",
    },
    {
      id: 4,
      name: "Savory Bites Bistro",
      image:
        "https://images.unsplash.com/photo-1688264529550-04f8196964b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8a2ZjfGVufDB8fDB8fHww",
      amount: 550,
      date: "21 Aug 2024",
    },
  ];

  const budgetDetailsCard = [
    {
      id: 1,
      amount: "$50.00",
      title: "Entertainment",
      borderColor: "border-l-[#277C78]",
    },
    {
      id: 2,
      amount: "$750.00",
      title: "Bills",
      borderColor: "border-l-[#82C9D7]",
    },
    {
      id: 3,
      amount: "$75.00",
      title: "Dining Out",
      borderColor: "border-l-[#F2CDAC]",
    },
    {
      id: 4,
      amount: "$100.00",
      title: "Personal Care",
      borderColor: "border-l-[#626070]",
    },
  ];

  const recurringBillsData = [
    {
      id: 1,
      amount: "$190.00",
      title: "Paid Bills",
      borderColor: "border-l-[#277C78]",
    },
    {
      id: 2,
      amount: "$194.00",
      title: "Total Upcoming",
      borderColor: "border-l-[#F2CDAC]",
    },
    {
      id: 3,
      amount: "$75.00",
      title: "Due Soon",
      borderColor: "border-l-[#82C9D7]",
    },
  ];

  return (
    <div className="h-full">
      <div className="small-main-menu-container  large-main-menu-container h-full  ">
        <h3 className="capitalize py-8 text-[#201f24] font-sans font-bold leading-10 text-3xl smallTablet:text-4xl smallDekstop:text-5xl">
          Overview
        </h3>

        {/* first section---balance, income, expenses */}

        <div className="flex flex-col smallTablet:flex-row gap-6  w-full max-w-full">
          {/* card-1 */}

          <OverviewCard
            bg={"black"}
            color={"white"}
            text={"Current Balance"}
            amount={"$4,836.00"}
          />

          {/* card-2 */}

          <OverviewCard
            bg={"white"}
            color={"black"}
            text={"Income"}
            amount={"$3,816.20"}
          />

          {/* card-3 */}

          <OverviewCard
            bg={"white"}
            color={"black"}
            text={"Expenses"}
            amount={"$1,800.00"}
          />
        </div>

        {/* second section--- pots, budget  */}

        {/* grid-structure */}

        <div className="grid laptop:grid-cols-8 laptop:grid-rows-5 gap-6   my-20">
          <div className="laptop:col-start-1 laptop:col-end-6 laptop:row-start-1 laptop:row-end-3  ">
            <div className=" px-5 py-6 gap-7 h-full  bg-white rounded-md ">
              {/* 1.1 */}

              <div className="flex justify-between items-center mb-10">
                <h4 className="text-[#201f24] font-sans font-bold text-xl leading-6">
                  Pots
                </h4>

                {/* 1.1.2 total saved cards*/}
                <p className="capitalize text-blue-700 underline text-xs font-sans font-normal leading-5">
                  see details
                </p>
              </div>

              <div className="flex flex-col  gap-10 smallTablet:grid smallTablet:grid-cols-8">
                <div className="flex flex-col gap-5 w-full mb-6 smallTablet:mb-0  smallTablet:col-span-3">
                  {/* 1.1.1 pots and see details button   */}

                  <div className="bg-[#F8F4F0] p-4 rounded-md shadow-md flex justify-center items-center gap-4 h-full">
                    {/* icon */}
                    <div>
                      <GiReceiveMoney className="text-5xl text-yellow-500" />
                    </div>

                    {/* total saved */}

                    <div className="flex flex-col items-center gap-3">
                      <p className="capitalize text-[#696868] font-sans font-normal leading-5">
                        total saved
                      </p>

                      <h3 className="text-[#201F24] font-sans font-bold leading-9 text-3xl">
                        $850
                      </h3>
                    </div>
                  </div>
                </div>

                {/* 1.2   4 cards*/}

                <div className="grid grid-cols-1  mobile:grid-cols-2 gap-4 smallTablet:w-full smallTablet:col-span-5  ">
                  {potDetailsCard.map((pots) => {
                    return (
                      <div
                        key={pots.id}
                        className={`bg-white py-2 px-4 w-full border-l-4 rounded-md flex flex-col items-start gap-2 ${pots.borderColor}`}
                      >
                        <h6 className="text-[#696868] font-sans text-sm font-normal leading-5 ">
                          {pots.title}
                        </h6>
                        <h4 className="text-[#201F24] font-bold text-lg leading-5 font-sans ">
                          {pots.amount}
                        </h4>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* --1-- */}
            </div>
          </div>
          <div className="laptop:col-start-1 laptop:col-end-5 laptop:row-start-3 laptop:row-end-6 bg-white rounded-md shadow-md py-6 px-2 mobile:px-6">
            <div className="flex justify-between items-center mb-10">
              <h4 className="text-[#201f24] font-sans font-bold text-xl leading-6">
                Transactions
              </h4>

              {/* 1.1.2 total saved cards*/}
              <p className="capitalize text-blue-700 underline  text-xs font-sans font-normal leading-5">
                see details
              </p>
            </div>

            {/* transaction-card */}

            <div className="flex flex-col gap-5">
              {transactionsDummyData.map((data) => {
                return (
                  <div className="flex justify-between items-center w-full rounded-md shadow-sm py-4 px-2">
                    <div
                      className="w-12 h-12 rounded-full bg-red-600 flex justify-center items-center overflow-hidden "
                      key={data.id}
                    >
                      <img
                        src={data.image}
                        alt="image"
                        className="w-full h-full"
                      />
                    </div>
                    <h5 className="font-bold leading-5 text-sm max-w-[80px] text-center  font-sans text-[#201F24] smallTablet:max-w-full ">
                      {data.name}
                    </h5>
                    <div className="flex flex-col gap-3 ">
                      <h4 className="text-[#277C78] font-sans text-sm font-bold leading-5">
                        {data.amount}
                      </h4>
                      <p className="text-[#696868] font-sans font-normal text-xs leading-4">
                        {data.date}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="laptop:col-start-6 laptop:col-end-9 laptop:row-start-1 laptop:row-end-4 bg-white rounded-md shadow-md py-6 px-5">
            <div className="flex justify-between items-center mb-10">
              <h4 className="text-[#201f24] font-sans font-bold text-xl leading-6">
                Budgets
              </h4>

              <p className="capitalize text-blue-700 underline  text-xs font-sans font-normal leading-5">
                see details
              </p>
            </div>

            <div className="flex flex-col smallTablet:flex-row gap-8 laptop:flex-col ">
              <div className="mx-auto">
                <PieCharts width={250} height={250} outerRadius={100} />
              </div>

              {/* 1.2   4 cards*/}

              <div className="grid grid-cols-1  mobile:grid-cols-2 gap-4 smallTablet:w-full smallTablet:col-span-5  ">
                {budgetDetailsCard.map((pots) => {
                  return (
                    <div
                      key={pots.id}
                      className={`bg-white py-2 px-4 w-full border-l-4 rounded-md flex flex-col items-start gap-2 ${pots.borderColor}`}
                    >
                      <h6 className="text-[#696868] font-sans text-sm font-normal leading-5 ">
                        {pots.title}
                      </h6>
                      <h4 className="text-[#201F24] font-bold text-lg leading-5 font-sans ">
                        {pots.amount}
                      </h4>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="laptop:col-start-5 laptop:col-end-9 laptop:row-start-4 laptop:row-end-6 bg-white rounded-md shadow-md py-6 px-5">
            <div className="flex justify-between items-center mb-10">
              <h4 className="text-[#201f24] font-sans font-bold text-xl leading-6">
                Recurring Bills
              </h4>

              {/* 1.1.2 total saved cards*/}
              <p className="capitalize text-blue-700 underline  text-xs font-sans font-normal leading-5">
                see details
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {recurringBillsData.map((data) => {
                return (
                  <div
                    key={data.id}
                    className={`flex justify-between px-4 py-6 border-l-8 ${data.borderColor} rounded-lg shadow-sm bg-[#F8F4F0]`}
                  >
                    <h5 className="text-[#696868] text-sm font-normal leading-5 font-sans">
                      {data.title}
                    </h5>

                    <h4 className="text-[#201F24] font-sans text-sm font-bold leading-5">
                      {data.amount}
                    </h4>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* m */}
      </div>
    </div>
  );
};

export default Landing;
