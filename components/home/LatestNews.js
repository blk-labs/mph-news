import React from 'react';
import Link from 'next/link';
import Carousel from '@brainhubeu/react-carousel';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import '@brainhubeu/react-carousel/lib/style.css';

// Material
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,
    gridCont: {
      marginTop: '30px',
      position: 'relative',
      //   display: 'flex',
      //   flexDirection:'row',
      [theme.breakpoints.up('md')]: {
        // marginTop: '10.5vh',
      },
    },

    newsCont: {
      // marginTop: '.5rem',

      [theme.breakpoints.up('sm')]: {
        // marginRight: '1rem',
      },
    },
    imgClass: {
      width: '100vw',
      height: '700px',
      objectFit: 'cover',
      [theme.breakpoints.down('sm')]: {
        height: '300px',
        display: 'block',
        margin: 'auto',
      },
    },
    newsTitle: {
      width: 500,
      marginLeft: 95,
      marginBottom: 5,
    },
    newsSubTitle: {},
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

    smGrid: {
      margin: 'auto 1rem',
      minWidth: 225,
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    smImg: {
      width: 'auto',
      height: 125,
      objectFit: 'cover',
    },
  })
);

export default function LatestNews(props) {
  const news = props.news.filter((n) => n.important === true);
  dayjs.extend(relativeTime);

  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const matchesLG = useMediaQuery(theme.breakpoints.up('lg'));
  // const { loading } = props.data;

  const lText = (
    <span className={classes.fadeText}>
      {/* <Typography style={{ fontFamily: '"Open Sans"', fontWeight: 'bold' }} variant={matchesLG ? 'h3' : 'h4'}><span style={{ fontSize: '120%' }}>B</span>reaking <span style={{ fontSize: '120%' }}>N</span>ews</Typography> */}
    </span>
  );

  return (
    <>
      <Grid item xs={12} md={0} className={classes.gridCont}>
        {matches ? lText : null}
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
                          <Typography variant='body1' className={classes.title}>
                            {data.title}
                          </Typography>
                        </div>
                        <div className={classes.newsSubTitle}>
                          <Typography
                            variant='body1'
                            style={{
                              color: '#fff',
                              fontSize: 14,
                              backgroundColor: 'black',
                              display: 'inline',
                              padding: 5,
                              padding: 5,
                              margin: '10px 85px',
                            }}
                          >
                            {data.subTitle}
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
                  <div style={{ marginTop: '.5rem', overflow: 'hidden' }}>
                    <img
                      src={data.postImage}
                      alt='news'
                      className={classes.imgClass}
                    />
                    <h2
                      style={{
                        letterSpacing: '1.25px',
                        fontSize: '1.85rem',
                        padding: '0 1rem',
                        fontFamily: 'Helvetica Compressed',
                      }}
                    >
                      {data.title}
                    </h2>
                    <hr className={classes.smHr} />
                  </div>
                </a>
              </Link>
            ))
        )}
        {!matches ? (
          <div
            style={{
              position: 'relative',
              display: 'flex',
              width: '100%',
              overflow: 'auto',
              paddingTop: '1.1rem',
              marginBottom: '5rem',
            }}
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
                      <Typography variant='caption'>{data.title}</Typography>
                    </div>
                  </a>
                </Link>
              ))}
          </div>
        ) : null}
      </Grid>
    </>
  );
}
