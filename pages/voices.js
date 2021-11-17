import React from 'react';
import Image from 'next/image';

//Comps
import { dog } from '../public/images/voices/dog.png';
import { cam } from '../public/images/voices/cam.png';
import { city } from '../public/images/voices/city.png';
import { office } from '../public/images/voices/office.png';
import { female } from '../public/images/voices/female.png';
import userImg from '../public/images/voices/city.png';
import Subscribe from '../components/layout/Subscribe';
import Audio from '../components/layout/Audio';
import Footer from '../components/layout/Footer';

// Material
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    topicTitle: {
      fontFamily: '"Playfair Display"',
      fontWeight: 900,
      fontSize: 36,
      color: '#5BA66E',
      textTransform: 'capitalize',
      margin: '2rem 0 0.5rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: 24,
      },
    },
    topicInfo: {
      fontWeight: 400,
      marginBottom: 20,
      fontFamily: '"Helvetica"',
      fontSize: 18,
      width: 600,
      [theme.breakpoints.down('sm')]: {
        fontSize: 13,
        width: '100%',
      },
    },
    gridCont: {
      display: 'flex',
      marginTop: 40,
      gap: 40,
      backgroundColor: 'white',
      [theme.breakpoints.down('xs')]: {
        width: '175px',
      },
    },
    newCont: {
      display: 'flex',
      margin: '1rem 0',
      flexDirection: 'column',
      cursor: 'pointer',
    },
    newBody: {},

    newImg: {
      minHeight: '274px',
      maxHeight: '274px',
      minWidth: '373px',
      maxWidth: '373px',
      objectFit: 'cover',
      [theme.breakpoints.down('sm')]: {
        minHeight: '45px',
        maxHeight: '45px',
        minWidth: '45px',
        maxWidth: '45px',
      },
    },
    newsTitle: {
      fontWeight: 900,
      fontSize: 15,
      textTransform: 'initial',
      fontFamily: '"Playfair Display"',
      lineHeight: 1.1,
      paddingTop: 10,
      letterSpacing: -1,
      [theme.breakpoints.down('xs')]: {
        fontSize: 24,
      },
    },
    hrClass: {
      opacity: 0.1,
      border: 0,
      borderTop: '1px solid black',
    },
  })
);

const news = [
  {
    poster: dog,
    title: 'Suicide On The Rise As Nigeria Records 51 Cases In 12 Months',
    time: 'March 5th, 2021',
  },
  {
    poster: cam,
    title: 'Suicide On The Rise As Nigeria Records 51 Cases In 12 Months',
    time: 'March 5th, 2021',
  },
  {
    poster: city,
    title: 'Suicide On The Rise As Nigeria Records 51 Cases In 12 Months',
    time: 'March 5th, 2021',
  },
  {
    poster: city,
    title: 'Suicide On The Rise As Nigeria Records 51 Cases In 12 Months',
    time: 'March 5th, 2021',
  },
  {
    poster: office,
    title: 'Suicide On The Rise As Nigeria Records 51 Cases In 12 Months',
    time: 'March 5th, 2021',
  },
  {
    poster: female,
    title: 'Suicide On The Rise As Nigeria Records 51 Cases In 12 Months',
    time: 'March 5th, 2021',
  },
];

export default function NewsWidget(props) {
  const theme = useTheme();
  const classes = useStyles(props);

  return (
    <>
      <Container>
        <Typography variant='body1' className={classes.topicTitle}>
          Voices
        </Typography>
        <Typography className={classes.topicInfo}>
          Get the latest travel news and hot celeb gossip with exclusive stories
          and pictures to discover more!!
        </Typography>
      </Container>
      <hr />
      <Container>
        <Grid className={classes.gridCont}>
          <Grid
            lg={8}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            {news.map((n, i) => (
              <div>
                <div className={classes.newCont}>
                  <img className={classes.newImg} src={userImg.src} alt='' />
                  <div className={classes.newBody}>
                    <Typography className={classes.newsTitle} variant='body1'>
                      {n.title}
                    </Typography>
                    <Typography
                      style={{
                        fontWeight: '500',
                        marginTop: 10,
                        fontSize: 11,
                        fontFamily: '"Helvetica"',
                      }}
                      variant='body2'
                    >
                      {n.time}
                    </Typography>
                    <Audio />
                  </div>
                </div>
              </div>
            ))}
          </Grid>
          <Grid lg={4}>
            <Subscribe />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
