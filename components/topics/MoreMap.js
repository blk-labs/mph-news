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
      margin: '0 0 5rem',
    },
    topic: {
      color: '#52C41A',
      fontWeight: 400,
      fontSize: 12,
      textTransform: 'capitalize',
      border: '1.5px solid #B7EB8F',
      width: 'max-content',
      height: 'max-content',
      padding: '5px',
      backgroundColor: '#F6FFED',
      '&>:nth-child(1)': {
        color: '#eee',
      },
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
      marginTop: '1rem',
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
    moreDetail: {
      marginLeft: 10,
      height: 200,
      display: 'grid',
      [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
        display: 'initial',
      },
    },
  })
);

export default function TopicMap(props) {
  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const { postsId, postImage, id, topic, createdAt, title, body, postedBy } =
    props.topic;
  return (
    <div className={classes.topicCont}>
      <Link key={postsId} className={classes.linkClass} href={`/story/${id}`}>
        <a key={postsId} className={classes.mapCont}>
          <img src={postImage} alt='recent-img' className={classes.imgClass} />
          <div className={classes.moreDetail}>
            <Typography variant='h5' className={classes.topic}>
              {topic}
            </Typography>
            <Typography variant='h5' className={classes.titleClass}>
              JUST IN: {title}
            </Typography>
            <Typography
              variant='body2'
              style={{ margin: '.5rem 0' }}
              className={classes.bottomDetails}
            >
              {body.substring(0, 150)}...
            </Typography>
            <Typography variant='caption' className={classes.contRead}>
              Continue reading
            </Typography>
            <div className='md:flex md:items-baseline sm:justify-inherit capitalize mt-2 hidden'>
              <Typography className={classes.createBy} variant='caption'>
                {postedBy}
              </Typography>
              <Typography className={classes.createAt} variant='caption'>
                {dayjs(createdAt).fromNow()}
              </Typography>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
