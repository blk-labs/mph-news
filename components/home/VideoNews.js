import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Material
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles, createStyles, useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// Comps

const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,
    videoCont: {
      color: 'white',
      cursor: 'pointer',
      margin: '0rem auto 5rem',
      padding: '2rem 0 3rem',
      [theme.breakpoints.down('sm')]: {
        padding: '0px!important'
      },
    },
    videoClass: {
      width: '100%',
      height: '660px',
      border: 0,

      [theme.breakpoints.down('md')]: {
        paddingLeft: '0',
        width: '100%',
      },
      [theme.breakpoints.down('xs')]: {
        paddingLeft: '0',
        height: '300px',
      },
    },
    videoBottom: {
      width: '100%',
      height: '200px',
      border: 0,
      [theme.breakpoints.down('xs')]: {
        height: '200px',
      },
    },
    upTitle: {
      position: 'absolute',
      bottom: '100px',
      marginLeft: 50,
      [theme.breakpoints.down('xs')]: {
        bottom: '60px',
        marginLeft: 15,
      },
    },
    linkTitle: {
      fontFamily: '"Playfair Display"',
      fontWeight: 900,
      fontSize: 36,
      lineHeight: 1.1,
      letterSpacing: -1,
      [theme.breakpoints.down('xs')]: {
        fontSize: 24,
      },
    },
    btmTitle: {
      color: 'black',
      padding: '1rem 0 0',
      lineHeight: 1.1,
      fontSize: 22,
      fontWeight: 'bold',
      textTransform: 'capitalize',
      fontFamily: '"Playfair Display"',
      [theme.breakpoints.down('xs')]: {
        fontSize: '15px',
        padding: '1rem 0 0.3rem',
      },
    },
    createAt: {
      textTransform: 'capitalize',
      color: 'black',
      fontSize: 15,
      fontFamily: '"Helvetica"',
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
        marginTop: 0,
      },
    },
  })
);

export default function VideoNews(props) {
  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const matchesLG = useMediaQuery(theme.breakpoints.up('lg'));

  const news = props.news.filter((n) => n.topic === 'video').splice(0, 5);
  dayjs.extend(relativeTime);

  return (
    <React.Fragment>
      <Grid container className={classes.videoCont}>
        <Container maxWidth='lg'>
          {news
            .filter((data, i) => i === 0)
            .map((data, i) => (
              <div style={{ padding: '2rem 0', position: 'relative' }} key={i}>
                <div className={classes.upTitle}>
                  <Typography className={`${classes.linkTitle} cinzel text-4xl`} variant='h4'>
                    {data.title}
                  </Typography>
                  <Typography
                    variant='caption'
                    style={{ textTransform: 'capitalize', fontSize: 15 }}
                  >
                    {dayjs(data.createdAt).fromNow()}
                  </Typography>
                </div>
                <div>
                  <iframe
                    className={classes.videoClass}
                    src={data.link}
                  ></iframe>
                </div>
              </div>
            ))}
          <Grid spacing={4} container>
            {news
              .filter((data, i) => i > 0)
              .map((data, i) => (
                <Grid className={classes.btmCont} key={i} item xs={12} sm={3}>
                  <iframe
                    className={classes.videoBottom}
                    src={`${data.link}?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=0`}
                  ></iframe>
                  <Typography className={`${classes.btmTitle} cinzel font-bold`} variant='h6'>
                    {data.title}
                  </Typography>
                  <div className='capitalize'>
                    <Typography className={classes.createAt} variant='caption'>
                      {dayjs(data.createdAt).fromNow()}
                    </Typography>
                  </div>
                </Grid>
              ))}
          </Grid>
        </Container>
      </Grid>
    </React.Fragment>
  );
}
