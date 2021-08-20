import React from 'react';
import Link from 'next/link'
import Image from 'next/image'

// Material
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Icons
import { Facebook, Twitter, YouTube, Instagram } from '@material-ui/icons';

import logo from '../../public/images/logoMPH.png'

const useStyles = makeStyles((theme) => createStyles({
	...theme.spreadThis,
	gridCont: {
		backgroundColor: 'black',
		color: 'white',
		paddingTop: '5%'
	},
	footerLogo: {
		marginTop: '1rem',
		width: 200,
		height: 'auto'
	},
	listCont: {
		paddingTop: '2rem',
	},
	paddingSM: {
		display: 'flex',
		flexDirection: 'column',
		[theme.breakpoints.down('sm')]: {
			paddingTop: '2rem'
		}
	},
	iconClass: {
		marginRight: '2rem',
		marginBottom: '2rem'
	},
	footerLine: {
		backgroundColor: 'black',
		marginTop: '4rem',
	},
	hrFooter: {
		borderColor: 'rgba(255,255,255,.5)',
		borderBottom: 0,
		borderLeft: 0,
		borderRight: 0,
	}
}));

export default function Footer(props) {

  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));

	return (
		<div className={classes.gridCont}>
			<Container maxWidth="lg">
				<Grid container>
					<Grid item md={6}>
						<img src={logo.src} alt="mph-logo-white" className={classes.footerLogo} />
						<div style={{  marginTop: '2rem', display: 'flex', alignItems: 'center' }}>
						<div className={classes.iconClass}>
							<a target="_blank" rel="noreferrer" className={classes.linkClass} href="https://web.facebook.com/My-Political-Hub-106231897488181/"><Facebook fontSize="large" /></a>
						</div>
						<div className={classes.iconClass}>
							<a target="_blank" rel="noreferrer" className={classes.linkClass} href="https://www.twitter.com/my_politicalhub"><Twitter fontSize="large" /></a>
						</div>
						<div className={classes.iconClass}>
							<a target="_blank" rel="noreferrer" className={classes.linkClass} href="https://www.youtube.com/channel/UCwnOgB3veQgUkuB0QCBX55w"><YouTube fontSize="large" /></a>
						</div>
						<div className={classes.iconClass}>
							<a target="_blank" rel="noreferrer" className={classes.linkClass} href="https://www.instagram.com/my_politicalhub"><Instagram fontSize="large" /></a>
						</div>
						</div>
					</Grid>
					<Grid container className={classes.listCont} item md={6}>
						<Grid item xs={6} md={4}>
							<ul className="listFooter">
								<li>
									<Typography variant="caption"><Link href='/' className={classes.linkClass}>Home</Link></Typography>
								</li>
								<li>
									<Typography variant="caption"><Link href='/about' className={classes.linkClass}>About</Link></Typography>
								</li>
								<li>
									<Typography variant="caption"><Link href='/contact' className={classes.linkClass}>Contact</Link></Typography>
								</li>
							</ul>
						</Grid>
						<Grid item xs={6} md={4}>
							<ul className="listFooter">
								<li>
									<Typography variant="caption"><Link href='/disclaimer' className={classes.linkClass}>Disclaimer</Link></Typography>
						 		</li>
								<li>
									<Typography variant="caption"><Link href='/privacy' className={classes.linkClass}>Privacy Policy</Link></Typography>
								</li>
							</ul>
						</Grid>
						<Grid className={classes.paddingSM} item xs={12} md={4}>
							<Typography variant="caption">Plot 177 R.B. Dikko Rd, Garki, Abuja</Typography>
							<Typography style={{ paddingTop: '.5rem' }} variant="caption">(+234) 814 565 5270</Typography>
							<Typography style={{ paddingTop: '.5rem' }} variant="caption">info@mypoliticalhub.com</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Container>
			<div className={classes.footerLine}>
				<hr className={classes.hrFooter} />
				<Container maxWidth="lg" style={{ paddingBottom: '1rem', color: 'gray' }}>
					<Typography variant="caption">Copyright © 2020 My Political Hub. All rights reserved.</Typography>
				</Container>
			</div>
		</div>
	);
}
