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
    recentCont: {
      textTransform: 'capitalize',
      marginBottom: '1.5rem',
      display: 'flex',
      width: '100%',
    },
    recentImg: {
      objectFit: 'cover',
      minWidth: '100%',
      maxWidth: '100%',
      height: '274px',
      [theme.breakpoints.down('md')]: {
        height: '350px',
      },
      [theme.breakpoints.down('sm')]: {
        height: '270px',
      },
    },
    bottomNews: {
      fontWeight: 900,
      fontSize: 15,
      margin: '10px 0 0',
      lineHeight: 1.2,
      textTransform: 'initial',
      letterSpacing: -0.2,
      fontFamily: '"Playfair Display"',
      [theme.breakpoints.down('sm')]: {
        fontSize: '24px',
      },
    },
    subnews: {
      color: 'black',
      fontSize: 13,
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
        margin: '10px 0 20px 0',
        borderBottom: '1px solid black',
      },
    },
    createBy: {
      fontSize: 11,
      color: '#6B3FA0',
      fontFamily: '"Helvetica"',
      fontWeight: 600,
      marginRight: 20,
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
        color: '#000',
      },
    },
    createAt: {
      fontSize: 11,
      fontFamily: '"Helvetica"',
      textTransform: 'capitalize',
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
        marginTop: 0,
      },
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
    },
  })
);

export default function SideMap(props) {
  dayjs.extend(relativeTime);
  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const { postsId, postImage, id, createdAt, title, body, postedBy } =
    props.topic;

  return (
    <div>
      <Link key={postsId} className={classes.linkClass} href={`/story/${id}`}>
        <a>
          <Grid className={classes.recentCont} key={postsId} container>
            <img
              src={postImage}
              alt='recent-img'
              className={classes.recentImg}
            />
            <div className={classes.ContDetails}>
              <Typography variant='body2' className={`${classes.bottomNews} py-2 text-xl cinzel font-bold tracking-wide`}>
                {title}
              </Typography>
              <Typography
                variant='body2'
                className={classes.subnews}
                style={{ margin: '.5rem 0' }}
              >
                {body.substring(0, 50)}...
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
          </Grid>
        </a>
      </Link>
    </div>
  );
}
