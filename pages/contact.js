import React, { useState, useEffect } from 'react';

// Material
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles, createStyles, useTheme } from '@mui/styles';

//Comps
import Subscribe from '../components/layout/Subscribe'
import Footer from '../components/layout/Footer'

const useStyles = makeStyles((theme) => createStyles({
	...theme.spreadThis,
	contactForm: {
		marginBottom: '2rem',
		display: 'flex',
    flexDirection: 'column'
	},
	buttonClass: {
		width: '7.5rem',
		height: '2.5rem',
		padding: '1rem 2rem',
		borderRadius: 0,
		marginTop: '2rem'
	},
	textField: {
    [theme.breakpoints.down('sm')]: {
    	width: '100%'
    }
	}
}));

export default function Contact(props) {

  const theme = useTheme();
  const classes = useStyles(props);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [body, setBody] = useState("");

	const handleSubmit = () => {
		// do something
	}

	document.title = 'Contact Us | News | My Political Hub';

	return (
		<span>
			<Container maxWidth="lg">
			<Grid container style={{ margin: '5% auto 10%' }}>
				<Grid xs={12} lg={8}>
					<Typography variant="h4">Contact Us</Typography>
					<br /><br />
					<Typography variant="body1">You can reach us via phone, email and website. Or send us some message through our Contact Page.</Typography>
					<br /><br />
					<Typography variant="body2"><a style={{ color: 'black', textDecoration: 'none' }} href='tel:08088715745'>(+234) 808-871-5745</a></Typography>
					<Typography variant="body2"><a style={{ color: 'black', textDecoration: 'none' }} href='tel:08135537811'>(+234) 813-553-7811</a></Typography>
					<br />
					<Typography variant="body2"><a style={{ color: 'black', textDecoration: 'none' }} href='mailto:info@mypoliticalhub.com'>info@mypoliticalhub.com</a></Typography>
					<form className={classes.contactForm}>
					  <TextField
					  	color="secondary"
					  	value={name}
					  	onChange={e => setName(e.target.value)}
					  	onClick={handleSubmit}
					  	placeholder="Name*"
					  	className={`textField ${classes.textField}`}
					  	variant="outlined"
				  	/>
					  <TextField
					  	color="secondary"
					  	value={email}
					  	onChange={e => setEmail(e.target.value)}
					  	onClick={handleSubmit}
					  	placeholder="Email*"
					  	className={`textField ${classes.textField}`}
					  	variant="outlined"
				  	/>
					  <TextField
					  	color="secondary"
					  	value={body}
					  	onChange={e => setBody(e.target.value)}
					  	onClick={handleSubmit}
					  	multiline
					  	rows={4}
					  	placeholder="Contact Us*"
					  	className={`textField ${classes.textField}`}
					  	variant="outlined"
				  	/>
            <Button variant="outlined" className={classes.buttonClass}>Subscribe</Button>
					</form>
				</Grid>
				<Subscribe />
			</Grid>
			</Container>
			<Footer />
		</span>
	);
}