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
	recentCont: {
		textTransform: 'capitalize',
		marginTop: '.5rem',
		marginBottom: '1.5rem',
		display: 'flex',
		width: '100%',
		flexWrap: 'inherit'
	},
	recentImg: {
		margin: 'auto .5rem',
		objectFit: 'cover',
		minWidth: '75px',
		maxWidth: '75px',
		height: '75px'
	},
	body: {
		display: 'flex',
		flexDirection: 'column'
	}
}))

export default function SideMap(props) {

	dayjs.extend(relativeTime);
  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const { postsId, postImage, id, createdAt, title } = props.topic;

	return (
		<div>
			<Link key={postsId} className={classes.linkClass} href={`/story/${id}`}>
				<Grid className={classes.recentCont} key={postsId} container>
					<img src={postImage} alt="recent-img" className={classes.recentImg} />
					<div className={classes.body}>
						<Typography variant="body1">{title}</Typography>
						<Typography style={{ marginTop: 'auto', textTransform: 'uppercase' }} variant="caption">{dayjs(createdAt).fromNow()}</Typography>
					</div>
				</Grid>
			</Link>
		</div>
	);
}
