import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { Provider } from "react-redux";
import { useStore } from "../redux/store";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Navbar from "../components/layout/Navbar";
import Head from "next/head";
import Script from "next/script";

// Redux
import { SET_AUTHENTICATED } from "../redux/types";
import { logoutUser, getUserData } from "../redux/actions/userActions";

// Material UI
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import appTheme from "../util/theme";
import PropTypes from "prop-types";
import withWidth from "@material-ui/core/withWidth";
import AppBar from "../components/surfaces/AppBar";
import { useRouter } from "next/router";
import AuthProvider from "../hooks/authHook";

function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const router = useRouter();

  console.log({ path: router.asPath });

  return (
    <>
      <AuthProvider>
        <Provider store={store}>
          {/* <Navbar /> */}
          {router.asPath.includes("auth/") ? null : <AppBar />}
          <Component {...pageProps} />
        </Provider>
      </AuthProvider>
    </>
  );
}

App.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
};

export default withWidth()(App);
