import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Material
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { makeStyles, createStyles, useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,
    topImg: {
      width: '100%',
      height: '617px',
      objectFit: 'cover',
      [theme.breakpoints.down('xs')]: {
        minWidth: '100%',
        maxWidth: '100%',
        margin: 'auto',
        display: 'flex',
        height: '270px',
      },
    },
    titleText: {
      fontWeight: 900,
      fontSize: 36,
      textTransform: 'initial',
      fontFamily: '"Playfair Display"',
      lineHeight: 1.1,
      paddingTop: 25,
      letterSpacing: -1,
      [theme.breakpoints.down('sm')]: {
        fontSize: '24px',
      },
    },
    subnews: {
      color: 'black',
      fontSize: 15,
      margin: '10px 0',
      letterSpacing: 0,
      fontWeight: 300,
      [theme.breakpoints.down('sm')]: {
        fontSize: '13px',
      },
    },
    contRead: {
      display: 'none',
      [theme.breakpoints.down('sm')]: {
        display: 'initial',
        fontWeight: 500,
        margin: '10px 0',
        borderBottom: '1px solid black',
      },
    },
    createBy: {
      fontSize: 15,
      color: '#6B3FA0',
      fontWeight: 600,
      marginRight: 20,
      fontFamily: '"Helvetica"',

      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
        color: '#000',
      },
    },
    createAt: {
      fontSize: 15,
      fontFamily: '"Helvetica"',
      textTransform: 'capitalize',
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
        marginTop: 0,
      },
    },
  })
);

export default function FirstMap(props) {
  dayjs.extend(relativeTime);
  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const { postsId, postedBy, postImage, id, createdAt, title, body } =
    props.topic;

  return (
    <Grid container>
      <Grid item>
        <Link key={postsId} className={classes.linkClass} href={`/story/${id}`}>
          <a>
            <img
              src={postImage}
              alt={`${title} image`}
              className={classes.topImg}
            />
            <Typography variant='h4' className={`${classes.titleText} cinzel font-bold text-xl lg:text-4xl`}>
              {title}
            </Typography>
            <Typography className={`${classes.subnews} py-4`}>
              {body.substring(0, 150)}...
              <br />
            </Typography>
            <Typography variant='caption' className={classes.contRead}>
              Continue reading
            </Typography>
            <div className='md:flex md:items-baseline sm:justify-inherit capitalize mt-2 hidden'>
              <Typography className={`${classes.createBy} mr-2`} variant='caption'>
                {postedBy}
              </Typography>
              <Typography className={classes.createAt} variant='caption'>
                {dayjs(createdAt).fromNow()}
              </Typography>
            </div>
          </a>
        </Link>
      </Grid>
    </Grid>
  );
}
