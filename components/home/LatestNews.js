import React from 'react';
import Link from 'next/link';
import Carousel from '@brainhubeu/react-carousel';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import '@brainhubeu/react-carousel/lib/style.css';

// Material
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles, createStyles, useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';

const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,
    gridCont: {
      marginTop: '30px',
      position: 'relative',
    },
    imgClass: {
      width: '100vw',
      height: '700px',
      objectFit: 'cover',
      [theme.breakpoints.down('md')]: {
        // marginBottom: 30,
      },

      [theme.breakpoints.down('sm')]: {
        height: '100%',
        display: 'block',
        margin: 'auto',
        objectFit: 'initial',
      },
    },
    newsTitle: {
      width: 500,
      marginLeft: 70,
      marginBottom: 5,
      [theme.breakpoints.down('md')]: {
        margin: '0 20px',
      },
      [theme.breakpoints.down('sm')]: {
        width: '100px',
      },
    },
    newsSubTitle: {
      margin: '5px 60px',
      [theme.breakpoints.down('md')]: {
        margin: '5px 20px',
      },
    },
    resNewsTitle: {
      position: 'absolute',
      margin: 20,
      bottom: 0,
      [theme.breakpoints.down('md')]: {
        width: 400,
      },
      [theme.breakpoints.down('xs')]: {
        width: '300px',
      },
    },
    title: {
      marginBottom: '.5rem',
      color: '#fff',
      backgroundColor: 'black',
      display: 'inline',
      whiteSpace: 'pre-wrap',
      lineHeight: '45px',
      padding: 5,
      paddingLeft: 0,
      boxShadow: '-10px 0 0 black',
      webkitBoxShadow: '-10px 0 0 black',
      fontFamily: '"Playfair Display"',
      fontWeight: 900,
      fontSize: 36,
      [theme.breakpoints.down('sm')]: {
        letterSpacing: '.5px',
      },
    },
    resTitle: {
      marginBottom: '.5rem',
      color: '#fff',
      backgroundColor: 'black',
      display: 'inline',
      whiteSpace: 'pre-wrap',
      lineHeight: '45px',
      padding: 5,
      paddingLeft: 0,
      boxShadow: '-10px 0 0 black',
      webkitBoxShadow: '-10px 0 0 black',
      fontFamily: '"Playfair Display"',
      fontWeight: 900,
      fontSize: 36,
      [theme.breakpoints.down('sm')]: {
        letterSpacing: '.5px',
        fontSize: 24,
        lineHeight: '35px',
      },
    },
    smGrid: {
      marginBottom: '1rem',
      display: 'flex',
      flexDirection: 'column',
    },
    smImg: {
      width: '177px',
      height: '112px',
      objectFit: 'cover',
    },
    containerClass: {
      position: 'relative',
      display: 'flex!important',
      width: '100%',
      overflow: 'auto',
      paddingTop: '1.1rem',
      marginBottom: '2rem',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'space-evenly',
        paddingLeft: '0!important',
        paddingRight: '0!important',
      }
    }
  })
);

export default function LatestNews(props) {
  const news = (props.news || []).filter((n) => n.important === true);
  dayjs.extend(relativeTime);

  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const matchesLG = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <>
      <Grid item xs={12} md={0} className={`${classes.gridCont} my-12`}>
        {matches ? (
          <Carousel
            autoPlay={7500}
            infinite={true}
            style={{
              marginRight: '20px',
            }}
          >
            {news.splice(0, 5).map((data, i) => (
              <Link
                key={i}
                className={classes.linkClass}
                href={`/story/${data.id}`}
              >
                <a>
                  <div container className={classes.newsCont}>
                    {matches ? (
                      <div
                        style={{
                          paddingRight: '.5rem',
                          position: 'absolute',
                          bottom: 30,
                        }}
                      >
                        <div className={classes.newsTitle}>
                          <Typography variant='body1' className={`${classes.title} text-4xl cinzel font-bold leading-snug`}>
                            {data.title}
                          </Typography>
                        </div>
                        <div className={`${classes.newsSubTitle} pt-1`}>
                          <Typography
                            variant='body1'
                            style={{
                              color: '#fff',
                              fontSize: 12,
                              backgroundColor: 'black',
                              display: 'inline',
                              padding: 5,
                              padding: 5,
                              fontFamily: '"Helvetica Light"',
                            }}
                          >
                            {dayjs(data.createdAt).fromNow()}
                          </Typography>
                        </div>
                      </div>
                    ) : null}
                    <div style={{ overflow: 'hidden' }}>
                      <img
                        src={data.postImage}
                        alt='news'
                        className={classes.imgClass}
                      />
                      {!matches ? (
                        <h2
                          style={{
                            fontSize: '1.85rem',
                            padding: '0 1rem',
                            fontFamily: 'Helvetica Compressed',
                          }}
                        >
                          {data.title}
                        </h2>
                      ) : null}
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </Carousel>
        ) : (
          news
            .filter((data, i) => i === 0)
            .map((data, i) => (
              <Link
                key={i}
                className={classes.linkClass}
                href={`/story/${data.id}`}
              >
                <a>
                  <div
                    className='relative'
                    style={{
                      marginTop: '.5rem',
                      overflow: 'hidden',
                    }}
                  >
                    <div className={classes.resNewsTitle}>
                      <Typography variant='body1' className={classes.resTitle}>
                        {data.title}
                      </Typography>
                    </div>
                    <img
                      src={data.postImage}
                      alt='news'
                      className={classes.imgClass}
                    />
                    <hr className={classes.smHr} />
                  </div>
                </a>
              </Link>
            ))
        )}
        {!matches ? (
          <Container
            maxWidth='lg'
            className={classes.containerClass}
          >
            {news
              .filter((data, i) => i > 0)
              .slice(0, 4)
              .map((data, i) => (
                <Link
                  key={i}
                  className={classes.linkClass}
                  href={`/story/${data.id}`}
                >
                  <a>
                    <div className={classes.smGrid}>
                      <img
                        src={data.postImage}
                        alt='news'
                        className={classes.smImg}
                      />
                      <Typography
                        variant='caption'
                        style={{
                          fontSize: 15,
                          width: '177px',
                          fontWeight: 900,
                          lineHeight: '20px',
                          margin: '.5rem 0 0',
                          fontFamily: '"Playfair Display"',
                        }}
                      >
                        {data.title}
                      </Typography>
                      <Typography
                        variant='caption'
                        style={{
                          fontFamily: '"Helvetica"',
                          margin: '.5rem 0 0',
                        }}
                        className="text-xs font-medium"
                      >
                        {dayjs(data.createdAt).fromNow()}
                      </Typography>
                    </div>
                  </a>
                </Link>
              ))}
          </Container>
        ) : null}
      </Grid>
    </>
  );
}
