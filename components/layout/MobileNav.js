import React, { useState } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/userActions';

// Material
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

// Comps
import AuthModal from './AuthModal'
import logo from '../../public/images/logoMPHC.png'
import navImg from '../../public/images/navImg.png'

const useStyles = makeStyles((theme) => createStyles({
	...theme.spreadThis,
	root: {
		width: 25,
		marginRight: 'auto',
	},
  list: {
    width: '100vw',
    marginTop: '1rem'
  },
  navTop: {
  	display: 'flex',
  	padding: '0 1.5rem',
  	alignItems: 'center' 
  },
  iconClass: {
		height: '50px',
    width: 'auto',
    marginRight: 'auto',
  },
  navCont: {
  	marginTop: '.5rem',
  	height: '100%',
  	padding: '1.5rem',
  	borderTop: '5px solid',
  	color: 'white',
  	borderColor: theme.palette.secondary.light,
  	backgroundColor: theme.palette.secondary.dark,
  },
  titleClass: {
  	display: 'flex',
  	alignItems: 'baseline'
  },
  authClass: {
  	backgroundColor: theme.palette.secondary.light,
  	color: 'white',
  	width: '100%',
  	borderRadius: 0,
  	borderColor: '#5ba56e'
  },
  subClass: {
  	color: 'white',
  	width: '100%',
  	borderRadius: 0,
  	borderColor: '#5ba56e!important'
  },
	modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
	}
}));

const titles = [
	{ start: 'N', end: 'igeria', link: 'nigeria' },
	{ start: 'I', end: 'nternational', link: 'international' },
	{ start: 'S', end: 'ecurity', link: 'security' },
	{ start: 'H', end: 'ealth', link: 'health' },
	{ start: 'B', end: 'usiness', link: 'business' },
	{ start: 'O', end: 'ther', link: 'other' },
	{ start: 'N', end: 'ational assembly', link: 'documents' },
]

export function MobileNav(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [anchor, setAnchor] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleDrawer = () => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setAnchor(!anchor);
  };

  const handleLogout = (evt) => {
    props.logoutUser()
    console.log('working')
  }
/*      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}*/

  const markup = (
    <div
    	className={classes.list}
      role="presentation"
    >
    	<span className={classes.navTop}>
    		<img onClick={toggleDrawer()} src={logo} alt="" className={classes.iconClass} />
    		<h2 onClick={toggleDrawer()} style={{ cursor: 'pointer' }}>&#x2715;</h2>
    	</span>
    	<div className={classes.navCont}>
    		<Typography style={{ fontFamily: '"Open Sans"', marginBottom: '1.5rem' }} variant="h5"><strong>MyPoliticalHub News</strong></Typography>
    		<div style={{ textTransform: 'uppercase' }}>
	    		{
	    			titles.map((tit, i) => (
	    				<Link href={tit.link == 'documents' ? `/documents` : `/topics/${tit.link}`} onClick={toggleDrawer()} className={classes.linkClass} key={i}>
		    				<span className={classes.titleClass}>
		    					<Typography variant='h6'>{tit.start}</Typography> <p><strong>{tit.end}</strong></p>
		    				</span>
	    				</Link>
	  				))
	    		}
    		</div>
        <a className={classes.linkClass} target="_blank" href='https://www.mypoliticalhub.com/profile'>
          <Typography style={{ margin: '1rem 0' }} variant='h6'>Go To HUB &rarr;</Typography>
        </a>
    		<div style={{ marginTop: '2rem' }}>
    			<small>New or existing user?</small>
    			{
    				props.user.authenticated ? 
    				<Button className={classes.authClass} onClick={handleLogout}>Signout</Button>
    				: (
    					<span>
			    			<Button className={classes.authClass} onClick={handleOpen}>Sign In</Button>
					      <Modal
					        aria-labelledby="transition-modal-title"
					        aria-describedby="transition-modal-description"
					        className={classes.modal}
					        open={open}
					        onClose={handleClose}
					        closeAfterTransition
					        BackdropComponent={Backdrop}
					        BackdropProps={{
					          timeout: 500,
					        }}
					      >
					      	<Fade in={open}><AuthModal handleClose={handleClose} /></Fade>
								</Modal>
    					</span>
    					)
    			}
    		</div>
    		<div style={{ marginTop: '2rem' }}>
    			<small>Join our newsletter</small>
    			<Button variant='outlined' color='secondary' className={classes.subClass}>Subscribe</Button>
    		</div>
    	</div>
    </div>
  );

  return (
    <div>
      <React.Fragment key={anchor}>
        <Button onClick={toggleDrawer()}>
        	<img src={navImg} alt="" className={classes.root} />
      	</Button>
        <Drawer
          anchor='left'
          open={anchor}
          onClose={toggleDrawer()}
          onOpen={toggleDrawer()}
        >
          {markup}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = { logoutUser };

export default connect(mapStateToProps, mapDispatchToProps)(MobileNav);