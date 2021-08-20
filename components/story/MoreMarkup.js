import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Mail, Facebook, Twitter, Whatsapp } from 'react-social-sharing'

// Material
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => createStyles({
	...theme.spreadThis,
	moreCont: {
		marginBottom: '5rem',
		position: 'relative',
		[theme.breakpoints.down('md')]: {
			paddingTop: '2rem'
		}
	},
	fadeTopic: {
		position: 'absolute',
		color: 'rgba(0,0,0,.05)',
		zIndex: '-1',
		marginTop: '-1.5rem',
		fontFamily: '"Helvetica Compressed"'
	},
	mainImg: {
		minWidth: '100px',
		maxWidth: '100px',
		marginRight: '1rem',
		height: '75px',
		objectFit: 'cover'
	},
	socialCont: {
		marginBottom: '10%'
	}
}));

export default function MoreMarkup(props) {

	dayjs.extend(relativeTime);
	const theme = useTheme();
	const classes = useStyles(props);
	const matches = useMediaQuery(theme.breakpoints.up('md'));

	const link = `https://news.mypoliticalhub.com${props.link}`;

	console.log(props)

	return (
		<Container>
			<Grid item xs={12} lg={8}>
				<div className={classes.moreCont}>
					<div className={classes.socialCont}>
						<Mail solid medium subject={props.title} body="Check out http://mypoliticalhub.com" link={`${link}`} />
						<Facebook solid medium link={`${link}`} />
						<Twitter solid medium message={props.title} link={`
${link}
@my_politicalhub`} />
						<Whatsapp solid medium message={props.title} link={`${link}`} />
					</div>
					<Typography variant="h3" className={`capitalize ${classes.fadeTopic}`}>Recent {props.topic !== undefined && props.topic}</Typography>
					<Typography variant="h4" className='capitalize' style={{ fontFamily: '"Helvetica Compressed"', marginBottom: '2rem' }}>Recent {props.topic !== undefined && props.topic}</Typography>
					<Grid container>
						{props.topics !== undefined &&
							props.topics.map((data, i) => (
								<Grid key={i} item xs={12} lg={6}>
									<Link style={{ display: 'flex' }} className={classes.linkClass} target="_blank" href={`/story/${data.id}`}>
										<div>
											<img src={data.postImage} className={classes.mainImg} alt={`${data.topics} image`} />
											<div style={{ display: 'flex', flexDirection: 'column', marginRight: '.5rem' }}>
												<Typography style={{ textTransform: 'capitalize' }} variant="subtitle2">{data.title}</Typography>
												<Typography style={{ margin: '1rem 0 2rem', textTransform: 'uppercase' }} variant="caption">{dayjs(data.createdAt).fromNow()}</Typography>
											</div>
										</div>
									</Link>
								</Grid>
							)).splice(0, 4)
						}
					</Grid>
				</div>
			</Grid>
		</Container>
	);
}
