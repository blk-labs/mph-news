import React, { useState, useEffect } from "react";
import Link from 'next/link';

// Material
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';


const useStyles = makeStyles((theme) => createStyles({
	...theme.spreadThis,
	topicCont:{
		margin: '2rem 0 5rem'
	},
	imgClass: {
		height: 150,
		maxWidth: 150,
		minWidth: 150,
		objectFit: 'cover',
		[theme.breakpoints.down('xs')]: {
			height: 100,
			maxWidth: 100,
			minWidth: 100,
		}
	},
	mapCont: {
		marginTop: '2rem',
		display: 'flex',
		alignItems: 'start'
	},
	titleClass: {
		fontFamily: '"Helvetica Compressed"',
		[theme.breakpoints.down('xs')]: {
			fontSize: '120%',
			marginBottom: '1rem',
		}
	}
}))

const postsPerPage = 4;
let arrayForHoldingPosts = [];

export default function TopicMap(props) {

  const [postsToShow, setPostsToShow] = useState([]);
  const [next, setNext] = useState(3);

  const loopWithSlice = (start, end) => {
    const slicedPosts = props.posts.slice(start, end);
    arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
    setPostsToShow(arrayForHoldingPosts);
  };

  useEffect(() => {
    loopWithSlice(0, postsPerPage);
  }, []);

  const handleShowMorePosts = () => {
    loopWithSlice(next, next + postsPerPage);
    setNext(next + postsPerPage);
  };

  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

	return (
		<Grid item xs={12} md={7} className={classes.topicCont}>
			<Typography style={{ fontWeight: 'bold' }} variant="h5">More Stories</Typography>
			{
				postsToShow.map((data, i) => (
					<Link className={classes.linkClass} href={`/story/${data.id}`} key={i}>
						<div key={i} className={classes.mapCont}>
							<img src={data.postImage} alt={`${data.topic} img`} className={classes.imgClass} />
							<div style={{ marginLeft: '1rem' }}>
								<Typography variant="h5" className={classes.titleClass}>{data.title}</Typography>
								{matches ? <Typography variant="body2" style={{ margin: '.5rem 0' }}>{data.body.substring(0, 200)}...</Typography> : null}
								<Typography variant="caption">{data.time}</Typography>
							</div>
						</div>
					</Link>
				))
			}
      <Button onClick={handleShowMorePosts} variant="outlined" style={{ marginTop: '2rem', width: '100%' }}>More {props.title} stories</Button>
		</Grid>
	);
}
