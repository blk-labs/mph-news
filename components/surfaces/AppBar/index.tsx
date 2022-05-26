import Link from "next/link";
import {
  FacebookRounded,
  Instagram,
  YouTube,
  Twitter,
  PersonOutlineRounded,
  AccountCircleOutlined,
  Menu,
  Logout,
} from "@mui/icons-material";
import Logo from "../../../public/assets/images/logo.png";
import { useAuth } from "../../../hooks/authHook";
import { useCallback, useState } from "react";
import BottomBar from "./BottomBar";
import SocialLinkButtons from "../../inputs/SocialLinkButtons";
import MobileDrawer from "../../navigation/MobileDrawer";
import useRouting from "../../../hooks/routingHook";
import { LinearProgress } from "@mui/material";
import { linearProgressClasses } from "@mui/material/LinearProgress";
import { useRouter } from "next/router";

type AccountButtonProps = {
  className?: string;
};
export const AccountButton: React.FunctionComponent<AccountButtonProps> = ({
  className = "",
}) => {
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    await auth.signOut();
    router.push("/");
  }, [auth]);

  return auth.user ? (
    <a href="#" className={`flex items-center justify-end ${className}`} onClick={handleLogout}>
      <Logout className="text-[35px]" />
      <p className="ml-3 hidden lg:block text-sm font-bold font-mont uppercase">
        Logout
      </p>
    </a>
  ) : (
    <Link href="/auth/signin">
      <a className={`flex items-center justify-end ${className}`}>
        <AccountCircleOutlined className="text-[35px]" />
        <p className="ml-3 hidden lg:block text-sm font-bold font-mont uppercase">
          Account
        </p>
      </a>
    </Link>
  );
};

const AppBar: React.FunctionComponent = () => {
  const [loading, setLoading] = useState(false);
  useRouting((status) => {
    setLoading(status === "start" ? true : false);
  });

  return (
    <>
      {loading && (
        <div className="w-full">
          <LinearProgress
            classes={{
              colorPrimary: "red",
              barColorPrimary: "red",
              dashedColorPrimary: "red",
              dashedColorSecondary: "#898989",
              colorSecondary: "#ff0",
            }}
            sx={{
              [`&.${linearProgressClasses.colorPrimary}`]: {
                backgroundColor: "#000000",
              },
              [`& .${linearProgressClasses.bar}`]: {
                backgroundColor: "#ffffff95",
              },
            }}
          />
        </div>
      )}
      <div className="px-6 lg:px-[120px] py-2 flex flex-wrap justify-between items-center border-b-[3px] border-black lg:border-b lg:border-gray-300">
        <SocialLinkButtons
          className="w-full lg:w-2/5 py-3 lg:py-0 border-b border-gray-300 lg:border-none"
          theme="dark"
        />

        <div className="w-1/6 lg:hidden">
          <MobileDrawer />
        </div>

        <Link href={"/"}>
          <a className="lg:w-1/5 text-center">
            <img
              src={Logo.src}
              className={"w-[160px] mx-auto"}
              alt="MPH News logo"
            />
          </a>
        </Link>

        <AccountButton className="w-1/6 lg:w-2/5" />
      </div>

      <BottomBar className="hidden lg:flex" />
    </>
  );
};

export default AppBar;
