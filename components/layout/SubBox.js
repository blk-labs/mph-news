import React from "react";

// Material UI

import { makeStyles, createStyles, useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import KeyboardArrow from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles((theme) => createStyles({
	...theme.spreadThis,
	subCont: {
		background: theme.palette.primary.dark,
		padding: '1.5rem',
		color: 'white',
		width: '80%',
		margin: '3rem auto 0'
	},
	paperClass: {
		marginTop: '1rem',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 0
	},
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}))

export default function SubBox(props) {

	const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));

	return (
		<div className={classes.subCont}>
			<Typography style={{ fontWeight: 'bold', fontFamily: '"Open Sans"', marginBottom: '.5rem' }} variant="h6">Our news, in your inbox!</Typography>
			<Typography variant="body2">Get updated with the latest news by joining our newsletter.</Typography>
		  <Paper className={classes.paperClass} component="form">
	      <InputBase
	        className={classes.input}
	        inputProps={{ 'aria-label': 'enter email' }}
	      />
	      <Divider className={classes.divider} orientation="vertical" />
	      <IconButton type="submit" className={classes.iconButton}>
	        <KeyboardArrow />
	      </IconButton>
		  </Paper>
		</div>
	);
}
