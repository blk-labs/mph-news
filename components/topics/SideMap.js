import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Material
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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
      height: 'auto',
      [theme.breakpoints.down('md')]: {
        height: '350px',
      },
      [theme.breakpoints.down('xs')]: {
        height: '270px',
      },
    },
    bottomNews: {
      fontWeight: 900,
      fontSize: 22,
      margin: '10px 0 0',
      lineHeight: 1.2,
      textTransform: 'initial',
      letterSpacing: -0.2,
      fontFamily: '"Playfair Display"',
      [theme.breakpoints.down('xs')]: {
        fontSize: '24px',
      },
    },
    subnews: {
      color: 'black',
      fontSize: 15,
      margin: '10px 0',
      letterSpacing: 0,
      fontWeight: 300,
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
      fontSize: 15,
      color: '#6B3FA0',
      marginRight: 20,
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
        color: '#000',
      },
    },
    createAt: {
      textTransform: 'capitalize',
      [theme.breakpoints.down('xs')]: {
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
              <Typography variant='body2' className={classes.bottomNews}>
                {title}
              </Typography>
                <Typography
                  variant='body2'
                  className={classes.subnews}
                  style={{ margin: '.5rem 0' }}
                >
                  {body.substring(0, 150)}...
                </Typography>
              <Typography variant='caption' className={classes.contRead}>
                Continue reading
              </Typography>
              <div className='md:flex md:items-center sm:justify-inherit capitalize mt-2 hidden'>
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
