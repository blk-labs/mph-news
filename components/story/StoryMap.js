import React from 'react';
import dayjs from 'dayjs';

// Material
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => createStyles({
	...theme.spreadThis,
	imgCont: {
		marginTop: '2rem',
		height: '500px',
		objectFit: 'cover',
		width: '100%',
		[theme.breakpoints.down('sm')]: {
			height: '300px'
		}
	},
	bodyText: {
		whiteSpace: 'pre-line',
		margin: '1rem auto 5rem',
		[theme.breakpoints.down('md')]: {
			marginBottom: '5rem'
		}
	},
}));

export default function StoryMap(props) {

	const { topic, createdAt, postedBy, postImage, body, title } = props.story;

  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));

	return (
		<span>
			<Typography variant="body1" style={{ color: 'lightgray', textTransform: 'uppercase', fontWeight: 'bold' }}>{topic}</Typography>
			<Typography variant="h4" style={{ padding: '1rem 0', fontFamily: '"Helvetica Compressed"', textTransform: 'capitalize' }}>{title}</Typography>
			<Typography variant="body1" style={{ margin: '1rem 0 0', fontWeight: 'bold', textTransform: 'capitalize' }}>By {postedBy}</Typography>
			<Typography variant="caption" style={{ color: 'lightgray' }}>{dayjs(createdAt).format('h:mm a, dddd DD-MMM-YYYY')}</Typography>
			{ matches ? (
		  	<span>
					<img className={classes.imgCont} src={postImage} />
					<Typography variant="subtitle2" className={classes.bodyText}>{body}</Typography>
				</span>
				) : null
			}
		</span>
	);
}

