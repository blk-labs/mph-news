import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Redux
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions';
import { clearErrors } from '../../redux/actions/dataActions';

// Material
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
// Comps
import SignupModal from './SignupModal';
import { Typography } from '@mui/material';

const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,
    modalClass: {
      background: 'white',
      borderRadius: '10px',
      padding: '5%',
      [theme.breakpoints.down('sm')]: {
        padding: '10%',
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
    },
    buttonClass: {
      fontSize: 15,
      fontFamily: '"Helvetica"',
      color: 'black',
    },
    // inputLabel: {
    //   fontFamily: '"Helvetica"',
    //   fontSize: 15,
    //   padding: '10px 0',
    // },
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

  const { errors, loading } = props.UI;

  return (
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
          style={{ fontFamily: '"Helvetica"', fontSize: 15, padding: '10px 0' }}
        >
          Email
        </p>
        <Paper
          component='form'
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: 400,
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
          style={{ fontFamily: '"Helvetica"', fontSize: 15, padding: '10px 0' }}
        >
          Password
        </p>

        <Paper
          component='form'
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: 400,
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
            <SettingsOutlinedIcon style={{ fill: 'black', fontSize: 20 }} />
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
        <span
          style={{
            cursor: 'pointer',
            textAlign: 'center',
            fontWeighfirt: '400',
            marginRight: 'auto',
          }}
        >
          <p className={classes.buttonClass} onClick={handleSignup}>
            Create an account
          </p>
          <Modal
            aria-labelledby='transition-modal-title'
            aria-describedby='transition-modal-description'
            className={classes.modal}
            open={open}
            onClose={handleCloser}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <SignupModal />
            </Fade>
          </Modal>
        </span>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapDispatchToProps = { loginUser, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal);
