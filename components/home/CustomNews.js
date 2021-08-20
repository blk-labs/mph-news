import React from 'react';
import Link from 'next/link';

// Material
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Comps
import Subscribe from '../layout/Subscribe';

const useStyles = makeStyles((theme) => createStyles({
	...theme.spreadThis,
	titleCont: {
		textTransform: 'uppercase',
		textAlign: 'center',
		fontFamily: '"Helvetica Compressed"',
		margin: '2rem 0'
	},
	imgClass: {
		objectFit: 'cover',
		minWidth: '100%',
		height: '100px',
		maxWidth: '100%',
		[theme.breakpoints.down('sm')]: {
			height: '150px'
		},
		[theme.breakpoints.down('xs')]: {
			height: '100px'
		}
	},
	gridClass: {
		margin: '0',
		[theme.breakpoints.up('md')]: {
			maxWidth: '22.5%'
		},
		[theme.breakpoints.down('sm')]: {
			maxWidth: '45%'
		}
	},
}));

export default function CustomNews(props) {

	const news = props.news.filter(n => n.topic !== 'video');
	const recommend = news.filter(n => n.editors_pick === true).slice(0, 4);
	const liked = news.sort((a, b) => b.commentCount - a.commentCount).slice(0, 4);

	const theme = useTheme();
	const classes = useStyles(props);

	return (
		<Grid container style={{ marginBottom: '5rem' }} justify="space-between">
			<Grid xs={12} md={8}>
				<div>
					<Typography variant="h5" className={classes.titleCont}>Editors Picks</Typography>
					<Grid justify="space-around" container>
						{
							recommend.map((data, i) => (
								<Grid xs={6} md={3} className={classes.gridClass}>
									<Link key={i} className={classes.linkClass} key={i} href={`/story/${data.id}`}>
										<div>
											<img src={data.postImage} className={classes.imgClass} alt="recommended" />
											<Typography variant="subtitle2"><strong>{data.title}</strong></Typography>
										</div>
									</Link>
								</Grid>
							))
						}
					</Grid>
				</div>
				<hr className={`${classes.hrTop} ${classes.hrHome}`} />
				<div>
					<Typography variant="h5" className={classes.titleCont}>Most Comments</Typography>
					<Grid justify="space-around" container>
						{
							liked.map((data, i) => (
								<Grid xs={6} md={3} className={classes.gridClass}>
									<Link key={i} className={classes.linkClass} key={i} href={`/story/${data.id}`}>
										<div>
											<img src={data.postImage} className={classes.imgClass} alt="recommended" />
											<Typography variant="subtitle2"><strong>{data.title}</strong></Typography>
										</div>
									</Link>
								</Grid>
							))
						}
					</Grid>
				</div>
			</Grid>
			<Subscribe />
		</Grid>
	);
}
