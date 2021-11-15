import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

// Material UI
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => createStyles({
	...theme.spreadThis,
	postCont: {
		display: 'flex',
		flexDirection: 'column',
		marginLeft: 'auto'
	},
	buttonClass: {
		padding: '.5rem',
		borderRadius: '50%',
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: 'rgba(0,0,0,.1)',
			transition: '.5s'
		}
	}
}));

export default function EditorsPick(props) {

  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const [post, setPost] = useState('');
  const posts = props.posts.filter(fil => fil.topic !== 'video' && fil.editors_pick === false);

  const handleSelect = (pid) => {
  	setPost(pid);

		axios.get(`/update/${pid}`)
		.then((res) => props.handleSuccess())
		.catch(err => {
			console.log(err)
		})

  }

	return (
    <div>
      {posts.map((post, i) => (
        <div key={i}>
          <Grid container style={{ flexDirection: 'column' }}>
            <Grid xs={1} className={classes.postCont}>
              <BookmarkBorderIcon
                onClick={() => handleSelect(post.postsid)}
                className={classes.buttonClass}
                color='secondary'
              />
            </Grid>
            <Grid xs={11} className={classes.postCont}>
              <Typography
                style={{ textTransform: 'capitalize' }}
                variant='subtitle1'
              >
                {post.title}
              </Typography>
              <Typography variant='subtitle2'>{post.subtitle}</Typography>
              <Typography variant='button'>topic: {post.topic}</Typography>
              <Typography variant='caption'>
                Posted By: {post.postedBy}
              </Typography>
              <Typography variant='caption'>
                Posted On:{' '}
                {dayjs(post.createdAt).format('h:mm a, dddd DD-MMM-YYYY')}
              </Typography>
            </Grid>
          </Grid>
          <hr />
        </div>
      ))}
    </div>
  );
}
