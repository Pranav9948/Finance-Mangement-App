import React, { useState } from "react";
import PrimaryButton from "../Components/PrimaryButton";
import { BsThreeDots } from "react-icons/bs";
import { customFetch, formatPrice } from "../utils/index";
import { Form, useLoaderData } from "react-router-dom";
import { FormInput } from "../Components";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { toast } from "react-toastify";
import {
  addMoneyToPot,
  createNewPot,
  listAllPots,
  withdrawMoneyFromPot,
} from "../features/pots/PotSlice";
import { setuser } from "../features/users/userSlice";
import { createNewtransaction } from "../features/transactions/TransactionSlice";
import OverviewCard from "../Components/OverviewCard";
import { useDispatch, useSelector } from "react-redux";

export const loader = (store) => async (req, res) => {
  try {
    const userId = store.getState()?.userState?.userInfo?._id;

    console.log("userId", userId);

    const { data } = await customFetch.get("/pots", {
      headers: { "user-id": userId },
    });

    store.dispatch(listAllPots(data));

    return data;
  } catch (err) {
    console.log(err);

    return err;
  }
};

export const action =
  (store) =>
  async ({ request, params }) => {
    const userInfo = store.getState()?.userState?.userInfo;

    const userId = userInfo?._id;

    const formdata = Object.fromEntries(await request.formData());

    console.log("form", formdata);

    try {
      const { data } = await customFetch.post("/pots", formdata, {
        headers: { "user-id": userId },
      });

      const { newPot, user } = data;

      store.dispatch(createNewPot(newPot));
      store.dispatch(setuser(user));

      toast.success("pot created successfully");

      return "hello";
    } catch (err) {
      let errorMsg = err?.response?.data?.message;
      console.error(errorMsg);
      toast.error(errorMsg);

      return err;
    }
  };

export const Pots = () => {
  const data = useLoaderData();

  const [createPotModal, setCreatePotModal] = useState(false);
  const [color, setColor] = useColor("#561ecb");

  const [addMoneyId, setAddMoneyId] = useState(null);
  const [addMoney, setAddMoney] = useState(false);
  const [addedMoneyAmount, setAddedMoneyAmount] = useState(0);
  const [withdrawMoney, setWithdrawMoney] = useState(false);

  const [withDrawPotId, setWithDrawPotId] = useState(null);

  const dispatch = useDispatch();

  const { username, currentBalance, income, expense, _id } = useSelector(
    (state) => state?.userState?.userInfo
  );

  const { pots } = useSelector((state) => state?.potState);

  const AddMoney = (id) => {
    setAddMoneyId(id);
    setAddMoney(true);
  };

  const addPotMoney = (e) => {
    setAddedMoneyAmount(e.target.value);
  };

  const handleAddMoney = async (e) => {
    e.preventDefault();

    try {
      const userId = _id;

      const { data } = await customFetch.put(
        `/pots/${addMoneyId}`,
        { addedMoneyAmount },
        {
          headers: {
            "user-id": userId,
          },
        }
      );
      console.log("add", data);

      const { pot, user, transaction } = data;

      dispatch(setuser(user));
      dispatch(createNewtransaction(transaction));
      dispatch(addMoneyToPot(pot));
      toast.success("money added to pot successfully");
      setAddMoney(false);
      setAddMoneyId(null);

      return data;
    } catch (err) {
      console.log("err", err);

      let errorMsg = err?.response?.data?.message;
      console.error(errorMsg);
      toast.error(errorMsg);
      return err;
    }
  };

  const withDrawPot = async (withdrawPot) => {
    if (withdrawPot.percentageSaved !== 100) {
      const remainingAmount =
        Number(withdrawPot.targetAmount) - Number(withdrawPot.savedAmount);

      toast.error(`you must pay Rs:${remainingAmount}  to withdraw money`);
    } else {
      setWithDrawPotId(withdrawPot._id);
      setWithdrawMoney(true);

    
      try {
        const userId = _id;

        const { data } = await customFetch.delete(
          `/pots/${withdrawPot._id}`,

          {
            headers: {
              "user-id": userId,
            },
          }
        );
        console.log("add", data);

        const { pot, user, transaction } = data;

        dispatch(setuser(user));
        dispatch(createNewtransaction(transaction));
        dispatch(withdrawMoneyFromPot(pot._id));
        toast.success("Enjoy! money added to account successfully");
        setAddMoney(false);
        setAddMoneyId(null);

          setTimeout(() => {
            setWithDrawPotId(null);
            setWithdrawMoney(false);
          }, 4000);


        return data;
      } catch (err) {
        console.log("err", err);

        let errorMsg = err?.response?.data?.message;
        console.error(errorMsg);
        toast.error(errorMsg);
        return err;
      }
    }
  };

  return (
    <div className="h-full bg-[#F8F4F0] py-6 ">
      {createPotModal ? (
        <div className="bg-[#F8F4F0] h-screen flex  justify-center items-center  px-5 smallTablet:px-16 smallDekstop:px-32">
          <div className=" bg-white p-10   rounded-xl mx-auto flex flex-col w-full">
            <h3 className="capitalize text-xl font-sans font-bold text-center mb-10">
              Create New Pot
            </h3>

            <div className=" w-full">
              <Form method="post">
                <div className="grid grid-cols-1 smallTablet:grid-cols-2  smallTablet:gap-6 smallDekstop:gap-10">
                  <div className="w-full max-w-full ">
                    <FormInput label="Purpose" type="text" name="name" />
                  </div>

                  <div className="mt-4 smallTablet:mt-0 w-full max-w-full">
                    <FormInput
                      label="Target Amount"
                      type="number"
                      name="targetAmount"
                    />
                  </div>

                  <div className="mt-4 smallTablet:mt-0 w-full max-w-full">
                    <FormInput
                      label="Saved Amount"
                      type="number"
                      name="savedAmount"
                      defaultValue={0}
                      readonly={true}
                    />
                  </div>

                  <div className="mt-4 smallTablet:mt-0 w-full max-w-full">
                    <FormInput
                      label="Percentage Saved %"
                      type="number"
                      name="percentageSaved"
                      defaultValue={0}
                      readonly={true}
                    />
                  </div>

                  <div className="mt-4 smallTablet:mt-0 w-full max-w-full">
                    <h3 className="text-blue-600 font-sans font-bold capitalize leading-5 ">
                      select color {color.hex}
                    </h3>

                    <div className="my-4 w-full  ">
                      <ColorPicker
                        hideInput={["rgb", "hsv"]}
                        color={color}
                        onChange={setColor}
                        height={40}
                      />
                    </div>
                  </div>

                  <div>
                    <input type="hidden" name="color" value={color.hex} />
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
        </div>
      ) : (
        <div className="small-main-menu-container  large-main-menu-container h-full  ">
          <div className="flex items-center justify-between ">
            <h3 className="capitalize py-8 text-[#201f24] font-sans font-bold leading-10 text-3xl smallTablet:text-4xl smallDekstop:text-5xl">
              Pots
            </h3>

            <div onClick={() => setCreatePotModal(true)}>
              <PrimaryButton
                bg={"bg-black"}
                text={"+ Add New Pot"}
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

          {/* grid-structure */}

          {pots?.length === 0 ? (
            <div className="flex flex-col justify-center items-center gap-8 py-20 w-full bg-white shadow-sm">
              {" "}
              <h3 className=" text-xl smallTablet:text-3xl font-semibold">
                No pots yet
              </h3>{" "}
              <div onClick={() => setCreatePotModal(true)}>
                <PrimaryButton
                  bg={"bg-black"}
                  text={"+ Add New Pot"}
                  color={"text-white"}
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 laptop:grid-cols-2 gap-6  my-8  ">
              {/* card */}

              {pots?.map((pot) => {
                return (
                  <div>
                    {pot._id === withDrawPotId ? (
                      <div>
                        <img
                          src="https://media2.giphy.com/media/IpcddHV2Dmug8ALMNR/giphy.gif?cid=6c09b952400qgowgsv6vttslp2chh02fwq1f3gercyj012vr&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                          alt="potbreaking gif"
                          className="h-80 w-full"
                        />
                      </div>
                    ) : (
                      <div
                        className="bg-white flex flex-col w-full  px-5 py-6 rounded-md shadow-sm"
                        key={pot._id}
                      >
                        <div className="flex items-center justify-between mb-12">
                          <div className="flex items-center justify-start gap-6">
                            <div
                              className={`w-6 h-6 rounded-full ${pot?.color} `}
                              style={{ background: pot.color }}
                            ></div>
                            <h5 className="capitalize text-[#201F24] font-sans text-xl font-bold leading-6">
                              {pot?.name}
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
                            {formatPrice(pot?.savedAmount)}
                          </h2>
                        </div>

                        {/* progress */}

                        <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div
                            class={`${pot.bg} h-2.5 rounded-full`}
                            style={{
                              width: `${pot.percentageSaved}%`,
                              background: pot.color,
                            }}
                          ></div>
                        </div>

                        <div className="my-6 flex items-center justify-between mb-8">
                          <div className="text-[#696868] font-sans text-xs font-bold leading-5 ">
                            {pot?.percentageSaved}%
                          </div>
                          <div className="text-[#696868] font-sans text-base font-normal leading-4">
                            Target of {formatPrice(pot?.targetAmount)}
                          </div>
                        </div>

                        {/* buttons-container */}

                        <div>
                          {addMoneyId === pot._id && addMoney && (
                            <div className="my-6">
                              <div className="w-full max-w-full ">
                                <form onSubmit={(e) => handleAddMoney(e)}>
                                  <div>
                                    <FormInput
                                      label="enter amount"
                                      type="number"
                                      name="savedAmount"
                                      maxValue={
                                        Number(pot.targetAmount) -
                                        Number(pot.savedAmount)
                                      }
                                      minValue={1}
                                      onChange={addPotMoney}
                                    />
                                  </div>

                                  <div className="my-4">
                                    <button
                                      type="submit"
                                      onClick={() => AddMoney(pot?._id)}
                                      className={`p-4 rounded-md bg-[#F8F4F0] text-[#201F24] font-sans text-sm font-bold leading-5 hover:bg-black hover:text-white w-full ${
                                        pot._id === addMoneyId &&
                                        "bg-yellow-300 text-white"
                                      }`}
                                    >
                                      + Add Money
                                    </button>
                                  </div>
                                </form>

                                <div>
                                  <p>
                                    you can add a maximum amount of{" "}
                                    <span className="text-red-800 font-bold font-sans text-lg">
                                      {" "}
                                      {Number(pot.targetAmount) -
                                        Number(pot.savedAmount)}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {pot._id !== addMoneyId && (
                          <div className="flex items-center justify-between gap-4 ">
                            <button
                              onClick={() => AddMoney(pot?._id)}
                              className={`p-4 rounded-md bg-[#F8F4F0] text-[#201F24] font-sans text-sm font-bold leading-5 hover:bg-black hover:text-white w-full ${
                                pot._id === addMoneyId &&
                                "bg-yellow-300 text-white"
                              }`}
                            >
                              + Add Money
                            </button>

                            <button
                              onClick={() => withDrawPot(pot)}
                              className="p-4 rounded-md bg-[#F8F4F0] text-[#201F24] font-sans text-sm font-bold leading-5 hover:bg-black hover:text-white w-full"
                            >
                              Withdraw
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
