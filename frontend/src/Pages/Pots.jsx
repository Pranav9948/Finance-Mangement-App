import React from 'react'
import PrimaryButton from '../Components/PrimaryButton';
import { BsThreeDots } from "react-icons/bs";

const Pots = () => {

const pots = [
  {
    bg: "bg-[#277C78]",
    purpose: "Savings",
    savedAmount: "$159.00",
    savedPercentage: "7.95%",
    targetAmount: "$2000",
  },
  {
    bg: "bg-[#FF6F61]",
    purpose: "Vacation",
    savedAmount: "$450.00",
    savedPercentage: "22.50%",
    targetAmount: "$2000",
  },
  {
    bg: "bg-[#F8C471]",
    purpose: "Emergency Fund",
    savedAmount: "$750.00",
    savedPercentage: "37.50%",
    targetAmount: "$2000",
  },
  {
    bg: "bg-[#85C1E9]",
    purpose: "New Car",
    savedAmount: "$1200.00",
    savedPercentage: "60.00%",
    targetAmount: "$2000",
  },
  {
    bg: "bg-[#AF7AC5]",
    purpose: "Education",
    savedAmount: "$300.00",
    savedPercentage: "15.00%",
    targetAmount: "$2000",
  },
  {
    bg: "bg-[#F1948A]",
    purpose: "Home Renovation",
    savedAmount: "$500.00",
    savedPercentage: "25.00%",
    targetAmount: "$2000",
  },
];



  return (
    <div className="h-full bg-[#F8F4F0] py-6 ">
      <div className="small-main-menu-container  large-main-menu-container h-full  ">
        <div className="flex items-center justify-between ">
          <h3 className="capitalize py-8 text-[#201f24] font-sans font-bold leading-10 text-3xl smallTablet:text-4xl smallDekstop:text-5xl">
            Pots
          </h3>

          <div>
            <PrimaryButton
              bg={"bg-black"}
              text={"+ Add New Budget"}
              color={"text-white"}
            />
          </div>
        </div>

        {/* grid-structure */}

        <div className="grid grid-cols-1 laptop:grid-cols-2 gap-6  my-8  ">
          {/* card */}

          {
            pots.map((pot)=>{

              return (
                <div className="bg-white flex flex-col w-full  px-5 py-6 rounded-md shadow-sm">
                  <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center justify-start gap-6">
                      <div className={`w-6 h-6 rounded-full ${pot.bg}`}></div>
                      <h5 className="capitalize text-[#201F24] font-sans text-xl font-bold leading-6">
                      {pot.purpose}
                      </h5>
                    </div>

                    <div>
                      <BsThreeDots className="text-[#B3B3B3] text-2xl" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-5 ">
                    <p className="text-[#696868] font-sans text-sm font-normal leading-5">
                      Total Saved
                    </p>

                    <h2 className="text-[#201F24] font-sans text-3xl font-bold leading-10">
                     {pot.savedAmount}
                    </h2>
                  </div>

                  {/* progress */}

                  <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      class={`${pot.bg} h-2.5 rounded-full`}
                      style={{ width: "45%" }}
                    ></div>
                  </div>

                  <div className="my-6 flex items-center justify-between mb-8">
                    <div className="text-[#696868] font-sans text-xs font-bold leading-5">
                     {pot.savedPercentage}
                    </div>
                    <div className="text-[#696868] font-sans text-xs font-normal leading-4">
                      Target of {pot.targetAmount}
                    </div>
                  </div>

                  {/* buttons-container */}

                  <div className="flex items-center justify-between gap-4 ">
                    <button className="p-4 rounded-md bg-[#F8F4F0] text-[#201F24] font-sans text-sm font-bold leading-5 hover:bg-black hover:text-white w-full">
                      + Add Money
                    </button>

                    <button className="p-4 rounded-md bg-[#F8F4F0] text-[#201F24] font-sans text-sm font-bold leading-5 hover:bg-black hover:text-white w-full">
                      Withdraw
                    </button>
                  </div>
                </div>
              );
            })
          }

         



        </div>
      </div>
    </div>
  );
}

export default Pots