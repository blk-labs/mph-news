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

const useStyles = makeStyles((theme) => createStyles({
	...theme.spreadThis,
	gridCont: {
		position: 'relative',
		backgroundColor: 'white',
		[theme.breakpoints.up('md')]: {
			marginTop: '8vh'
		},
		[theme.breakpoints.up('lg')]: {
			marginTop: '17.5vh'
		}
	},
	fadeText: {
		color: 'rgba(0,0,0,.1)',
		textTransform: 'uppercase',
		[theme.breakpoints.up('lg')]: {
			position: 'absolute',
			zIndex: -1,
			top: '-10vh',
		},
		[theme.breakpoints.down('sm')]: {
			top: '-15vh',
		},
		[theme.breakpoints.down('xs')]: {
			top: '-4.5vh',
		}
	},
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
		height: '75px',
		maxWidth: '75px',
	},
	body: {
		display: 'flex',
		flexDirection: 'column'
	}
}));

export default function RecentNews(props) {

	const news = props.news.filter((n, i) => n.important === true && i > 4).slice(0, 4);
	dayjs.extend(relativeTime);

	const theme = useTheme();
	const classes = useStyles(props);
	const matchesLG = useMediaQuery(theme.breakpoints.up('lg'));

	const rText = (
		<span className={classes.fadeText}>
			<Typography style={{ fontFamily: '"Open Sans"', fontWeight: 'bold' }} variant={matchesLG ? 'h3' : 'h4'}><span style={{ fontSize: '120%' }}>R</span>ecent <span style={{ fontSize: '120%' }}>N</span>ews</Typography>
		</span>
	);

	return (
		<Grid item xs={12} md={4} className={classes.gridCont}>
			<Container maxWidth="lg">
				{rText}
				{
					news.map((data, i) => (
						<Link key={i} className={classes.linkClass} key={i} href={`/story/${data.id}`}>
							<div>
								<Grid className={classes.recentCont} container>
									<img src={data.postImage} alt="recent-img" className={classes.recentImg} />
									<div className={classes.body}>
										<Typography variant="body1">{data.title}</Typography>
										<Typography style={{ marginTop: 'auto', textTransform: 'uppercase' }} variant="caption">{dayjs(data.createdAt).fromNow()}</Typography>
									</div>
								</Grid>
								{news.length !== i + 1 ? <hr className={classes.newsHr} /> : null}
							</div>
						</Link>
					))
				}
			</Container>
		</Grid>
	)
}