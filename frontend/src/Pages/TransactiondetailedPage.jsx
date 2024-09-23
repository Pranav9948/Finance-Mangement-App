import React from "react";
import { customFetch, formatPrice } from "../utils";
import { toast } from "react-toastify";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { FaAngry, FaSmile } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setuser } from "../features/users/userSlice";
import { deleteTransactions } from "../features/transactions/TransactionSlice";



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

const TransactiondetailedPage = () => {
  const data = useLoaderData();

  const navigate = useNavigate();

  const { id } = useParams();

  const transactionIdValue = id;

  const dispatch = useDispatch();

  const userId = useSelector((state) => state?.userState?.userInfo?._id);



  const deleteTransaction = async () => {
    try {
      const { data } = await customFetch.delete(
        `/transactions/${transactionIdValue}`,
        {
          headers: { "user-id": userId },
        }
      );


      navigate("/transactions");
    } catch (err) {
      let errorMsg = err?.response?.data?.message;
      console.error(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <div className="bg-[#F8F4F0] h-full   flex flex-col justify-center  py-20 px-3 smallTablet:px-16 largeDekstop:px-40">
      <div className="   bg-white shadow-md rounded-md max-w-full py-20 flex justify-center items-center flex-col cart-container ">
        <h3 className="capitalize text-2xl font-semibold mb-10 text-blue-800">
          Transaction details
        </h3>

        <div className="overflow-x-auto smallTablet:px-10 w-full">
          <table className="table w-full ">
            {/* head */}
            <thead>
              <tr>
                <th className="text-xs smallTablet:text-sm font-semibold text-start text-black  ">
                  image
                </th>
                <th className="text-xs smallTablet:text-sm font-semibold text-start text-black  ">
                  Merchant
                </th>
                <th className="text-xs smallTablet:text-sm font-semibold text-start text-black  ">
                  Type
                </th>
                <th className="text-xs smallTablet:text-sm font-semibold text-start text-black  ">
                  Category
                </th>
                <th className="text-xs smallTablet:text-sm font-semibold text-start text-black  ">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>
                  {" "}
                  <img
                    src={data?.image}
                    alt="image"
                    className=" w-10 h-10 smallTablet:h-14 smallTablet:w-14 rounded-full"
                  />
                </th>
                <td>
                  {" "}
                  <h3 className="text-xs smallTablet:text-sm font-semibold text-start text-black  ">
                    {data?.name}
                  </h3>
                </td>
                <td>
                  {" "}
                  <h5
                    className={`${
                      data.type === "Credit" ? "text-[#277C78]" : "text-red-600"
                    } flex items-center gap-3 p-0  font-sans leading-5 mb-1  text-xs smallTablet:text-sm font-semibold text-center `}
                  >
                    {data?.type}
                  </h5>
                </td>
                <td>
                  {" "}
                  <h4 className="text-xs smallTablet:text-sm font-semibold text-start  text-black my-5">
                    {data?.category}
                  </h4>
                </td>

                <td>
                  <div
                    className={`${
                      data.type === "Credit" ? "text-[#277C78]" : "text-red-600"
                    } flex items-center gap-3 p-0  font-sans text-sm font-bold leading-5  `}
                  >
                    {data.type === "Credit" ? (
                      <FaSmile className="text-lg font-semibold text-yellow-400" />
                    ) : (
                      <FaAngry className="text-orange-500 text-lg font-semibold" />
                    )}{" "}
                    {formatPrice(data.amount)}
                  </div>
                </td>
              </tr>
              {/* row 2 */}
            </tbody>
          </table>
        </div>

        <div className="my-10 flex items-center justify-center gap-4">
          <Link to={`/transactions/edit/${data._id}`}>
            {" "}
            <button className="btn btn-accent">Edit</button>
          </Link>

          <button
            className="btn btn-secondary"
            onClick={() => deleteTransaction()}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactiondetailedPage;
