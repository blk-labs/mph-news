import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Material
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => createStyles({
	...theme.spreadThis,
	gridCont: {
		marginTop: '2rem',
		padding: '0 .5rem'
	},
	mainCont: {
		display: 'flex',
		overflow: 'hidden',
		flexDirection: 'column'
	},
	mainImg: {
		width: '300px',
		height: '200px',
		objectFit: 'cover',
		[theme.breakpoints.down('md')]: {
			height: '250px',
			width: '100%'
		},
		[theme.breakpoints.down('sm')]: {
			width: '100%',
			height: '250px',
		}
	},
	groupCont: {
		overflow: 'hidden',
		display: 'flex',
		alignItems: 'start',
		textTransform: 'capitalize'
	},
	groupImg: {
		minWidth: 100,
		maxWidth: 100,
		height: 75,
		objectFit: 'cover',
		marginRight: '.5rem'
	},
	btnClass: {
		width: '100%',
		textAlign: 'center',
		margin: '3rem auto 5rem'
	}
}));

export default function TopicMap(props) {

	const theme = useTheme();
	const classes = useStyles(props);
	const matches = useMediaQuery(theme.breakpoints.up('md'));
	const news = props.pass;

	dayjs.extend(relativeTime);

	return (
		<Grid item className={classes.gridCont} sm={6} lg={3}>
			<Typography variant="body1" style={{ fontFamily: '"Open Sans"', fontWeight: 'bold', textTransform: 'uppercase' }}>{props.topic}</Typography>
			<hr style={{ borderColor: 'rgba(0,0,0,.25)', borderBottom: 0 }} />
			{
				news.filter((data, i) => i === 0).map((data, i) => (
					<Link key={i} className={classes.linkClass} key={i} href={`/story/${data.id}`}>
						<div>
						<Grid className={classes.mainCont} key={i}>
							<img src={data.postImage} className={classes.mainImg} alt={`${props.topic} image`} />
							<Typography style={{ fontSize: '110%', fontWeight: 'bold', textTransform: 'capitalize' }} variant="subtitle1">{data.title}</Typography>
							<Typography style={{ margin: '1rem 0 2rem', textTransform: 'uppercase' }} variant="caption">{dayjs(data.createdAt).fromNow()}</Typography>
						</Grid>
						</div>
					</Link>
				))
			}
			{
				news.filter((data, i) => i > 0).map((data, i) => (
					<Link key={i} className={classes.linkClass} key={i} href={`/story/${data.id}`}>
						<div>
							{props.pass.length !== i + 1 ? <hr style={{ borderColor: 'rgba(0,0,0,.25)', borderBottom: 0 }} /> : null}
							<Grid className={classes.groupCont} key={i}>
								<img src={data.postImage} className={classes.groupImg} alt={`${props.topic} image`} />
								<Typography variant="body2">{data.title}</Typography>
							</Grid>
						</div>
					</Link>
				))
			}
			<Link style={{ textDecoration: 'none' }} href={`/topics/${props.topic}`}>
				<Button className={classes.btnClass} variant="outlined">
					more {props.topic}
				</Button>
			</Link>
		</Grid>
	);
}
