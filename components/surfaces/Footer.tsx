import { Email } from "@mui/icons-material";
import { TextField } from "@mui/material";
import Link from "next/link";
import { useCallback, useState } from "react";

import Logo from "../../public/assets/images/logo-2.png";
import SocialLinkButtons from "../inputs/SocialLinkButtons";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const onEmailChanged = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [email]
  );

  return (
    <div className="py-6 lg:py-12 px-[20px] lg:px-[68px] bg-black flex flex-col items-center">
      <div className="w-[60px] h-[60px] lg:mt-[80px] mb-[20px] rounded-full bg-white flex justify-center items-center">
        <Email />
      </div>

      <h2 className="mb-[20px] text-center lg:text-left text-2xl lg:text-4xl text-white font-extrabold font-mont uppercase">
        Subscribe to our newsletter
      </h2>
      <p className="text-white font-bold font-mont tracking-wide">
        Stay up-to-date with all the latest news
      </p>

      <form className="lg:mb-[100px] mt-[20px] w-full lg:w-5/12 lg:bg-white flex flex-col lg:flex-row lg:items-center">
        <TextField
          color="secondary"
          value={email}
          onChange={onEmailChanged}
          placeholder="Email Address"
          className="bg-white"
          fullWidth
          InputProps={{ disableUnderline: true, className: "rounded-none" }}
        />

        <input
          type={"submit"}
          value="Subscribe"
          className="px-10 py-4 bg-[#6B3FA0] text-white font-mont font-bold hover:cursor-pointer"
        />
      </form>

      <div className="w-full mt-[30px] flex flex-wrap items-center">
        <div className="w-full lg:w-1/3 font-mont font-medium text-white flex items-center justify-center lg:justify-start">
          <Link href="/">
            <a className="mr-4">Home</a>
          </Link>
          <Link href="/about">
            <a className="mr-4">About</a>
          </Link>
          <Link href="/contact">
            <a className="mr-4">Contact</a>
          </Link>
          <Link href="/disclaimer">
            <a className="mr-4">Disclaimer</a>
          </Link>
        </div>

        <div className="w-full lg:w-1/3 py-6 lg:py-0">
          <Link href={"/"}>
            <a className="w-full lg:w-1/5 text-center">
              <img
                src={Logo.src}
                className={"w-[160px] mx-auto"}
                alt="MPH News logo"
              />
            </a>
          </Link>
        </div>

        <div className="w-full lg:w-1/3 flex justify-center lg:justify-end">
            <SocialLinkButtons showLabel={false} />
        </div>
      </div>

      <p className="mt-[20px] mb-[50px] lg:mb-[0px] text-sm font-mont text-gray-500">
          &copy; {(new Date()).getFullYear()} My Political Hub | MPH News
      </p>
    </div>
  );
}
