import React from "react";
import BasicNavbar from "../Components/BasicNavbar";
import { FormInput } from "../Components";
import PrimaryButton from "../Components/PrimaryButton";
import loginImg from "../images/loginImg.png";
import { Form, redirect, Link } from "react-router-dom";
import { customFetch } from "../utils";
import { store } from "../store";
import { loginUser } from "../features/users/userSlice";
import { toast } from "react-toastify";

export const action =
  (store) =>
  async ({ request, params }) => {
    const formdata = Object.fromEntries(await request.formData());

    try {
      const { data } = await customFetch.post("/users/login", formdata);
      store.dispatch(loginUser(data));
      toast.success("logged in successfully");

      return redirect("/");
    } catch (err) {
      let errorMsg = err?.response?.data?.message;
      console.error(errorMsg);
      toast.error(errorMsg);
      return redirect("/login");
    }
  };

const Login = () => {
  return (
    <div className="bg-black py-12">
      <div className=" section-container">
        <BasicNavbar />

        <div className="flex justify-between bg-white my-5 rounded-lg smallTablet:max-w-lg smallTablet:mx-auto smallDekstop:max-w-3xl smallDekstop:items-center smallDekstop:gap- smallDekstop:rounded-l-lg">
          {/* image */}

          <div className="hidden smallDekstop:flex max-w-full w-full ">
            <img src={loginImg} alt="login-img" className="w-full h-full" />
          </div>

          <div className="w-full max-w-full  rounded-lg shadow-md py-6 px-5 smallTablet:px-10 smallDekstop:h-full smallDekstop:shadow-none smallDekstop:rounded-none ">
            <h4 className="capitalize font-sans text-[#201f24] font-bold leading-10 my-6 text-2xl smallTablet:text-3xl">
              login
            </h4>

            <Form method="post">
              <div>
                <FormInput label="email" type="text" name="email" />
              </div>

              <div className="mt-4">
                <FormInput label="Password" type="password" name="password" />
              </div>

              <div className="my-8">
                <PrimaryButton
                  bg={"bg-black"}
                  text={"Login"}
                  color={"text-white"}
                  type={"submit"}
                />
              </div>
            </Form>

            <div className="flex items-center justify-center gap-1 flex-wrap">
              <p className="text-[#696868] font-sans font-normal leading-5 ">
                Need to create an account?
              </p>
              <Link to={"/register"}>
                <p className="underline text-[#201F24] font-sans font-bold leading-5 text-sm">
                  Sign Up
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
