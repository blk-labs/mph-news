import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Subscribe from '../layout/Subscribe';
// Material
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles, createStyles, useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,
    titleCont: {
      fontWeight: 900,
      fontSize: 36,
      color: '#5BA66E',
      fontFamily: '"Playfair Display"',
      margin: '3rem 0 1.5rem',
      [theme.breakpoints.down('md')]: {
        fontSize: 24,
      },
      [theme.breakpoints.down('sm')]: {
        margin: '0rem 0 1.5rem',
      },
    },
    leftColumn: {
      [theme.breakpoints.down('sm')]: {
        margin: 0,
        '& > .MuiGrid-item': {
          padding: 0,
        },
      },
    },
    gridCont: {
      // display: 'flex',
      marginTop: '1rem',
      marginBottom: '1rem',
      backgroundColor: 'white',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
      },
    },

    recentCont: {
      width: 500,
      textTransform: 'capitalize',
      margin: '1rem 0',
      display: 'flex',
      width: '100%',
      flexWrap: 'inherit',
    },
    recentImg: {
      marginRight: '1rem',
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
      fontSize: 11,
      color: '#6B3FA0',
      fontFamily: '"Helvetica"',
      fontWeight: 600,
      marginRight: 20,
      [theme.breakpoints.down('xs')]: {
        color: '#000',
      },
    },
    createAt: {
      fontFamily: '"Helvetica"',
      fontSize: 11,
      textTransform: 'capitalize',
      [theme.breakpoints.down('xs')]: {
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

  return (
    <div>
      <Typography variant='h5' className={`${classes.titleCont} mb-5 cinzel font-bold text-4xl`}>
        Trending Topics
      </Typography>
      <Grid
        container
        item
        container
        // spacing={2}
        classes={{
          root: classes.leftColumn,
        }}
        className={classes.gridCont}
      >
        <Grid xs={12} lg={8} className='lg:pr-6 sm:pr-0'>
          {news.map((data, i) => (
            <Link key={i} href={`/story/${data.id}`}>
              <a>
                <Grid className={classes.recentCont}>
                  <img
                    src={data.postImage}
                    alt='recent-img'
                    className={classes.recentImg}
                  />
                  <div className={`${classes.body} flex flex-col items-start`}>
                    <Typography variant='h5' className={`${classes.topic} mb-2 text-xs font-medium px-8`}>
                      {data.topic}
                    </Typography>
                    <Typography variant='body1' className={`${classes.newsTitle} mb-2 cinzel font-bold text-xl`}>
                      JUST IN: {data.title}
                    </Typography>
                    <Typography className={`${classes.subnews} text-gray-700 flex-grow`}>
                      {data.subTitle}
                    </Typography>
                    <div className='flex justify-inherit items-baseline capitalize mt-2'>
                      <Typography
                        className={`${classes.createBy} mr-2 text-xs`}
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
                {news.length !== i + 1 ? <hr /> : null}
              </a>
            </Link>
          ))}
        </Grid>
        <Grid xs={12} lg={4}>
          <Subscribe />
        </Grid>
      </Grid>
    </div>
  );
}
