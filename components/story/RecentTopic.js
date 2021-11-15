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
      fontSize: 24,
      fontFamily: '"Playfair Display"',
      margin: '3rem 0 1.5rem',
      [theme.breakpoints.down('md')]: {
        fontSize: 24,
      },
      [theme.breakpoints.down('sm')]: {
        margin: '0rem 0 1.5rem',
      },
    },

    gridCont: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
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
      flexDirection: 'column',

      width: '100%',
      flexWrap: 'inherit',
    },
    recentImg: {
      objectFit: 'cover',
      minWidth: '278px',
      height: '197px',
      maxWidth: '278px',
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
      fontSize: 15,
      margin: '1rem 0 10px 0',
      width: '278px',
      lineHeight: 1.2,
      textTransform: 'initial',
      letterSpacing: -0.2,
      fontFamily: '"Playfair Display"',
      [theme.breakpoints.down('xs')]: {
        fontSize: 15,
      },
    },
    createAt: {
      fontFamily: '"Helvetica"',
      fontSize: 15,
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
    <Container>
      <Typography variant='h5' className={classes.titleCont}>
        Recent News
      </Typography>
      <div className={classes.gridCont}>
        {news.map((data, i) => (
          <Link key={i} href={`/story/${data.id}`}>
            <a>
              <div className={classes.recentCont}>
                <img
                  src={data.postImage}
                  alt='recent-img'
                  className={classes.recentImg}
                />
                <div className={classes.body}>
                  <Typography variant='body1' className={classes.newsTitle}>
                    {data.title}
                  </Typography>
                  <Typography className={classes.createAt} variant='caption'>
                    {dayjs(data.createdAt).fromNow()}
                  </Typography>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </Container>
  );
}
