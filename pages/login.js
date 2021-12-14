import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Redux
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';
import { clearErrors } from '../redux/actions/dataActions';

// Material
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Typography } from '@mui/material';
// Comps
import logoFull from '../public/images/logoFullColor2.png';
import Index from './';

const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,
    modalClass: {
      background: 'white',
      width: 692,
      boxShadow: '0px 4px 34px 10px rgba(228, 228, 228, 0.25)',
      margin: 'auto',
      padding: '5%',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
      [theme.breakpoints.down('xs')]: {
        padding: '10% 2.5% 20%',
      },
    },
    navCont: {
      marginBottom: '4rem',
      paddingTop: '1.5rem',
      [theme.breakpoints.down('xs')]: {
        marginBottom: '3rem',
      },
    },
    logoClass: {
      height: 'auto',
      maxWidth: 189,
      [theme.breakpoints.down('xs')]: {
        maxWidth: 105,
      },
    },

    login: {
      fontFamily: '"Helvetica Black Bold" !important',
      fontSize: '48px !important',
      paddingBottom: 40,
      [theme.breakpoints.down('sm')]: {
        fontSize: '24px !important',
      },
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginBtn: {
      margin: '1.5rem 0 1rem 0',
      boxShadow: 'none',
      height: '46px',
      width: 268,
      fontSize: 15,
      color: 'white',
      float: 'left',
      backgroundColor: '#69409e',
      [theme.breakpoints.down('sm')]: {
        margin: '1.5rem auto 1rem',
      },
    },
    buttonClass: {
      fontSize: 15,
      color: 'black',
      paddingTop: '1rem',
      fontFamily: '"Helvetica"',
      marginRight: 'auto',

      [theme.breakpoints.down('sm')]: {
        margin: 'auto',
        padding: '0',
      },
    },

    textfield: {
      height: 40,
    },
    forgotPass: {
      textAlign: 'right',
      fontFamily: '"Helvetica"',
      fontSize: 15,
      fontWeight: 'normal',
      color: '#69409e',
    },
  })
);

export const AuthModal = (props) => {
  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloser = () => {
    props.handleClose();
    setOpen(false);
  };

  const handleSignup = () => {
    setOpen(true);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    props.loginUser(userData);
  };

  useEffect(() => {
    if (props.UI.errors !== null) {
      props.clearErrors();
    }
  }, []);

  useEffect(() => {
    if (props.UI.errors !== null) {
      setError(props.UI.errors);
    }
  }, [props]);
  useEffect(() => {
    let nav = document.getElementById('navBar');
    if (nav !== null) {
      nav.style.display = 'none';
    }
  }, []);
  const { errors, loading } = props.UI;

  return (
    <>
      {props.user.authenticated ? (
        <Index />
      ) : (
        <div
          style={{
            background: '#FBFBFB',
            minHeight: '100vh',
            paddingBottom: '12%',
          }}
        >
          <Container className={classes.navCont}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Link href='/' className={classes.logoComp}>
                <a>
                  <img
                    src={logoFull.src}
                    className={classes.logoClass}
                    alt='MPH-logo'
                  />
                </a>
              </Link>
            </div>
          </Container>
          <Container className={classes.adminCont}>
            <Typography className={classes.login} variant='h5'>
              Login
            </Typography>
            <div className={classes.modalClass}>
              <form
                style={{ display: 'flex', flexDirection: 'column' }}
                name='login'
                initialValues={{
                  remember: true,
                }}
                onSubmit={handleSubmit}
              >
                <p
                  style={{
                    fontFamily: '"Helvetica"',
                    fontSize: 15,
                    padding: '10px 0',
                  }}
                >
                  Email
                </p>
                <Paper
                  component='form'
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 40,
                    boxShadow: 'none',
                    border: '0.5px solid #D9D9D9',
                    marginBottom: '15px',
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1, fontSize: 15 }}
                    id='email'
                    placeholder='Email'
                    value={email}
                    variant='outlined'
                    onChange={(e) => setEmail(e.target.value)}
                    className={classes.textfield}
                    error={errors !== null}
                    inputProps={{ 'aria-label': 'email' }}
                  />
                </Paper>
                <p
                  style={{
                    fontFamily: '"Helvetica"',
                    fontSize: 15,
                    padding: '10px 0',
                  }}
                >
                  Password
                </p>

                <Paper
                  component='form'
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 40,
                    boxShadow: 'none',
                    border: '0.5px solid #D9D9D9',
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1, fontSize: 15 }}
                    id='password'
                    placeholder='Password'
                    value={password}
                    type='password'
                    variant='outlined'
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors !== null}
                    className={classes.textfield}
                    inputProps={{ 'aria-label': 'password' }}
                  />

                  <Divider sx={{ height: 40, m: 0.5 }} orientation='vertical' />
                  <IconButton
                    color='primary'
                    sx={{ p: '10px' }}
                    aria-label='directions'
                  >
                    <SettingsOutlinedIcon
                      style={{ fill: 'black', fontSize: 20 }}
                    />
                  </IconButton>
                </Paper>
                <span style={{ marginLeft: 'auto', marginTop: 20 }}>
                  <Link href='/reset-password'>
                    <a className={classes.forgotPass}>Forgot your passowrd?</a>
                  </Link>
                </span>
                <Button
                  disabled={loading}
                  type='submit'
                  variant='contained'
                  className={classes.loginBtn}
                >
                  Login
                </Button>
                <Link href='/signup'>
                  <a onClick={handleSignup} className={classes.buttonClass}>
                    Create an account
                  </a>
                </Link>
              </form>
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
});

const mapDispatchToProps = { loginUser, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal);
