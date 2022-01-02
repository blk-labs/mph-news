import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Material
import Typography from '@mui/material/Typography';

import { makeStyles, createStyles, useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// Icons
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,
    titleCont: {
      fontWeight: 900,
      fontSize: 36,
      color: '#333',
      textTransform: 'capitalized',
      fontFamily: '"Playfair Display"',
      margin: '2rem 0',
      [theme.breakpoints.down('sm')]: {
        fontSize: '24px!important',
        margin: '2rem 0 1rem',
      },
    },
    editors: {
      display: 'flex',
      overflow: 'auto',
      justifyContent: 'space-between'
    },
    title: {
      paddingRight: '20px',
      fontSize: 17,
      fontFamily: '"Helvetica Bold"',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      [theme.breakpoints.down('sm')]: {
        fontSize: '12px!important',
      },
    },
    gridClass: {
      margin: '0',
    },
    number: {
      fontSize: 18,
      fontWeight: 900,
      color: '#6B3FA0',
      fontFamily: '"Helvetica Black Bold"',
      marginRight: 10,
      [theme.breakpoints.down('sm')]: {
        fontSize: '14px!important',
      },
    },
    timeUpload: {
      color: '#a8a8a8',
      textTransform: 'lowercase',
      fontFamily: '"Helvetica"',
      marginLeft: 5,
      fontSize: 14,
      fontWeight: 400,
      [theme.breakpoints.down('sm')]: {
        fontSize: '12px!important',
      },
    },
    edtorsNews: {
      display: 'flex',
      width: '300px',
    },
  })
);

export default function CustomNews(props) {
  const news = props.news.filter((n) => n.topic !== 'video');
  dayjs.extend(relativeTime);
  const recommend = news.filter((n) => n.editors_pick === true).slice(0, 4);
  const liked = news
    .sort((a, b) => b.commentCount - a.commentCount)
    .slice(0, 4);

  const theme = useTheme();
  const classes = useStyles(props);

  return (
    <div>
      <Typography variant='h5' className={`${classes.titleCont} mb-3 py-2 text-4xl font-bold tracking-wide cinzel`}>
        Editor&apos;s Pick
      </Typography>
      <div className={`${classes.editors} editorClass`}>
        {recommend.map((data, i) => (
          <div className={classes.gridClass} key={i}>
            <Link className={classes.linkClass} href={`/story/${data.id}`}>
              <a>
                <div className={classes.edtorsNews}>
                  <Typography variant='h1' className={`${classes.number} text-xl bebas-neue tracking-wider font-bold px-2`}>
                    0{i + 1}
                  </Typography>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='subtitle2' className={`${classes.title} text-base tracking-wide font-bold`}>
                      {data.title}
                    </Typography>
                    <div>
                      <AccessTimeIcon style={{ fontSize: '18px' }} className="font-bold" />
                      <Typography
                        variant='button'
                        className={`${classes.timeUpload} ml-2 text-xs font-medium`}
                      >
                        {dayjs(data.createdAt).fromNow()}
                      </Typography>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
