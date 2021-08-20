import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Material
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => createStyles({
	...theme.spreadThis,
	titleCont: {
		textTransform: 'uppercase',
		textAlign: 'center',
		fontFamily: '"Helvetica Compressed"',
		margin: '2rem 0'
	},
	subClass: {
		textAlign: 'center',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		height: '100%',
	},
  hrSub: {
    marginTop: '2.5rem',
    width: '75%'
  },
}));
  
export default function Subscribe(props) {

  const [ subscribe, setSubscribe ] = useState('');

  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const handleSubmit = (evt) => {
		// do something
  }

	return (
		<Grid xs={12} md={4} className={classes.subClass}>
			{
			!matches &&
			<span>
				<Typography variant='h5' style={{ marginBottom: '1rem' }} className={classes.titleCont}><em>Weekly News Updates</em></Typography>
				<Typography variant='body1'>Subscribe to get the week&apos;s most<br /> important news.</Typography>
			  <TextField
			  	color="secondary"
			  	value={subscribe}
			  	onChange={e => setSubscribe(e.target.value)}
			  	onClick={handleSubmit}
			  	placeholder="email@address.com"
			  	className='textField'
			  	variant="outlined"
	        InputProps={{
	          endAdornment: (
	            <InputAdornment position="end">
	              <Button>Subscribe</Button>
	            </InputAdornment>
	          ),
	        }}
		  	/>
				<hr className={`${classes.hrTop} ${classes.hrSub}`} />
				<Typography variant='h5' style={{ marginBottom: '1rem' }} className={classes.titleCont}><em>Want To Reach Out?</em></Typography>
				<Typography variant='body1'>Do you have info to share with our team?<br /><Link className={classes.linkClass} style={{ textDecoration: 'underline' }} href='/contact'>Here&apos;s</Link> how you can reach us.</Typography>
			</span>
			}
		</Grid>
	);
}
