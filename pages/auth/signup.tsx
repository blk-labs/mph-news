import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";

// Material
import { makeStyles, createStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import {
  InputAdornment,
  LinearProgress,
  linearProgressClasses,
  TextField,
  Typography,
} from "@mui/material";

//Comps
import Logo from "../../public/assets/images/logo.png";
import { userService } from "../../lib/services";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Head from "next/head";

export const SignUpPage = (props) => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onFirstNameChanged = useCallback(
    (e) => {
      setFirst(e.target.value);
    },
    [first]
  );
  const onLastNameChanged = useCallback(
    (e) => {
      setLast(e.target.value);
    },
    [last]
  );
  const onEmailChanged = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [email]
  );
  const onPasswordChanged = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [password]
  );
  const togglePasswordVsisiblity = useCallback(() => {
    setPasswordVisible((state) => !state);
  }, [passwordVisible]);

  const handleSignUp = useCallback(
    (event) => {
      event.preventDefault();
      // userService.signUp();
    },
    [first, last, email, password]
  );

  return (
    <>
      <Head>
        <title>MPH News | Sign in</title>
      </Head>
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-full lg:w-1/2">
          <Link href="/" className={""}>
            <a className="w-full text-center">
              <img src={Logo.src} className={"h-24 mx-auto"} alt="MPH-logo" />
            </a>
          </Link>
          <div className="w-full relative shadow-lg shadow-gray-300 border border-gray-300 my-[30px] p-[30px]">
            <h1 className={"mb-[50px] font-mont font-bold text-4xl"}>
              Create Account
            </h1>
            <div className={""}>
              <form
                onSubmit={handleSignUp}
                className="font-mont flex flex-col items-start"
              >
                <p className="text-[#555] font-bold">First Name</p>
                <TextField
                  color="secondary"
                  value={first}
                  onChange={onFirstNameChanged}
                  placeholder="First Name"
                  type={"tetxt"}
                  className="bg-white"
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                    className: "rounded-none",
                  }}
                />
                <p className="mt-[25px] text-[#555] font-bold">Last Name</p>
                <TextField
                  color="secondary"
                  value={last}
                  onChange={onLastNameChanged}
                  placeholder="Last Name"
                  type={"text"}
                  className="bg-white"
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                    className: "rounded-none",
                  }}
                />
                <p className="mt-[25px] text-[#555] font-bold">Email</p>
                <TextField
                  color="secondary"
                  value={email}
                  onChange={onEmailChanged}
                  placeholder="Email Address"
                  type={"email"}
                  className="bg-white"
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                    className: "rounded-none",
                  }}
                />
                <p className="mt-[25px] text-[#555] font-bold">Password</p>
                <TextField
                  color="secondary"
                  value={password}
                  onChange={onPasswordChanged}
                  placeholder="Password"
                  type={passwordVisible ? "text" : "password"}
                  className="bg-white"
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                    className: "rounded-none",
                    endAdornment: (
                      <InputAdornment position="end" className="cursor-pointer">
                        {passwordVisible ? (
                          <VisibilityOff onClick={togglePasswordVsisiblity} />
                        ) : (
                          <Visibility onClick={togglePasswordVsisiblity} />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />

                <input
                  type={"submit"}
                  value="Continue"
                  className="mt-[25px] px-10 py-4 bg-[#6B3FA0] text-white font-mont font-bold hover:cursor-pointer"
                />
              </form>
            </div>

            {loading && (
              <div className="absolute top-0 right-0 bottom-0 left-0 bg-white bg-opacity-75 flex flex-col justify-center items-center">
                <LinearProgress
                  classes={{
                    colorPrimary: "red",
                    barColorPrimary: "red",
                    dashedColorPrimary: "red",
                    dashedColorSecondary: "#898989",
                    colorSecondary: "#ff0",
                  }}
                  className="w-1/2"
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
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
