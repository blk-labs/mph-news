import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Material
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles, createStyles, useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,
    gridCont: {
      [theme.breakpoints.down('sm')]: {
        padding: '0px!important'
      },
    },
    mainCont: {
      display: 'flex',
      flexDirection: 'column',
      marginRight: '1.5rem',
      maxWidth: '100%',
      '&: > div': {

      },
      [theme.breakpoints.down('sm')]: {
        marginRight: '0',
      },
    },
    subCont: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '100%',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    newsCont: {
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        display: 'inherit',
      },
    },
    mainImg: {
      minWidth: 683,
      height: 'auto',
      [theme.breakpoints.down('md')]: {
        minWidth: 683,
        maxWidth: 683,
      },
      [theme.breakpoints.down('sm')]: {
        minWidth: '100%',
        height: '100%',
      },
    },
    imgMain: {
      minWidth: '100%',
      maxWidth: '100%',
      height: 'auto',
      objectFit: 'cover',
    },
    subImg: {
      height: '350px',
      objectFit: 'cover',
      [theme.breakpoints.down('md')]: {
        height: '250px',
        width: '100%',
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        height: '250px',
      },
    },
    groupCont: {
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'start',
      margin: '20px 0',
      cursor: 'pointer',
      textTransform: 'capitalize',
    },
    ContDetails: {
      alignSelf: 'flex-end',
      margin: '0 20px',
      [theme.breakpoints.down('sm')]: {
        margin: 0,
      },
    },
    groupImg: {
      minWidth: 260,
      maxWidth: 260,
      height: 250,
      objectFit: 'cover',
      marginRight: '.5rem',
      [theme.breakpoints.down('sm')]: {
        minWidth: 160,
        maxWidth: 160,
        height: 126,
      },
    },
    newsTitle: {
      fontWeight: 900,
      fontSize: 36,
      textTransform: 'initial',
      fontFamily: '"Playfair Display"',
      lineHeight: 1.1,
      paddingTop: 25,
      letterSpacing: -1,
      [theme.breakpoints.down('sm')]: {
        fontSize: '24px!important',
        lineHeight: '32px!important',
        marginTop: '1rem!important'
      },
    },
    subnews: {
      color: 'black',
      fontSize: 15,
      margin: '10px 0',
      letterSpacing: 0,
      fontFamily: '"Helvetica Light"',
      fontWeight: 300,
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      [theme.breakpoints.down('sm')]: {
        fontSize: 13,
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
      [theme.breakpoints.down('sm')]: {
        fontSize: '15px!important',
        lineHeight: '18px!important',
        paddingBottom: '0!important',
      },
    },
    bottomDetails: {
      margin: '10px 0 0',
      fontSize: 15,
      letterSpacing: 0,
      fontWeight: 300,
      fontFamily: '"Helvetica Light"',
      textTransform: 'initial',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    newsGroup: {
      marginBottom: 40,
      padding: '0 .5rem',
      [theme.breakpoints.down('sm')]: {
        // flexDirection: 'column',
      },
    },
    btnClass: {
      width: '100%',
      textAlign: 'center',
      margin: '3rem auto 5rem',
    },
    createBy: {
      fontSize: 15,
      color: '#6B3FA0!important',
      marginRight: '20px!important',
      fontWeight: 600,
      fontFamily: '"Helvetica"',
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
        color: '#000',
      },
    },
    createAt: {
      textTransform: 'capitalize',
      fontFamily: '"Helvetica"',
      fontSize: 15,
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
        marginTop: 0,
      },
    },
  })
);

export default function TopicMap(props) {
  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const news = props.pass;

  dayjs.extend(relativeTime);

  return (
    <Grid container item className={`${classes.gridCont} py-8`}>
      <Typography
        variant='body1'
        className="cinzel font-bold tracking-wide text-4xl"
        style={{
          fontWeight: 900,
          color: '#5BA66E',
          textTransform: 'capitalize',
          marginBottom: 20,
        }}
      >
        {props.topic}
      </Typography>
      <Grid justify='flex-start' className={`${classes.newsCont} `}>
        {news
          .filter((data, i) => i === 0)
          .map((data, i) => (
            <Link
              key={i}
              className={classes.linkClass}
              href={`/story/${data.id}`}
            >
              <a>
                <Grid item xs={12} lg={12} className={`${classes.mainCont} flex-col`} key={i}>
                  <div className="w-full flex">
                    <div className={`${classes.mainImg} mainImg w-4/6 lg:pr-6`}>
                      <img
                        src={data.postImage}
                        alt={`${props.topic} image`}
                        className={classes.imgMain}
                      />
                      <Typography className={`${classes.newsTitle} lg:w-4/6 cinzel font-bold tracking-wide text-3xl pt-5`}>
                        {data.title}
                      </Typography>
                      <Typography className={`${classes.subnews} my-4 lg:w-4/6`}>
                        {data.subTitle}
                      </Typography>
                      <div
                        style={{
                          marginBottom: 30,
                        }}
                      >
                        <Typography
                          style={{
                            textTransform: 'capitalize',
                            marginRight: 20,
                            marginBotttom: 40,
                            fontWeight: 600,
                            fontSize: 15,
                            color: '#6B3FA0',
                            fontFamily: '"Helvetica"',
                          }}
                          variant='caption'
                        >
                          {data.postedBy}
                        </Typography>
                        <Typography
                          variant='caption'
                          style={{
                            margin: '0 0 1rem',
                            fontSize: 15,
                            fontFamily: '"Helvetica"',
                          }}
                        >
                          {dayjs(data.createdAt).fromNow()}
                        </Typography>
                      </div>
                    </div>
                    {news
                      .filter((data, i) => i === 1)
                      .map((data, i) => (
                        <div className="mainSub" key={data.id}>
                          <Link
                            key={i}
                            className={`${classes.linkClass} w-2/6 lg:pl-6`}
                            href={`/story/${data.id}`}
                          >
                            <Grid item xs={12} lg={2} className={`${classes.subCont} flex-col w-full mx-0 max-w-full`} key={i}>
                              <img
                                src={data.postImage}
                                className={classes.subImg}
                                alt={`${props.topic} image`}
                              />
                              <Typography className={`${classes.newsTitle} cinzel font-bold text-3xl tracking-wide`}>
                                {data.title}
                              </Typography>
                              <Typography className={`${classes.subnews} my-4`}>
                                {data.subTitle}
                              </Typography>
                            </Grid>
                          </Link>
                        </div>
                      ))}
                  </div>
                </Grid>
              </a>
            </Link>
          ))}
      </Grid>
      <Grid spacing={2} container className={classes.newsGroup}>
        {news
          .filter((data, i) => i > 1)
          .map((data, i) => (
            <Link
              key={i}
              className={classes.linkClass}
              href={`/story/${data.id}`}
            >
              <Grid xs={12} lg={6}>
                <a>
                  {props.pass.length !== i + 1 ? (
                    <hr
                      style={{
                        borderColor: 'rgba(0,0,0,.25)',
                        borderBottom: 0,
                        marginRight: 40,
                      }}
                    />
                  ) : null}
                  <div flex className={classes.groupCont} key={i}>
                    <img
                      src={data.postImage}
                      className={classes.groupImg}
                      alt={`${props.topic} image`}
                    />
                    <div className={classes.ContDetails}>
                      <Typography
                        variant='body2'
                        className={`${classes.bottomNews} my-4 cinzel font-bold text-xl tracking-wide`}
                      >
                        {data.title}
                      </Typography>
                      <Typography
                        className={`${classes.bottomDetails} my-4`}
                        variant='body1'
                      >
                        {data.subTitle.length > 100 ? data.subTitle.substring(0, 100) + "..." : data.subTitle}
                      </Typography>
                      <div className='capitalize mt-2'>
                        <Typography
                          className={classes.createAt}
                          variant='caption'
                        >
                          {dayjs(data.createdAt).fromNow()}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </a>
              </Grid>
            </Link>
          ))}
      </Grid>
    </Grid>
  );
}
