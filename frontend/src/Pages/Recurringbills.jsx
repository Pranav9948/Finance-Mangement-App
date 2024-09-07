import React from 'react'
import { MdOutlineMessage } from "react-icons/md";
import SearchBar from '../Components/SearchBar';
import Dropdown from 'rsuite/esm/Dropdown';
import { FaSort } from 'react-icons/fa6';
import { FaSortAlphaDownAlt, FaSortAlphaUp } from 'react-icons/fa';

const Recurringbills = () => {


  const summaryDetails=[
    {

      key:"Paid Bills",
      value: "4($190.00)"
      
      
    },
    {

      
      key:"TotalUpcoming",
      value: "4($194.00)"
    }
    ,
    {

      
      key:"DueSoon",
      value: "2($59.98)"
    }
  ]


   const recurringBillsData = [
     {
       image:
         "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5ldGZsaXh8ZW58MHx8MHx8fDA%3D",
       title: "Netflix",
       date: "Monthly 2nd",
       status: "paid",
       price: "$100",
     },
     {
       image:
         "https://images.unsplash.com/photo-1611484550037-d5a0da2b1446?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BvdGlmeXxlbnwwfHwwfHx8MA%3D%3D",
       title: "Spotify",
       date: "Monthly 5th",
       status: "due",
       price: "$15",
     },
     {
       image:
         "https://plus.unsplash.com/premium_photo-1669077046957-ad37d2973c1b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGJvfGVufDB8fDB8fHww",
       title: "HBO Max",
       date: "Monthly 10th",
       status: "paid",
       price: "$50",
     },
     {
       image:
         "https://images.unsplash.com/photo-1590599145008-e4ec48682067?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFtYXpvbnxlbnwwfHwwfHx8MA%3D%3D",
       title: "Amazon Prime",
       date: "Monthly 12th",
       status: "due",
       price: "$12",
     },
     {
       image:
         "https://images.unsplash.com/photo-1524008279394-3aed4643b30b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlzbmV5fGVufDB8fDB8fHww",
       title: "Disney+",
       date: "Monthly 15th",
       status: "paid",
       price: "$8",
     },
     {
       image:
         "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBwbGV8ZW58MHx8MHx8fDA%3D",
       title: "Apple Music",
       date: "Monthly 18th",
       status: "due",
       price: "$9.99",
     },
     {
       image:
         "https://images.unsplash.com/photo-1590599145008-e4ec48682067?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFtYXpvbnxlbnwwfHwwfHx8MA%3D%3D",
       title: "Dropbox",
       date: "Monthly 20th",
       status: "paid",
       price: "$10",
     },
     {
       image:
         "https://images.unsplash.com/photo-1590599145008-e4ec48682067?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFtYXpvbnxlbnwwfHwwfHx8MA%3D%3D",
       title: "YouTube Premium",
       date: "Monthly 22nd",
       status: "due",
       price: "$11.99",
     },
     {
       image:
         "https://images.unsplash.com/photo-1590599145008-e4ec48682067?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFtYXpvbnxlbnwwfHwwfHx8MA%3D%3D",
       title: "Hulu",
       date: "Monthly 25th",
       status: "paid",
       price: "$14.99",
     },
     {
       image:
         "https://images.unsplash.com/photo-1501577316686-a5cbf6c1df7e?w=500&auto=format&fit=crop&q=60",
       title: "Google Drive",
       date: "Monthly 30th",
       status: "due",
       price: "$2.99",
     },
   ];




  return (
    <div className="h-full bg-[#F8F4F0] py-6 mobile:px-2">
      <div className="cart-container   h-full ">
        <h3 className="capitalize py-8 text-[#201f24] font-sans font-bold leading-10 text-3xl smallTablet:text-4xl smallDekstop:text-5xl">
          Recurring Bills
        </h3>

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

            <h2 className="font-sans text-3xl font-bold leading-10">$384.98</h2>
          </div>

          {/* recurring-bills-list */}

          <div className="smallTablet:row-start-2 smallTablet:row-end-3 smallTablet:col-start-1 smallTablet:col-end-9  laptop:col-start-4 laptop:col-end-9 laptop:row-start-1 laptop:row-end-4 bg-white rounded-md shadow-md p-0 smallTablet:p-8">
            <div className="grid grid-cols-4 place-content-between  place-items-center p-5 ">
              <div className="col-start-1 col-end-3 w-full ">
                <SearchBar title="search Recurring Bills" />
              </div>

              <div className="col-start-3 col-end-5">
                <Dropdown title="Sort by" icon={<FaSort />}>
                  <Dropdown.Item icon={<FaSortAlphaUp />}>Latest</Dropdown.Item>
                  <Dropdown.Item icon={<FaSortAlphaDownAlt />}>
                    Oldest
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </div>

            <div className="w-full my-6 ">
              <table className="table table-zebra w-full">
                {/* head */}

                <thead className="w-full px-5">
                  <tr className="w-full">
                    <div className="grid grid-cols-10">
                      <div className="col-start-1 col-end-4 flex items-center justify-center">
                        <th className="text-[#696868] font-sans text-xs font-normal leading-4">
                          Bill Title
                        </th>
                      </div>

                      <div className="col-start-6 col-end-8 mobile:col-end-8 flex items-center justify-center">
                        <th className="text-[#696868] font-sans text-xs font-normal leading-4">
                          Due Date
                        </th>
                      </div>

                      <div className="col-start-8 mobile:col-end-10 flex items-center justify-start">
                        <th className="text-[#696868] font-sans text-xs font-normal leading-4">
                          Amount
                        </th>
                      </div>
                    </div>
                  </tr>
                </thead>

                {/* body */}

                <tbody className="w-full bg-white shadow-sm  ">
                  {recurringBillsData.map((data, idx) => {
                    return (
                      <>
                        <tr className="w-full bg-white" key={idx}>
                          <div className="grid grid-cols-6 place-content-center place-items-center  px-1 py-4  ">
                            {/* icon */}
                            <div className="col-start-1   grid place-content-center place-items-center">
                              <td className="p-0 w-10 h-10 overflow-hidden rounded-full flex justify-center items-center bg-[#F8F4F0] ">
                                <img
                                  src={data.image}
                                  alt="image"
                                  className="h-full w-full "
                                />
                              </td>
                            </div>

                            {/* name, category */}

                            <div className="col-start-2 col-end-4 ml-2 flex justify-start items-start w-full  ">
                              <td className="p-0 text-[#201F24] max-w-[70px] text-center mobile:max-w-full mobile:text-start font-sans text-sm font-bold leading-5 mb-1">
                                {data.title}
                              </td>
                            </div>

                            {/* amount, date */}

                            <div className="col-start-4 col-end-6 ">
                              <td className="p-0 text-[#277C78] font-sans text-sm font-bold leading-5 mb-1">
                                {data.date}
                              </td>
                            </div>

                            {/* amount */}

                            <div className="col-start-6 col-end-7 ">
                              <td className="p-0 text-[#201F24] font-sans text-sm font-bold leading-5 mb-1">
                                {data.price}
                              </td>
                            </div>

                            {/* * */}
                          </div>
                        </tr>
                      </>
                    );
                  })}
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

            <div className="flex flex-col">
              {summaryDetails.map((data, idx) => {
                return (
                  <div
                    key={idx}
                    className="flex justify-between items-center py-4 border-t-2 border-b-gray-200"
                  >
                    <h6 className="text-[#696868] font-sans text-xs font-normal leading-5">
                      {data.key}
                    </h6>

                    <h4 className="text-[#201f24] font-sans text-xs font-bold leading-4">
                      {data.value}
                    </h4>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recurringbills