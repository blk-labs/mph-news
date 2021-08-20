import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Material
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => createStyles({
	...theme.spreadThis,
	topImg: {
		width: '100%',
		height: '400px',
		objectFit: 'cover',
		[theme.breakpoints.down('sm')]: {
			width: '75%',
			margin: 'auto',
			display: 'flex',
			height: '300px',
		},
		[theme.breakpoints.down('xs')]: {
			width: '100%',
			height: '200px',
		},
	},
	titleText: {
		margin: '1rem 0',
		textTransform: 'capitalize',
		fontFamily: '"Helvetica Compressed"',
		[theme.breakpoints.down('sm')]: {
			fontSize: '175%'
		}
	},
}))

export default function FirstMap(props) {

	dayjs.extend(relativeTime);
	const theme = useTheme();
	const classes = useStyles(props);
	const matches = useMediaQuery(theme.breakpoints.up('md'));

	const { postsId, postImage, id, createdAt, title } = props.topic;

	return (
		<Grid container>
			<Grid item>
				<Link key={postsId} className={classes.linkClass} href={`/story/${id}`}>
					<div>
						<img src={postImage} alt={`${title} image`} className={classes.topImg} />
						<Typography variant="h4" className={classes.titleText}>{title}</Typography>
						<Typography style={{ textTransform: 'uppercase' }} variant="caption">{dayjs(createdAt).fromNow()}</Typography>
					</div>
				</Link>
			</Grid>
		</Grid>
	);
}
