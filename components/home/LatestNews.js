import React from 'react';
import Link from 'next/link';
import Carousel from '@brainhubeu/react-carousel';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import '@brainhubeu/react-carousel/lib/style.css';

// Material
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => createStyles({
	...theme.spreadThis,
	gridCont: {
		position: 'relative',
		[theme.breakpoints.up('md')]: {
			marginTop: '17.5vh'
		}
	},
	fadeText: {
		position: 'absolute',
		zIndex: -1,
		top: '-10vh',
		color: 'rgba(0,0,0,.1)',
		textTransform: 'uppercase',
	},
	newsCont: {
		marginTop: '.5rem',
		[theme.breakpoints.up('sm')]: {
			marginRight: '1rem',
		}
	},
	imgClass: {
		width: '500px',
		height: '400px',
		objectFit: 'cover',
		[theme.breakpoints.down('sm')]: {
			height: '300px',
			display: 'block',
			margin: 'auto',
		},
	},
	title: {
		marginBottom: '2rem',
		fontFamily: 'Helvetica Compressed',
		[theme.breakpoints.down('sm')]: {
			letterSpacing: '.5px'
		}
	},
	smHr: {
		borderBottom: '0',
		borderLeft: '0',
		borderTop: '10px solid #ebebeb',
		marginBottom: '2rem'
	},
	smGrid: {
		margin: 'auto 1rem',
		minWidth: 225,
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column'
	},
	smImg: {
		width: 'auto',
		height: 125,
		objectFit: 'cover'
	}
}));

export default function LatestNews(props) {

	const news = props.news.filter((n) => n.important === true);
	dayjs.extend(relativeTime);

	const theme = useTheme();
	const classes = useStyles(props);
	const matches = useMediaQuery(theme.breakpoints.up('md'));
	const matchesLG = useMediaQuery(theme.breakpoints.up('lg'));

	const lText = (
		<span className={classes.fadeText}>
			<Typography style={{ fontFamily: '"Open Sans"', fontWeight: 'bold' }} variant={matchesLG ? 'h3' : 'h4'}><span style={{ fontSize: '120%' }}>B</span>reaking <span style={{ fontSize: '120%' }}>N</span>ews</Typography>
		</span>
	);

	return (
		<Grid item xs={12} md={8} className={classes.gridCont}>
			{matches ? lText : null}
			{
				matches ? (
					<Carousel autoPlay={7500} infinite={true}>
						{
							news.splice(0, 5).map((data, i) => (
								<Link key={i} className={classes.linkClass} href={`/story/${data.id}`}>
									<div>
										<Grid container className={classes.newsCont}>
											{matches ? (
												<Grid style={{ paddingRight: '.5rem' }} item md={5}>
													<Typography variant="h4" className={classes.title}>{data.title}</Typography>
													<Typography variant="body1" color="textSecondary" style={{ marginBottom: '2rem' }}>{data.subTitle}</Typography>
													<Typography variant="button">{dayjs(data.createdAt).fromNow()}</Typography>
												</Grid>
											) : null
											}
											<Grid style={{ overflow: 'hidden' }} item xs={12} md={7}>
												<img src={data.postImage} alt="news" className={classes.imgClass} />
												{!matches ? <h2 style={{ fontSize: '1.85rem', padding: '0 1rem', fontFamily: 'Helvetica Compressed' }}>{data.title}</h2> : null}
											</Grid>
										</Grid>
									</div>
								</Link>
							)
							)}
					</Carousel>
				) : (
					news.filter((data, i) => i === 0).map((data, i) => (
						<Link key={i} className={classes.linkClass} href={`/story/${data.id}`}>
							<div>
								<Grid style={{ marginTop: '.5rem', overflow: 'hidden' }} item xs={12} md={7}>
									<img src={data.postImage} alt="news" className={classes.imgClass} />
									<h2 style={{ letterSpacing: '1.25px', fontSize: '1.85rem', padding: '0 1rem', fontFamily: 'Helvetica Compressed' }}>{data.title}</h2>
									<hr className={classes.smHr} />
								</Grid>
							</div>
						</Link>
					))
				)
			}
			{
				!matches ? (
					<div style={{ position: 'relative', display: 'flex', width: '100%', overflow: 'auto', paddingTop: '1.1rem', marginBottom: '5rem' }}>
						{
							news.filter((data, i) => i > 0).slice(0, 4).map((data, i) => (
								<Link key={i} className={classes.linkClass} href={`/story/${data.id}`}>
									<div>
										<Grid className={classes.smGrid}>
											<img src={data.postImage} alt="news" className={classes.smImg} />
											<Typography variant="caption">{data.title}</Typography>
										</Grid>
									</div>
								</Link>
							))
						}
					</div>
				) : null
			}
		</Grid>
	);
}
