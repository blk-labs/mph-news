import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Material
import Typography from '@material-ui/core/Typography';

import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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
    },
    editors: {
      display: 'flex',
      fontSize: 17,
      fontWeight: 800,
      overflow: 'auto',
    },
    gridClass: {
      margin: '0',
    },
    number: {
      fontSize: 20,
      fontWeight: 900,
      color: '#6B3FA0',

      marginRight: 10,
    },
    timeUpload: {
      color: '#a8a8a8',
      textTransform: 'lowercase',
      fontFamily: '"Helvetica"',
      marginLeft: 5,
      fontSize: 14,
      fontWeight: 400,
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
      <Typography variant='h5' className={classes.titleCont}>
        Editor's Pick
      </Typography>
      <div className={classes.editors}>
        {recommend.map((data, i) => (
          <div className={classes.gridClass} key={i}>
            <Link className={classes.linkClass} href={`/story/${data.id}`}>
              <a>
                <div className={classes.edtorsNews}>
                  <Typography variant='h1' className={classes.number}>
                    0{i + 1}
                  </Typography>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      variant='subtitle2'
                      style={{
                        width: '',
                        paddingRight: '20px',
                        fontFamily: '"Helvetica Bold"',
                        // fontWeight: 900
                      }}
                    >
                      {data.title}
                    </Typography>
                    <div>
                      <AccessTimeIcon style={{ fontSize: '13px' }} />
                      <Typography
                        variant='button'
                        className={classes.timeUpload}
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
