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
    },
    gridCont: {
      display: 'flex',
      backgroundColor: 'white',
      [theme.breakpoints.up('md')]: {},
      [theme.breakpoints.up('lg')]: {},
    },
    fadeText: {
      color: 'rgba(0,0,0,.1)',
      textTransform: 'uppercase',
      [theme.breakpoints.up('lg')]: {
        position: 'absolute',
        zIndex: -1,
        top: '-10vh',
      },
      [theme.breakpoints.down('sm')]: {
        top: '-15vh',
      },
      [theme.breakpoints.down('xs')]: {
        top: '-4.5vh',
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
    },
    topic: {
      color: '#fff',
      fontWeight: 400,
      fontSize: 12,
      textTransform: 'capitalize',
      // border: '1.5px solid #B7EB8F',
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
    },
    subnews: {
      margin: '10px 0 0',
      fontSize: 15,
      letterSpacing: 0,
      fontWeight: 300,
      textTransform: 'initial',
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
        <div
          style={{
            marginRight: 20,
          }}
        >
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
                    <Typography
                      style={{ marginTop: '20px', textTransform: 'uppercase' }}
                      variant='caption'
                    >
                      {dayjs(data.createdAt).fromNow()}
                    </Typography>
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
