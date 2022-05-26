import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';
import { clearErrors } from '../redux/actions/dataActions';

// Material
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import { Typography } from '@mui/material';

//Comps
import logoFull from '../public/images/logoFullColor2.png';

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
    hrBtm: {
      display: 'none',
      [theme.breakpoints.down('xs')]: {
        display: 'block',
        marginTop: 5,
      },
    },
    signUp: {
      fontFamily: '"Helvetica Black Bold" !important',
      fontSize: '48px !important',
      paddingBottom: 40,
      [theme.breakpoints.down('sm')]: {
        fontSize: '24px !important',
      },
    },
    nameField: {
      display: 'flex',
      flexDirection: 'row',
      gap: 20,
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    nameFill: {
      width: '100%',
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
  })
);

export const SignupModal = (props) => {
  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
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
    const newUser = {
      fName: first,
      lName: last,
      email: email,
      password: password,
      confirmPassword: confirm,
    };
    props.signupUser(newUser);
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
        <hr className={classes.hrBtm} />
      </Container>
      <Container className={classes.adminCont}>
        <Typography className={classes.signUp} variant='h5'>
          Create your account
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
            <div className={classes.nameField}>
              <div className={classes.nameFill}>
                <p
                  style={{
                    fontFamily: '"Helvetica"',
                    fontSize: 15,
                    padding: '0 0 10px 0',
                  }}
                >
                  First name
                </p>
                <Paper
                  component='form'
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 40,
                    boxShadow: 'none',
                    border: '0.5px solid #D9D9D9',
                    // marginBottom: '15px',
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1, fontSize: 15 }}
                    id='first'
                    placeholder='First name'
                    value={first}
                    onChange={(e) => setFirst(e.target.value)}
                    error={errors !== null}
                    inputProps={{ 'aria-label': 'First' }}
                  />
                </Paper>
              </div>
              <div className={classes.nameFill}>
                <p
                  style={{
                    fontFamily: '"Helvetica"',
                    fontSize: 15,
                    padding: '0 0 10px 0',
                  }}
                >
                  Last name
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
                    id='last'
                    value={last}
                    placeholder='Last name'
                    onChange={(e) => setLast(e.target.value)}
                    error={errors !== null}
                    inputProps={{ 'aria-label': 'Last' }}
                  />
                </Paper>
              </div>
            </div>
            <div>
              <p
                style={{
                  fontFamily: '"Helvetica"',
                  fontSize: 15,
                  padding: '10px 0',
                }}
              >
                Email address
              </p>
              <Paper
                component='form'
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  height: 40,
                  boxShadow: 'none',
                  border: '0.5px solid #D9D9D9',
                  marginBottom: '15px',
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1, fontSize: 15 }}
                  placeholder='Email address'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors !== null}
                  inputProps={{ 'aria-label': 'email' }}
                />
              </Paper>
            </div>
            <div>
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
                  width: '100%',
                  height: 40,
                  boxShadow: 'none',
                  border: '0.5px solid #D9D9D9',
                  marginBottom: '15px',
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1, fontSize: 15 }}
                  placeholder='12345...'
                  id='password'
                  value={password}
                  type='password'
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors !== null}
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
            </div>
            <Button
              disabled={loading}
              type='submit'
              variant='contained'
              color='secondary'
              className={classes.loginBtn}
            >
              Create Account
            </Button>
            <Link href='/login'>
              <a onClick={handleSignup} className={classes.buttonClass}>
                <p>Login to your account</p>
              </a>
            </Link>
          </form>
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapDispatchToProps = { signupUser, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(SignupModal);
