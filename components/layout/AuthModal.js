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

// Comps
import SignupModal from './SignupModal'

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

export const AuthModal = (props) => {

  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
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
      const userData = {
        email: email,
        password: password
      };
      props.loginUser(userData)
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
      			 <Button disabled={loading} type="submit" variant="contained" color="secondary" className={classes.loginBtn}>Login</Button>
            <span style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', fontWeight: 'bold', marginTop: '.5rem' }}>
      				<p className={classes.buttonClass} onClick={handleSignup}>Create an account</p>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleCloser}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}><SignupModal /></Fade>
              </Modal>
      				<Link className={classes.buttonClass} style={{ marginLeft: 'auto' }} href="/reset-password">Forgot your passowrd?</Link>
      			</span>
          </form>
    	</div>
  );
}

const mapStateToProps = state => ({
  UI: state.UI
});

const mapDispatchToProps = { loginUser, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal);