import React from 'react';

// Material
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

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
