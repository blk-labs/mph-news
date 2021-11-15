import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Redux
import { connect } from 'react-redux';
import { signupUser } from '../../redux/actions/userActions';
import { clearErrors } from '../../redux/actions/dataActions';

// Material
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Paper from '@mui/material/Paper';
import Backdrop from '@material-ui/core/Backdrop';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import useMediaQuery from '@material-ui/core/useMediaQuery';

//Comps
import AuthModal from './AuthModal';

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
      color: 'black',
      marginTop: '1rem',
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
        <div style={{ display: 'flex', gap: 20 }}>
          <div>
            <p
              style={{
                fontFamily: '"Helvetica"',
                fontSize: 15,
                padding: '10px 0',
              }}
            >
              First name
            </p>
            <Paper
              component='form'
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: 300,
                height: 40,
                boxShadow: 'none',
                border: '0.5px solid #D9D9D9',
                marginBottom: '15px',
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
          <div>
            <p
              style={{
                fontFamily: '"Helvetica"',
                fontSize: 15,
                padding: '10px 0',
              }}
            >
              Last name
            </p>
            <Paper
              component='form'
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: 300,
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
              id='first'
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
              <SettingsOutlinedIcon style={{ fill: 'black', fontSize: 20 }} />
            </IconButton>
          </Paper>
        </div>

        {/* <TextField
          id='confirm'
          label='Confirm'
          value={confirm}
          type='password'
          onChange={(e) => setConfirm(e.target.value)}
          error={errors !== null}
        /> */}
        <Button
          disabled={loading}
          type='submit'
          variant='contained'
          color='secondary'
          className={classes.loginBtn}
        >
          Create Account
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
            Login to your account
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
              <AuthModal />
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

const mapDispatchToProps = { signupUser, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(SignupModal);
