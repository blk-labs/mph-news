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

const theme = createTheme(appTheme);

axios.defaults.baseURL =
  "https://us-central1-poli-news-77c19.cloudfunctions.net/api";

function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  useEffect(() => {
    const token = localStorage.FBIdToken;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logoutUser());
      } else {
        store.dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common["Authorization"] = token;
        store.dispatch(getUserData());
      }
    }
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <Script id="facebook pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
                            {if(f.fbq)return;n=f.fbq=function(){n.callMethod ?
                                n.callMethod.apply(n, arguments) : n.queue.push(arguments)};
                            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                            n.queue=[];t=b.createElement(e);t.async=!0;
                            t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
                            'https://connect.facebook.net/en_US/fbevents.js');
                            fbq('init', '847932856093921');
                            fbq('track', 'PageView');`}
      </Script>
      <Script>
        {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
        {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-H1RJ9WJGML');`}
      </Script>
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Navbar />
          <Component {...pageProps} />
        </Provider>
      </MuiThemeProvider>
    </>
  );
}

App.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
};

export default withWidth()(App);
