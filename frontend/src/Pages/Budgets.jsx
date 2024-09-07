import React from 'react'
import PrimaryButton from '../Components/PrimaryButton';
import PieCharts from "../Components/PieCharts";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineArrowRight } from "react-icons/md";

const Budgets = () => {


  const budgetSummary = [
    {
      title: "Bills",
      targetAmount: "$750.00",
      currentAmount: "$250.00",
      bg: "bg-[#F2CDAC]",
    },

    {
      title: "Dining Out",
      targetAmount: "$75.00",
      currentAmount: "$65.00",
      bg: "bg-[#277C78]",
    },

    {
      title: "Personal Care",
      targetAmount: "$750.00",
      currentAmount: "$250.00",
      bg: "bg-[#626070]",
    },

    {
      title: "Entertainment",
      targetAmount: "$50.00",
      currentAmount: "$25.00",
      bg: "bg-[#82C9D7]",
    },
  ];

 const allData = [
   {
     category: "Entertainment",
     maximumAmount: "$50.00",
     spentAmount: "$25.00",
     Free: "$25.00",
     bg: "bg-[#277C78]",

     spendingData: [
       {
         name: "Papa Software",
         amountSpend: "$10.00",
         date: "16 Aug 2024",
       },
       {
         name: "Skincare Products",
         amountSpend: "$15.00",
         date: "07 Aug 2024",
       },
       {
         name: "Gym Membership",
         amountSpend: "$10.00",
         date: "14 Aug 2024",
       },
     ],
   },
   {
     category: "Bills",
     maximumAmount: "$200.00",
     spentAmount: "$150.00",
     Free: "$50.00",
     bg: "bg-[#FF6F61]",

     spendingData: [
       {
         name: "Electricity Bill",
         amountSpend: "$80.00",
         date: "10 Aug 2024",
       },
       {
         name: "Water Bill",
         amountSpend: "$50.00",
         date: "12 Aug 2024",
       },
       {
         name: "Internet Bill",
         amountSpend: "$20.00",
         date: "15 Aug 2024",
       },
       {
         name: "Gas Bill",
         amountSpend: "$30.00",
         date: "18 Aug 2024",
       },
     ],
   },
   {
     category: "Dining Out",
     maximumAmount: "$100.00",
     spentAmount: "$60.00",
     Free: "$40.00",
     bg: "bg-[#F8C471]",

     spendingData: [
       {
         name: "McDonald's",
         amountSpend: "$20.00",
         date: "05 Aug 2024",
       },
       {
         name: "Starbucks",
         amountSpend: "$10.00",
         date: "08 Aug 2024",
       },
       {
         name: "Olive Garden",
         amountSpend: "$15.00",
         date: "13 Aug 2024",
       },
       {
         name: "Burger King",
         amountSpend: "$15.00",
         date: "20 Aug 2024",
       },
     ],
   },
   {
     category: "Personal Care",
     maximumAmount: "$80.00",
     spentAmount: "$55.00",
     Free: "$25.00",
     bg: "bg-[#85C1E9]",

     spendingData: [
       {
         name: "Haircut",
         amountSpend: "$20.00",
         date: "02 Aug 2024",
       },
       {
         name: "Skincare Products",
         amountSpend: "$15.00",
         date: "07 Aug 2024",
       },
       {
         name: "Gym Membership",
         amountSpend: "$10.00",
         date: "14 Aug 2024",
       },
       {
         name: "Massage Therapy",
         amountSpend: "$10.00",
         date: "19 Aug 2024",
       },
     ],
   },
 ];








  return (
    <div className="bg-[#F8F4F0] ">
      <div className="small-main-menu-container  large-main-menu-container   h-full  ">
        <div className="flex items-center justify-between ">
          <h3 className="capitalize py-8 text-[#201f24] font-sans font-bold leading-10 text-3xl smallTablet:text-4xl smallDekstop:text-5xl">
            Budgets
          </h3>

          <div>
            <PrimaryButton
              bg={"bg-black"}
              text={"+ Add New Budget"}
              color={"text-white"}
            />
          </div>
        </div>

        {/* overall and list view parent */}

        <div className="flex flex-col justify-between items-start gap-6 laptop:flex-row  ">
          {/* overall */}

          <div className=" bg-white w-full flex flex-col smallTablet:flex-row rounded-md shadow-sm px-2  mobile:px-5 py-6 smallTablet:gap-10 laptop:flex-col ">
            <div className="mx-auto my-5 smallTablet:hidden">
              <PieCharts width={250} height={250} outerRadius={100} />
            </div>

             <div className="mx-auto my-5 hidden smallTablet:flex">
              <PieCharts width={300} height={300} outerRadius={120} />
            </div>

             <div className="mx-auto my-5 hidden smallLaptop:flex">
              <PieCharts width={400} height={400} outerRadius={160} />
            </div>

            <div className="flex flex-col  smallTablet:w-full   ">
              <h5 className="text-[#201F24] font-sans text-center smallTablet:text-start font-bold leading-6 text-xl mb-6">
                Spending Summary
              </h5>
              {/* 1 */}

              {budgetSummary.map((data, idx) => {
                return (
                  <div
                    className={`py-4  flex items-center justify-between   shadow-sm px-1 mobile:px-2  `}
                    key={idx}
                  >
                    <div className={`${data.bg} h-6 w-2 rounded-sm `}></div>

                    <h6 className="text-[#696868] w-full ml-2 text-start font-sans text-sm font-normal leading-5 flex justify-start items-start ">
                      {data.title}
                    </h6>

                    <p className="text-[#696868] font-sans text-sm font-normal leading-5 w-full   ">
                      <span className="text-[#201F24] font-sans font-bold text-base leading-6">
                        {data.currentAmount}
                      </span>{" "}
                      of {data.targetAmount}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* list view */}

          <div className="flex flex-col gap-6 w-full">
            {allData.map((data) => {
              return (
                <div className="p-2 smallMobile:p-4 p-6 bg-white rounded-md shadow-sm w-full ">
                  {/* header */}

                  <div className="flex items-center justify-between mb-5 w-full ">
                    <div className="flex items-center gap-4  w-full">
                      <div className={`w-4 h-4 rounded-full ${data.bg}`}></div>

                      <h3 className="text-[#201F24] font-sans text-xl font-bold leading-6">
                        {data.category}
                      </h3>
                    </div>

                    <div>
                      <BsThreeDots />
                    </div>
                  </div>

                  <p className="text-[#696868] font-sans text-sm font-normal leading-5">
                    Maximum of {data.maximumAmount}
                  </p>

                  {/* progress */}

                  <div class="w-full bg-gray-200 rounded-md  h-6 dark:bg-gray-700 my-5">
                    <div
                      class={`${data.bg} h-6 rounded-md`}
                      style={{ width: "45%" }}
                    ></div>
                  </div>

                  {/* spent | free */}

                  <div className="flex items-center justify-between mb-7">
                    <div className="w-full border-l-4 rounded-md shadow-sm border-l-[#277c78] flex flex-col pl-4 gap-2">
                      <p className="text-[#696868] font-sans text-xs font-normal leading-5">
                        Spent
                      </p>
                      <h5 className="text-[#201F24] font-sans text-sm font-bold">
                        {data.spentAmount}
                      </h5>
                    </div>

                    <div className="w-full border-l-4 rounded-md shadow-sm  flex flex-col pl-4 gap-2">
                      <p className="text-[#696868] font-sans text-xs font-normal leading-5">
                        Free
                      </p>
                      <h5 className="text-[#201F24] font-sans text-sm font-bold">
                        {data.Free}
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
                      {data?.spendingData.map((data, idx) => {
                        return (
                          <div
                            className="flex items-center justify-between py-4 shadow-sm px-2"
                            key={idx}
                          >
                            <h6 className="text-[#201F24] font-sans text-xs font-bold leading-5">
                              {data.name}
                            </h6>

                            <div className="flex flex-col items-center">
                              <h6 className="text-[#201F24] font-sans text-xs font-bold leading-5">
                                {data.amountSpend}
                              </h6>
                              <p className="text-[#696868] font-sans text-sm font-normal leading-5">
                                {data.date}
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
      </div>
    </div>
  );
}

export default Budgets