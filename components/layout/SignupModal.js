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
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => createStyles({
	...theme.spreadThis,
	modalClass: {
		background: 'white',
		borderRadius: '10px',
		padding: '5%',
    [theme.breakpoints.down('sm')]: {
      padding: '10%',
    }
	},
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
	loginBtn: {
		margin: '2rem 0'
	},
	buttonClass: {
		color: 'black',
		marginTop: '1rem'
	}
}));

export const SignupModal = (props) => {

  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const [ first, setFirst ] = useState('');
  const [ last, setLast ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirm, setConfirm ] = useState('');
  const [ error, setError ] = useState({});
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
  }

  const handleSubmit = (evt) => {
      evt.preventDefault();
      const newUser = {
        fName: first,
        lName: last,
        email: email,
        password: password,
        confirmPassword: confirm
      };
      props.signupUser(newUser)
  }

  useEffect(() => {
    if (props.UI.errors !== null) {
      props.clearErrors();
    }
  }, [])

  useEffect(() => {
    if (props.UI.errors !== null) {
      setError(props.UI.errors);
    }
  }, [props])

  const { errors, loading } = props.UI;

  return (
    	<div className={classes.modalClass}>
          <form
          	style={{ display: 'flex', flexDirection: 'column' }}
            name="login"
            initialValues={{
              remember: true,
            }}
            onSubmit={handleSubmit}
          >
          <h3>Please Enter Your Details</h3>
            <TextField
              id="first"
              label="First"
              value={first}
              onChange={e => setFirst(e.target.value)}
              error={errors !== null}
            />
            <TextField
              id="last"
              label="Last"
              value={last}
              onChange={e => setLast(e.target.value)}
              error={errors !== null}
            />
            <TextField
              id="email"
              label="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              error={errors !== null}
            />
            <TextField
              id="password"
              label="Password"
              value={password}
              type="password"
              onChange={e => setPassword(e.target.value)}
              error={errors !== null}
            />
            <TextField
              id="confirm"
              label="Confirm"
              value={confirm}
              type="password"
              onChange={e => setConfirm(e.target.value)}
              error={errors !== null}
            />
      			 <Button disabled={loading} type="submit" variant="contained" color="secondary" className={classes.loginBtn}>Create Account</Button>
          </form>
    	</div>
  );
}

const mapStateToProps = state => ({
  UI: state.UI
});

const mapDispatchToProps = { signupUser, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(SignupModal);