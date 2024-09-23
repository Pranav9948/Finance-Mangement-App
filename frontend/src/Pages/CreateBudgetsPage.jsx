import React, { useEffect, useState } from "react";
import PrimaryButton from "../Components/PrimaryButton";

import { Form, redirect, useLoaderData } from "react-router-dom";
import { customFetch, formatPrice, formatDate } from "../utils";
import CategorySelectBox from "../Components/CategorySelectBox";
import { FormInput } from "../Components";
import { ColorPicker, useColor } from "react-color-palette";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createNewbudget } from "../features/budgets/BudgetSlice";

export const loader =
  (store) =>
  async ({ request, params }) => {
    const userInfo = store.getState()?.userState?.userInfo;

    const userId = userInfo?._id;

    try {
      const { data } = await customFetch.get(
        "/budgets/getSetBudget",

        { headers: { "user-id": userId } }
      );

      return data;
    } catch (err) {
      console.log(err);
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
      const { data } = await customFetch.post(
        "/budgets",
        { formdata },
        {
          headers: { "user-id": userId },
        }
      );

      store.dispatch(createNewbudget(data));

      toast.success("budget created successfully");
      return redirect("/budgets");
    } catch (err) {
      console.log(err);
      let errorMsg = err?.response?.data?.message;
      console.error(errorMsg);
      toast.error(errorMsg);

      return err;
    }
  };

const CreateBudgetsPage = () => {
  const [showBudgetsModal, setShowBudgetsModal] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [color, setColor] = useColor("#561ecb");

  const budgets = useSelector((state) => state.budgetState.budgets) || [];

  const budgetSize = 4 - budgets.length;

  let percentage;

  const datas = useLoaderData();

  let result = datas.map((a) => a.category);

  useEffect(() => {
    getAllCategoriesApi();
  }, []);

  const getAllCategoriesApi = async () => {
    try {
      const { data } = await customFetch.get("/budgets/getCategories");
      setAllCategories(data);
    } catch (err) {
      console.log("err");
    }
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  return (
    <div className="bg-[#F8F4F0] ">
      <div className="small-main-menu-container  large-main-menu-container   h-full  ">
        <div className="flex flex-col py-10 w-full my-10 justify-center items-center bg-white rounded-md shadow-sm px-7 mobile:px-10 smallDekstop:px-20 largeDekstop:px-28">
          <h5 className="capitalize text-xl font-bold ">create new Budget</h5>

          {result.length > 0 && (
            <>
              <h4 className="mt-8 text-start w-full font-sans font-semibold text-red-400 text-lg">
                pls set budgets for all these categories{" "}
              </h4>{" "}
              <div className="text-green-400 font-sans text-sm text-start w-full mt-3">
                {result.join(" , ")}
              </div>
            </>
          )}

          <div className=" w-full my-12">
            <Form method="post">
              <div className="grid grid-cols-1 smallTablet:grid-cols-2  smallTablet:gap-6 smallDekstop:gap-10">
                <div className="mt-4 smallTablet:mt-0 w-full max-w-full ">
                  <CategorySelectBox
                    onChange={handleCategoryChange}
                    allCategories={allCategories}
                    label={"choose category"}
                    name={"category"}
                  />
                </div>

                <div className="mt-4 smallTablet:mt-0 w-full max-w-full">
                  <FormInput
                    label="Target Amount"
                    type="number"
                    name="targetAmount"
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
                    text={"set Budget"}
                    color={"text-white"}
                    type={"submit"}
                  />
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBudgetsPage;
