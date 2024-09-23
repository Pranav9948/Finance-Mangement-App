import { Outlet, useNavigation } from "react-router-dom";
import { Navbar, Loader,Sidebar,Header } from "../Components";
import React from "react";

const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  return (
    <div className="h-full bg-black ">
      <div className="smallTablet:hidden">
        <Header />
        <Navbar />
      </div>
      <div className="flex items-start w-full h-full">
        <div className="w-1/4 bg-black h-full hidden laptop:flex">
          <Sidebar />
        </div>

        <div className="w-full h-full bg-[#F8F4F0]">
          {isPageLoading ? (
            <Loader />
          ) : (
            <div>
              <div className="hidden smallTablet:flex">
                <Header />
              </div>
              <Outlet />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default HomeLayout;
