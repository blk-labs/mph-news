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
      margin: '4rem 0 5rem',
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
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    imgClass: {
      height: 200,
      maxWidth: 280,
      minWidth: 280,
      objectFit: 'cover',
      marginRight: 10,
      [theme.breakpoints.down('xs')]: {
        height: 270,
        maxWidth: '100%',
        minWidth: '100%',
      },
    },
    mapCont: {
      marginTop: '2rem',
      display: 'flex',
      alignItems: 'start',
      [theme.breakpoints.down('xs')]: {
        display: 'block',
      },
    },
    titleClass: {
      fontWeight: 900,
      fontSize: 20,
      margin: '10px 0 0',
      lineHeight: 1.2,
      textTransform: 'initial',
      letterSpacing: -0.2,
      fontFamily: '"Playfair Display"',
      [theme.breakpoints.down('xs')]: {
        fontSize: '24px',
      },
    },
    bottomDetails: {
      margin: '10px 0 0',
      fontSize: 15,
      letterSpacing: 0,
      fontWeight: 300,
      textTransform: 'initial',
      [theme.breakpoints.down('xs')]: {
        fontSize: '13px',
      },
    },
    contRead: {
      display: 'none',
      [theme.breakpoints.down('xs')]: {
        display: 'initial',
        fontWeight: 500,
        margin: '10px 0 20px 0',
        borderBottom: '1px solid black',
      },
    },
    createBy: {
      fontSize: 11,
      color: '#6B3FA0',
      fontWeight: 600,
      marginRight: 20,
      fontFamily: '"Helvetica"',

      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
        color: '#000',
      },
    },
    createAt: {
      fontSize: 11,
      fontFamily: '"Helvetica"',
      textTransform: 'capitalize',
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
        marginTop: 0,
      },
    },
  })
);

const postsPerPage = 4;
const firstIndex = 0;

let arrayForHoldingPosts = [];

export default function TopicMap(props) {
  // const [postsToShow, setPostsToShow] = useState([]);
  // const [next, setNext] = useState(3);

  // const loopWithSlice = (start, end) => {
  //   const slicedPosts = props.posts.slice(start, end);
  //   arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
  //   setPostsToShow(arrayForHoldingPosts);
  // };

  // useEffect(() => {
  //   loopWithSlice(4, postsPerPage);
  // }, []);

  // const handleShowMorePosts = () => {
  //   loopWithSlice(next, next + postsPerPage);
  //   setNext(next + postsPerPage);
  // };

  const [pageSize, setPageSize] = React.useState(6);
  const [page, setPage] = React.useState(1);
  const [postsToShow, setData] = React.useState(arrayForHoldingPosts.slice(firstIndex, pageSize));

  React.useEffect(() => {
    setData(arrayForHoldingPosts.slice(0, pageSize));
  }, [pageSize]);

  const handleChange = (event, value) => {
    setPage(value);
    setData(arrayForHoldingPosts.slice(firstIndex + pageSize * (value - 1), pageSize * value));
  };

  //Change width
  const changeWidth = (e) => {
    setPageSize(parseInt(e.target.value, 10));
  };

  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <div className={classes.topicCont}>
      {/* <Typography className='hidden lg:block font-bold' variant='h5'>
        More Stories
      </Typography> */}
      {postsToShow.map((data, i) => (
        <Link className={classes.linkClass} href={`/story/${data.id}`} key={i}>
          <a key={i} className={classes.mapCont}>
            <img
              src={data.postImage}
              alt={`${data.topic} img`}
              className={classes.imgClass}
            />
            <div className='lg:ml-1 ml-0'>
              <Typography variant='h5' className={classes.topic}>
                {data.topic}
              </Typography>
              <Typography variant='h5' className={classes.titleClass}>
                JUST IN: {data.title}
              </Typography>
              <Typography
                variant='body2'
                style={{ margin: '.5rem 0' }}
                className={classes.bottomDetails}
              >
                {data.body.substring(0, 150)}...
              </Typography>
              <Typography variant='caption' className={classes.contRead}>
                Continue reading
              </Typography>
              <div className='md:flex md:items-baseline sm:justify-inherit capitalize mt-2 hidden'>
                <Typography className={classes.createBy} variant='caption'>
                  {data.postedBy}
                </Typography>
                <Typography className={classes.createAt} variant='caption'>
                  {dayjs(data.createdAt).fromNow()}
                </Typography>
              </div>
            </div>
          </a>
        </Link>
      ))}
      {/* <Button
        onClick={handleShowMorePosts}
        variant='outlined'
        style={{ marginTop: '2rem', width: '100%' }}
      >
        More {props.title} stories
      </Button> */}
      <div style={{ marginTop: 70, marginBottom: 50 }}>
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(arrayForHoldingPosts.length / pageSize)}
            variant='outlined'
            shape='rounded'
            onChange={handleChange}
            className={classes.root}
          />
        </Stack>
      </div>
    </div>
  );
}
