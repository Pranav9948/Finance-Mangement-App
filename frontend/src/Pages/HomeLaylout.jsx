import { Outlet, useNavigation } from "react-router-dom";
import { Navbar, Loader } from "../components";
import Sidebar from "../Components/Sidebar";
const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  return (
    <div className="h-full bg-black ">
      <Navbar />
      <div className="flex items-start w-full h-full">
        <div className="w-1/4 bg-black h-full hidden laptop:flex">
          <Sidebar />
        </div>

        <div className="w-full h-full bg-[#F2F3F7]">
          {isPageLoading ? <Loading /> : <Outlet />}
        </div>
      </div>
    </div>
  );
};
export default HomeLayout;
