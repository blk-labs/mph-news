import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Subscribe from '../layout/Subscribe';
// Material
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,
    titleCont: {
      fontWeight: 900,
      fontSize: 36,
      color: '#5BA66E',
      fontFamily: '"Playfair Display"',
      margin: '3rem 0 0.5rem',
      [theme.breakpoints.down('md')]: {
        fontSize: 24,
        margin: '0rem 0 0.5rem',
      },
    },
    gridCont: {
      display: 'flex',
      backgroundColor: 'white',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
      },
    },

    recentCont: {
      width: 500,
      textTransform: 'capitalize',
      marginTop: '.5rem',
      marginBottom: '1.5rem',
      display: 'flex',
      width: '100%',
      flexWrap: 'inherit',
    },
    recentImg: {
      marginRight: '1.5rem',
      objectFit: 'cover',
      minWidth: '280px',
      height: '200px',
      maxWidth: '280px',
      [theme.breakpoints.down('xs')]: {
        marginRight: '.5rem',
        minWidth: '160px',
        height: '126px',
        maxWidth: '160px',
      },
    },
    topic: {
      color: '#fff',
      fontWeight: 400,
      fontSize: 12,
      textTransform: 'capitalize',
      width: 'fit-content',
      padding: '5px',
      backgroundColor: '#545454',
    },
    newsTitle: {
      fontWeight: 900,
      fontSize: 22,
      margin: 'auto 0 10px 0',
      lineHeight: 1.2,
      textTransform: 'initial',
      letterSpacing: -0.2,
      fontFamily: '"Playfair Display"',
      [theme.breakpoints.down('xs')]: {
        fontSize: 15,
      },
    },
    subnews: {
      margin: '10px 0 0',
      fontSize: 15,
      letterSpacing: 0,
      fontWeight: 300,
      textTransform: 'initial',
      fontFamily: '"Helvetica Light"',
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    createBy: {
      fontSize: 15,
      color: '#6B3FA0',
      fontFamily: '"Helvetica Bold"',
      marginRight: 20,
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
        color: '#000',
      },
    },
    createAt: {
      fontFamily: '"Helvetica"',
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

export default function RecentNews(props) {
  const news = props.news
    .filter((n, i) => n.important === true && i > 4)
    .slice(0, 4);
  dayjs.extend(relativeTime);

  const theme = useTheme();
  const classes = useStyles(props);
  const matchesLG = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <div>
      <Typography variant='h5' className={classes.titleCont}>
        Trending Topics
      </Typography>
      <Grid className={classes.gridCont}>
        <div className='mr-0 lg:mr-4'>
          {news.map((data, i) => (
            <Link
              key={i}
              className={classes.linkClass}
              href={`/story/${data.id}`}
            >
              <a>
                <Grid className={classes.recentCont}>
                  <img
                    src={data.postImage}
                    alt='recent-img'
                    className={classes.recentImg}
                  />
                  <div className={classes.body}>
                    <Typography variant='h5' className={classes.topic}>
                      {data.topic}
                    </Typography>
                    <Typography variant='body1' className={classes.newsTitle}>
                      JUST IN: {data.title}
                    </Typography>
                    <Typography className={classes.subnews}>
                      {data.subTitle}
                    </Typography>
                    <div className='flex justify-inherit items-center capitalize mt-2'>
                      <Typography
                        className={classes.createBy}
                        variant='caption'
                      >
                        {data.postedBy}
                      </Typography>
                      <Typography
                        className={classes.createAt}
                        variant='caption'
                      >
                        {dayjs(data.createdAt).fromNow()}
                      </Typography>
                    </div>
                  </div>
                </Grid>
                {news.length !== i + 1 ? (
                  <hr className={classes.newsHr} />
                ) : null}
              </a>
            </Link>
          ))}
        </div>
        <div>
          <Subscribe />
        </div>
      </Grid>
    </div>
  );
}
