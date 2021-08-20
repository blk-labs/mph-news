import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Material
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Comps

const useStyles = makeStyles((theme) => createStyles({
	...theme.spreadThis,
	videoCont: {
		color: 'white',
		backgroundColor: '#1766b9',
		margin: '2.5rem auto 5rem',
		padding: '2rem 0 3rem',
	},
	videoClass: {
		width: '-webkit-fill-available',
		height: '500px',
		border: 0,
		paddingLeft: '.5rem',
		[theme.breakpoints.down('md')]: {
			padding: '2rem 0',
			paddingLeft: '0',
			height: '200px',			
		},
		[theme.breakpoints.down('sm')]: {
			paddingLeft: '0',
			height: '300px',
		}
	},
	videoBottom: {
		width: '100%',
		height: '200px',
		border: 0,
		[theme.breakpoints.down('sm')]: {
			height: '150px'
		},
		[theme.breakpoints.down('xs')]: {
			height: '100px'
		}
	},
	upTitle: {
		paddingRight: '1rem'
	},
	btmTitle: {
		padding: '1rem 0',
		fontWeight: 'bold',
		textTransform: 'capitalize',
		[theme.breakpoints.down('sm')]: {
			fontSize: '80%!important'
		}
	}
}));

export default function VideoNews(props) {

  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const matchesLG = useMediaQuery(theme.breakpoints.up('lg'));

  const news = props.news.filter(n => n.topic === 'video').splice(0, 5);
	dayjs.extend(relativeTime);

	return (
		<span>
		<Grid container className={classes.videoCont}>
			<Container maxWidth="lg">
				<Typography variant="h3" style={{ fontFamily: '"Helvetica Compressed"', padding: '1rem 0' }}>Latest MPH Videos</Typography>
				{
					news.filter((data, i) => i === 0).map((data, i) => (
						<Grid style={{ padding: '2rem 0' }} container key={i}>
							<Grid item xs={12} md={3} className={classes.upTitle}>
								<Typography style={{ fontFamily: '"Helvetica Compressed"' }} variant="h4">{data.title}</Typography>
								{ matches ? <Typography variant="body2" style={{ padding: '1rem 0' }}>{data.body}</Typography> : null }
								<Typography variant="caption" style={{ textTransform: 'uppercase' }}>{dayjs(data.createdAt).fromNow()}</Typography>
							</Grid>
							<Grid item xs={12} md={9}>
								<iframe className={classes.videoClass}
									src={data.link}>
								</iframe>
							</Grid>
						</Grid>
					))
				}
				<Grid spacing={4} container>
				{
					news.filter((data, i) => i > 0).map((data, i) => (
						<Grid className={classes.btmCont} key={i} item xs={6} sm={3}>
							<iframe className={classes.videoBottom}
								src={`${data.link}?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=0`}>
							</iframe>
							<Typography className={classes.btmTitle} variant="h6">{data.title}</Typography>
							<Typography variant="caption" style={{ textTransform: 'uppercase' }}>{dayjs(data.createdAt).fromNow()}</Typography>
						</Grid>
					))
				}
				</Grid>
			</Container>
		</Grid>
		<Container>
			<Grid className="advertSpace" item sm={12}>
				<Typography variant="h5" style={{ cursor: 'pointer', margin: 'auto', width: 'fit-content', letterSpacing: '1px', fontFamily: '"Helvetica Compressed"', textTransform: 'uppercase'}}>
					interested in Buying this space?
				</Typography>
			</Grid>
		</Container>
		</span>
	);
}