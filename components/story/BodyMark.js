import React from 'react';

// Material
import { makeStyles, createStyles, useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const useStyles = makeStyles((theme) => createStyles({
	...theme.spreadThis,
	imgCont: {
		marginTop: '2rem',
		height: '500px',
		objectFit: 'cover',
		width: '100%',
		[theme.breakpoints.down('sm')]: {
			height: '300px',
			marginBottom: '2rem',
		},
	},
	bodyText: {
		whiteSpace: 'pre-line'
	}
}));

export default function BodyMark(props) {

  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));

	return (
  	<span>
			<img className={classes.imgCont} src={props.story.postImage} alt="" />
			<Container>
				<Typography variant="subtitle2" className={classes.bodyText}>{props.story.body}</Typography>
			</Container>
		</span>
	);
}
