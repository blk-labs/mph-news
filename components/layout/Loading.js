import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles, withStyles } from '@mui/styles';
import { LinearProgress } from "@mui/material"

const BorderLinearProgress = withStyles((theme) => ({
	root: {
		height: 4,
		width: 250,
		borderRadius: 5,
	},
	colorPrimary: {
		backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
	},
	bar: {
		borderRadius: 5,
		backgroundColor: '#5ba56e',
	},
}))(LinearProgress);

export default class Loading extends React.Component {

	render() {
		return (
			<div className="loader h-full w-screen top-0 bottom-0 left-0 right-0 flex justify-center items-start py-16" >
				{/* <BorderLinearProgress style={{ display: 'flex', margin: 'auto' }} /> */}
				<CircularProgress size={45} thickness={3.5} color="secondary" />
			</div>
		);
	}
}
