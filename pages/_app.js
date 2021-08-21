import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { Provider } from "react-redux"
import { useStore } from "../redux/store"
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import Navbar from "../components/layout/Navbar"
import Head from "next/head"
import { Helmet } from 'react-helmet';

// Redux
import { SET_AUTHENTICATED } from '../redux/types';
import { logoutUser, getUserData } from '../redux/actions/userActions';

// Material UI
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { createTheme } from '@material-ui/core/styles';
import appTheme from '../util/theme'
import PropTypes from 'prop-types';
import withWidth from '@material-ui/core/withWidth';

const theme = createTheme(appTheme);

axios.defaults.baseURL = 'https://us-central1-poli-news-77c19.cloudfunctions.net/api';

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
        axios.defaults.headers.common['Authorization'] = token;
        store.dispatch(getUserData());
      }
    }
  }, [])

  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Navbar />
        <Component {...pageProps} />
      </Provider>
    </MuiThemeProvider>
  )
}

App.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired
}

export default withWidth()(App);
