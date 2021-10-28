import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Material
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,
    recentCont: {
      textTransform: 'capitalize',
      marginBottom: '1.5rem',
      display: 'flex',
      width: '100%',
    },
    recentImg: {
      objectFit: 'cover',
      minWidth: '100%',
      maxWidth: '100%',
      height: 'auto',
    },
    bottomNews: {
      fontWeight: 900,
      fontSize: 22,
      margin: '10px 0 0',
      lineHeight: 1.2,
      textTransform: 'initial',
      letterSpacing: -0.2,
      fontFamily: '"Playfair Display"',
    },
    subnews: {
      color: 'black',
      fontSize: 15,
      margin: '10px 0',
      letterSpacing: 0,
      fontWeight: 300,
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
    },
  })
);

export default function SideMap(props) {
  dayjs.extend(relativeTime);
  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const { postsId, postImage, id, createdAt, title, body, postedBy } =
    props.topic;

  return (
    <div>
      <Link key={postsId} className={classes.linkClass} href={`/story/${id}`}>
        <a>
          <Grid className={classes.recentCont} key={postsId} container>
            <img
              src={postImage}
              alt='recent-img'
              className={classes.recentImg}
            />
            <div className={classes.ContDetails}>
              <Typography variant='body2' className={classes.bottomNews}>
                {title}
              </Typography>

              {matches ? (
                <Typography
                  variant='body2'
                  className={classes.subnews}
                  style={{ margin: '.5rem 0' }}
                >
                  {body.substring(0, 150)}...
                </Typography>
              ) : null}
              <Typography
                style={{
                  textTransform: 'capitalize',
                  marginRight: 40,
                  fontSize: 15,

                  color: '#6B3FA0',
                }}
                variant='caption'
              >
                {postedBy}
              </Typography>
              <Typography
                style={{
                  margin: '1rem 0 2rem',
                }}
                variant='caption'
              >
                {dayjs(createdAt).fromNow()}
              </Typography>
            </div>
          </Grid>
        </a>
      </Link>
    </div>
  );
}
