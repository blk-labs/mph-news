import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Material
import Typography from '@material-ui/core/Typography';

import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';

// Comps
import Subscribe from '../layout/Subscribe';

const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,
    CustomNews: {
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    titleCont: {
      fontWeight: 900,
      textTransform: 'initial',
      fontSize: 15,
      fontFamily: '"Playfair Display"',
    },
    dettails: {
      marginLeft: '1rem',
    },
    timeUpload: {
      color: '#a8a8a8',
      textTransform: 'capitalize',
      fontSize: 12,
      fontFamily: '"Helvetica"',
      fontWeight: 400,
    },
    imgClass: {
      objectFit: 'cover',
      minWidth: '70px',
      height: '70px',
      maxWidth: '70px',
      borderRadius: '50%',
      margin: 'auto',

      [theme.breakpoints.down('sm')]: {
        height: '150px',
      },
      [theme.breakpoints.down('xs')]: {
        height: '100px',
      },
    },
    gridClass: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: '45px',
    },
  })
);

export default function CustomNews(props) {
  const news = props.news.filter((n) => n.topic !== 'video');
  const recommend = news.filter((n) => n.editors_pick === true).slice(0, 4);
  const liked = news
    .sort((a, b) => b.commentCount - a.commentCount)
    .slice(0, 4);
  dayjs.extend(relativeTime);

  const theme = useTheme();
  const classes = useStyles(props);

  return (
    <div
      style={{
        position: 'absolute',
        backgroundColor: '#fff',
        width: '387px',
        margin: '7% 0',
        padding: '45px 20px',
        right: '0',
        left: '60%',
        height: 560,
      }}
      className={classes.CustomNews}
    >
      {liked.map((data, i) => (
        <div className={classes.gridClass} key={i}>
          <Link className={classes.linkClass} href={`/story/${data.id}`}>
            <a style={{ display: 'inherit' }}>
              <img
                src={data.postImage}
                className={classes.imgClass}
                alt='recommended'
              />
              <div className={classes.dettails}>
                <Typography variant='button' className={classes.timeUpload}>
                  {dayjs(data.createdAt).fromNow()}
                </Typography>
                <Typography className={classes.titleCont}>
                  {data.title}
                </Typography>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}
