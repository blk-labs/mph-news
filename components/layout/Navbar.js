import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/userActions';

// Material
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

// Icons
import { Search, Apps, Home } from '@material-ui/icons';

//Comps
import MobileNav from './MobileNav'
import SearchModal from './Search'
import AuthModal from './AuthModal'
import logoFull from '../../public/images/logoFullColor.png'
import logo from '../../public/images/logo.png'
import hub from '../../public/images/hub.png'

const useStyles = makeStyles((theme) => createStyles({
	...theme.spreadThis,
	topClass: {
		textAlign: 'right'
	},
	navCont: {
		display: 'flex',
		marginBottom: '.5rem',
		alignItems: 'center',
		[theme.breakpoints.down('sm')]: {
			marginTop: '1rem'
		}
	},
	homeIcon: {
		color: theme.palette.secondary.light,
		padding: '.3rem .5rem',
		marginRight: '1rem',
		borderBottom: `4px solid ${theme.palette.secondary.light}`
	},
	hubClass: {
		height: '30px',
		width: 'auto',
		marginRight: '.25rem'
	},
	logoComp: {
		[theme.breakpoints.down('sm')]: {
			width: '100%',
			display: 'flex',
			justifyContent: 'center',
		}
	},
	logoFull: {
		height: 'auto',
		width: 50,
		marginBottom: '.5rem'
	},
	logoClass: {
		height: 'auto',
		width: 150,
		marginBottom: '.5rem'
	},
	searchCont: {
		cursor: 'pointer',
		marginLeft: '1rem',
		borderRadius: '50%',
		width: '2.5rem',
		height: '2.5rem',
		backgroundColor: 'lightgray',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		[theme.breakpoints.down('sm')]: {
			width: '2rem',
			height: '2rem',
		}
	},
	menuCont: {
		backgroundColor: theme.palette.primary.dark,
		color: 'white',
		position: 'sticky',
		overflowX: 'auto',
		overflowY: 'hidden'
	},
	titleCont: {
		display: 'flex',
		alignItems: 'baseline',
		padding: '.5rem 1rem',
		'&:hover': {
			color: theme.palette.secondary.light
		}
	},
	stickyClass: {
		position: 'fixed'
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}
}));

const titles = [
	{ title: 'Nigeria' },
	{ title: 'International' },
	{ title: 'Security' },
	{ title: 'Health' },
	{ title: 'Business' },
	{ title: 'Other' },
	{ title: 'National Assembly' },
]

export function Navbar(props) {

	const [sticky, setSticky] = useState();
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const toggleSticky = () => {
		if (window.scrollY > 150) {
			setSticky(true);
		} else {
			setSticky(false)
		}
	};

	const handleLogout = (evt) => {
		props.logoutUser()
	}

	useEffect(() => {
		window.addEventListener("scroll", toggleSticky);
	}, []);

	const theme = useTheme();
	const classes = useStyles(props);
	const matches = useMediaQuery(theme.breakpoints.up('md'));

	return (
		<div id="navBar">
			{
				matches ? (
					<span>
						<Container maxWidth="lg">
							<div className={classes.topClass}>
								<Button color='default' style={{ textTransform: 'capitalize', padding: 0 }}>
									<Typography variant="caption" style={{ fontWeight: 'bold' }}>Join our newsletter</Typography>
								</Button>
								<span> | </span>
								{
									props.user.authenticated ? (
										<Button color='default' style={{ textTransform: 'capitalize', padding: 0 }} onClick={handleLogout}>
											<Typography variant="caption" style={{ fontWeight: 'bold' }}>Logout</Typography>
										</Button>
									) : (
										<span>
											<Button color='default' style={{ textTransform: 'capitalize', padding: 0 }} onClick={handleOpen}>
												<Typography variant="caption" style={{ fontWeight: 'bold' }}>Login or Register</Typography>
											</Button>
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
						</Container>
						<hr className={classes.hrTop} />
					</span>
				) : null
			}
			<Container className={classes.navCont}>
				{!matches ? <MobileNav /> : null}
				<Link href="/">
					<div className={classes.logoComp}>
						<img src={matches ? logoFull.src : logo.src} className={matches ? classes.logoClass : classes.logoFull} alt="MPH-logo" />
					</div>
				</Link>
				<div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
					{matches ?
						<a href="https://mypoliticalhub.com/profile" style={{ textDecoration: 'none' }} target="_blank">
							<div style={{ display: 'flex' }}>
								<img src={hub.src} alt="" className={classes.hubClass} />
								<Typography style={{ color: theme.palette.primary.main, fontWeight: 'bold', marginRight: '.5rem' }} variant="h5">hub</Typography>
							</div>
						</a>
						: null}
					<div className={classes.searchCont}>
						<SearchModal />
					</div>
				</div>
			</Container>
			<AppBar className={sticky ? classes.stickyClass : ""} position="sticky">
				<div className={classes.menuCont}>
					<Container style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
						{!matches ? <Link style={{ height: 0 }} href="/"><Home className={classes.homeIcon} /></Link> : null}
						{matches ? (
							titles.map((str, i) => {
								const chars = str.title.charAt(0);
								const words = str.title.split(chars);
								return (
									<Link key={i} href={str.title === 'National Assembly' ? `/documents` : `/topics/${str.title.toLowerCase()}`} className={`${classes.titleCont} ${classes.linkClass}`}>
										<span className={`${classes.titleCont} ${classes.linkClass}`}>
											<Typography variant="h6" style={{ fontWeight: 'bold' }}>{chars}</Typography>
											<Typography variant="body2" style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{words[1]}</Typography>
										</span>
									</Link>
								)
							})
						) : (
							titles.map((str, i) => (
								<Link key={i} href={str.title === 'National Assembly' ? `/documents` : `/topics/${str.title.toLowerCase()}`} className={`${classes.titleCont} ${classes.linkClass}`}>
									<Typography variant="body2" style={{ width: 'max-content', color: 'lightgray', textTransform: 'uppercase' }}>{str.title}</Typography>
								</Link>
							)
							))
						}
					</Container>
				</div>
			</AppBar>
		</div>
	);
}

const mapStateToProps = state => ({
	user: state.user
});

const mapDispatchToProps = { logoutUser };

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);