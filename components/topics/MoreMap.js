import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
// Material
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,
    topicCont: {
      margin: '2rem 0 5rem',
    },
    topic: {
      color: '#52C41A',
      fontWeight: 400,
      fontSize: 12,
      textTransform: 'capitalize',
      border: '1.5px solid #B7EB8F',
      width: 'fit-content',
      padding: '5px',
      backgroundColor: '#F6FFED',
    },
    imgClass: {
      height: 200,
      maxWidth: 280,
      minWidth: 280,
      objectFit: 'cover',
      [theme.breakpoints.down('xs')]: {
        height: 100,
        maxWidth: 100,
        minWidth: 100,
      },
    },
    mapCont: {
      marginTop: '2rem',
      display: 'flex',
      alignItems: 'start',
    },
    titleClass: {
      fontWeight: 900,
      fontSize: 22,
      margin: '10px 0 0',
      lineHeight: 1.2,
      textTransform: 'initial',
      letterSpacing: -0.2,
      fontFamily: '"Playfair Display"',
      [theme.breakpoints.down('xs')]: {
        fontSize: '120%',
        marginBottom: '1rem',
      },
    },
    bottomDetails: {
      margin: '10px 0 0',
      fontSize: 15,
      letterSpacing: 0,
      fontWeight: 300,
      textTransform: 'initial',
    },
  })
);

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
    loopWithSlice(4, postsPerPage);
  }, []);

  const handleShowMorePosts = () => {
    loopWithSlice(next, next + postsPerPage);
    setNext(next + postsPerPage);
  };

  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <div className={classes.topicCont}>
      <Typography style={{ fontWeight: 'bold' }} variant='h5'>
        More Stories
      </Typography>
      {postsToShow.map((data, i) => (
        <Link className={classes.linkClass} href={`/story/${data.id}`} key={i}>
          <a key={i} className={classes.mapCont}>
            <img
              src={data.postImage}
              alt={`${data.topic} img`}
              className={classes.imgClass}
            />
            <div style={{ marginLeft: '1rem' }}>
              <Typography variant='h5' className={classes.topic}>
                {data.topic}
              </Typography>
              <Typography variant='h5' className={classes.titleClass}>
                JUST IN: {data.title}
              </Typography>
              {matches ? (
                <Typography
                  variant='body2'
                  style={{ margin: '.5rem 0' }}
                  className={classes.bottomDetails}
                >
                  {data.body.substring(0, 150)}...
                </Typography>
              ) : null}
              <Typography
                style={{
                  textTransform: 'capitalize',
                  marginRight: 40,
                  fontSize: 15,

                  color: '#6B3FA0',
                }}
                variant='caption'
              >
                {data.postedBy}
              </Typography>
              <Typography
                style={{ textTransform: 'capitalize', fontSize: 15 }}
                variant='caption'
              >
                {dayjs(data.createdAt).fromNow()}
              </Typography>
            </div>
          </a>
        </Link>
      ))}
      <Button
        onClick={handleShowMorePosts}
        variant='outlined'
        style={{ marginTop: '2rem', width: '100%' }}
      >
        More {props.title} stories
      </Button>
      <Stack spacing={2}>
        <Pagination
          count={5}
          variant='outlined'
          shape='rounded'
          onClick={handleShowMorePosts}
        />
      </Stack>
    </div>
  );
}
