import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Material
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { makeStyles, createStyles, useTheme } from '@mui/styles';

// Comps
import Subscribe from '../layout/Subscribe';

const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,
    CustomNews: {
      [theme.breakpoints.down('lg')]: {
        display: 'none!important',
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
      [theme.breakpoints.down('sm')]: {
        height: '100px',
      },
    },
    gridClass: {
      display: 'flex',
      flexDirection: 'row',
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
  // const isLast = events.length - 1 === i;
  const theme = useTheme();
  const classes = useStyles(props);

  return (
    <Container
      maxWidth='lg'
      style={{
        position: 'absolute',
        backgroundColor: '#fff',
        width: '387px',
        margin: '7% 0',
        padding: '45px 20px',
        right: '0',
        left: '67%',
        height: 560,
      }}
      className={classes.CustomNews}
    >
      {liked.map((data, i) => (
        <div className='recent' key={i}>
          <div className={classes.gridClass} key={i}>
            <Link className={classes.linkClass} href={`/story/${data.id}`}>
              <a
                style={{
                  display: 'inherit',             
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                    }}
                  >
                    <img
                      src={data.postImage}
                      className={classes.imgClass}
                      alt='recommended'
                    />
                    <div className={classes.dettails}>
                      <Typography
                        variant='button'
                        className={`${classes.timeUpload} text-xs font-medium text-gray-600 capitalize`}
                      >
                        {dayjs(data.createdAt).fromNow()}
                      </Typography>
                      <Typography className={`${classes.titleCont} cinzel font-bold text-sm`}>
                        {data.title}
                      </Typography>
                    </div>
                  </div>
                  <hr
                    style={{
                      borderColor: 'rgba(0,0,0,.15)',
                      borderBottom: 0,
                      margin: '25px 0',
                      borderTopWidth: 0.5,
                      
                    }}
                  />
                </div>
              </a>
            </Link>
          </div>
        </div>
      ))}
    </Container>
  );
}
