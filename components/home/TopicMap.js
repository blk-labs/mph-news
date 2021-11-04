import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Material
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,
    gridCont: {
      marginTop: '2rem',
    },
    mainCont: {
      display: 'flex',
      flexDirection: 'column',
      marginRight: '1.5rem',
      [theme.breakpoints.down('xs')]: {
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
      [theme.breakpoints.down('xs')]: {
        display: 'inherit',
      },
    },
    mainImg: {
      minWidth: 683,
      maxWidth: 683,
      height: '558px',
      [theme.breakpoints.down('md')]: {
        minWidth: 683,
        maxWidth: 683,
      },
      [theme.breakpoints.down('xs')]: {
        minWidth: '100%',
        height: '100%',
      },
    },
    subImg: {
      height: '350px',
      objectFit: 'cover',
      [theme.breakpoints.down('md')]: {
        height: '250px',
        width: '100%',
      },
      [theme.breakpoints.down('xs')]: {
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
      [theme.breakpoints.down('xs')]: {
        margin: 0,
      },
    },
    groupImg: {
      minWidth: 260,
      maxWidth: 260,
      height: 250,
      objectFit: 'cover',
      marginRight: '.5rem',
      [theme.breakpoints.down('xs')]: {
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
      [theme.breakpoints.down('xs')]: {
        fontSize: 24,
      },
    },
    subnews: {
      color: 'black',
      fontSize: 15,
      margin: '10px 0',
      letterSpacing: 0,
      fontFamily: '"Helvetica Light"',
      fontWeight: 300,
      [theme.breakpoints.down('xs')]: {
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
      [theme.breakpoints.down('xs')]: {
        fontSize: 15,
      },
    },
    bottomDetails: {
      margin: '10px 0 0',
      fontSize: 15,
      letterSpacing: 0,
      fontWeight: 300,
      fontFamily: '"Helvetica Light"',
      textTransform: 'initial',
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    newsGroup: {
      marginBottom: 40,
      padding: '0 .5rem',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    btnClass: {
      width: '100%',
      textAlign: 'center',
      margin: '3rem auto 5rem',
    },
    createBy: {
      fontSize: 15,
      color: '#6B3FA0',
      marginRight: 20,
      fontFamily: '"Helvetica Bold"',
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
        color: '#000',
      },
    },
    createAt: {
      textTransform: 'capitalize',
      fontFamily: '"Helvetica"',
      [theme.breakpoints.down('xs')]: {
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
    <Grid item className={classes.gridCont}>
      <Typography
        variant='body1'
        style={{
          fontFamily: '"Playfair Display"',
          fontWeight: 900,
          fontSize: 36,
          color: '#5BA66E',
          textTransform: 'capitalize',
          marginBottom: 20,
        }}
      >
        {props.topic}
      </Typography>
      <Grid justify='flex-start' className={classes.newsCont}>
        {news
          .filter((data, i) => i === 0)
          .map((data, i) => (
            <Link
              key={i}
              className={classes.linkClass}
              href={`/story/${data.id}`}
            >
              <a>
                <Grid item xs={12} md={12} className={classes.mainCont} key={i}>
                  <div className={classes.mainImg}>
                    <img
                      src={data.postImage}
                      alt={`${props.topic} image`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  <Typography className={classes.newsTitle}>
                    {data.title}
                  </Typography>
                  <Typography className={classes.subnews}>
                    {data.subTitle}
                  </Typography>
                  <div
                    style={{
                      marginBottom: 30,
                    }}
                  >
                    <div className='flex sm:justify-inherit items-center capitalize mt-2'>
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
              </a>
            </Link>
          ))}
        {news
          .filter((data, i) => i === 1)
          .map((data, i) => (
            <Link
              key={i}
              className={classes.linkClass}
              href={`/story/${data.id}`}
            >
              <a>
                <Grid item xs={12} md={4} className={classes.subCont} key={i}>
                  <img
                    src={data.postImage}
                    className={classes.subImg}
                    alt={`${props.topic} image`}
                  />
                  <Typography className={classes.newsTitle}>
                    {data.title}
                  </Typography>
                  <Typography className={classes.subnews}>
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
                        fontSize: 15,
                        color: '#6B3FA0',
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
                      }}
                      variant='caption'
                    >
                      {dayjs(data.createdAt).fromNow()}
                    </Typography>
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
                        className={classes.bottomNews}
                      >
                        {data.title}
                      </Typography>
                      <Typography
                        className={classes.bottomDetails}
                        variant='body1'
                      >
                        {data.subTitle}
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
