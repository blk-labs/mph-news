import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// import { Facebook } from '@material-ui/icons';
// import { Twitter } from '@material-ui/icons';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Mail, Facebook, Twitter } from 'react-social-sharing';

// Material
import { makeStyles, createStyles, useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,
    moreCont: {
      marginBottom: '5rem',
      position: 'relative',
      [theme.breakpoints.down('md')]: {
        paddingTop: '2rem',
      },
    },
    fadeTopic: {
      position: 'absolute',
      color: 'rgba(0,0,0,.05)',
      zIndex: '-1',
      marginTop: '-1.5rem',
      fontFamily: '"Helvetica Compressed"',
    },
    mainImg: {
      minWidth: '100px',
      maxWidth: '100px',
      marginRight: '1rem',
      height: '75px',
      objectFit: 'cover',
    },
    socialCont: {
      marginBottom: '10%',
    },
  })
);

const styles = {
  background: 'red',
  border: '5px solid #eee',
};
export default function MoreMarkup(props) {
  dayjs.extend(relativeTime);
  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const news = props.pass;

  console.log(props);

  return (
    <Container>
      <Grid item xs={12} lg={8}>
        <div className={classes.moreCont}>
          <Typography
            variant='h4'
            className='capitalize'
            style={{
              fontWeight: 900,
              fontSize: 36,
              color: '#000',
              fontFamily: '"Playfair Display"',
              margin: '2rem 0',
            }}
          >
            Recent News {props.topic !== undefined && props.topic}
          </Typography>
          <Grid container>
            {props.topic !== undefined &&
              props.topic
                .map((data, i) => (
                  <Grid key={i} item xs={12} lg={6}>
                    <Link
                      style={{ display: 'flex' }}
                      className={classes.linkClass}
                      target='_blank'
                      href={`/story/${data.id}`}
                    >
                      <a>
                        <img
                          src={data.postImage}
                          className={classes.mainImg}
                          alt={`${data.topics} image`}
                        />
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginRight: '.5rem',
                          }}
                        >
                          <Typography
                            style={{ textTransform: 'capitalize' }}
                            variant='subtitle2'
                          >
                            {data.title}
                          </Typography>
                          <Typography
                            style={{
                              margin: '1rem 0 2rem',
                              textTransform: 'uppercase',
                            }}
                            variant='caption'
                          >
                            {dayjs(data.createdAt).fromNow()}
                          </Typography>
                        </div>
                      </a>
                    </Link>
                  </Grid>
                ))
                .splice(0, 4)}
          </Grid>
        </div>
      </Grid>
    </Container>
  );
}
