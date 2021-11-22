import React, { StrictMode } from 'react';
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
import Stack from '@mui/material/Stack';
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontSize: 24,

      '& .Mui-selected': {
        backgroundColor: '#36C2F3',
        color: '#fff',
        border: '1px solid #36C2F3',
        fontSize: 24,
        fontFamily: '"Helvetica Bold"',
        height: 50,
        fontWeight: 400,
      },
      '& ul > li:not(:first-child):not(:last-child) > button:not(.Mui-selected)':
        {
          border: '1px solid #36C2F3',
          fontSize: 24,
          fontFamily: '"Helvetica Bold"',
          height: 50,
          fontWeight: 400,
        },
      '& ul > li(:second-child):not(:last-child) > button:not(.Mui-selected)': {
        border: 'none',
        fontSize: 24,
        fontFamily: '"Helvetica Bold"',
        height: 70,
        fontWeight: 400,
      },
      '& .MuiPaginationItem-icon': {
        height: 22,
        borderRadius: 5,
        border: '1px solid #36C2F3',
      },
      //
      '& .MuiPaginationItem-outlined': {
        border: 'none',
      },
    },
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
        fontSize: '13px',
        width: '100%',
      },
    },
    gridCont: {
      display: 'flex',
      marginTop: 40,
      gap: 40,
      backgroundColor: 'white',
      [theme.breakpoints.down('md')]: {
        flexWrap: 'wrap',
      },
    },
    newCont: {
      display: 'flex',
      margin: '1rem 0',
      flexDirection: 'column',
      cursor: 'pointer',
    },
    imgPlay: {
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      },
    },
    newImg: {
      minHeight: '274px',
      maxHeight: '274px',
      minWidth: '373px',
      maxWidth: '373px',
      objectFit: 'cover',
      [theme.breakpoints.down('sm')]: {
        minHeight: 50,
        maxHeight: 50,
        minWidth: 54,
        maxWidth: 54,
        borderRadius: 10,
        marginRight: 10,
      },
    },
    mobileAud: {
      display: 'none',
      [theme.breakpoints.down('sm')]: {
        display: 'block',
      },
    },

    deskAud: {
      display: 'block',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
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
        fontSize: 20,
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
  {
    poster: female,
    title: 'Suicide On The Rise As Nigeria Records 51 Cases In 12 Months',
    time: 'March 5th, 2021',
  },
  {
    poster: female,
    title: 'Suicide On The Rise As Nigeria Records 51 Cases In 12 Months',
    time: 'March 5th, 2021',
  },
  {
    poster: female,
    title: 'Suicide On The Rise As Nigeria Records 51 Cases In 12 Months',
    time: 'March 5th, 2021',
  },
  {
    poster: female,
    title: 'Suicide On The Rise As Nigeria Records 51 Cases In 12 Months',
    time: 'March 5th, 2021',
  },
];
const firstIndex = 0;

const Voices = (props) => {
  const theme = useTheme();
  const classes = useStyles(props);

  const [pageSize, setPageSize] = React.useState(6);
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState(news.slice(firstIndex, pageSize));

  React.useEffect(() => {
    setData(news.slice(0, pageSize));
  }, [pageSize]);

  const handleChange = (event, value) => {
    setPage(value);
    setData(news.slice(firstIndex + pageSize * (value - 1), pageSize * value));
  };

  //Change width
  const changeWidth = (e) => {
    setPageSize(parseInt(e.target.value, 10));
  };

  return (
    <>
      <Container>
        <Typography variant='body1' className={classes.topicTitle}>
          Voices
        </Typography>
        <Typography className={classes.topicInfo}>
          Get the latest travel news and hot celeb gossip with exclusive stories
          and pictures to discover more!
        </Typography>
      </Container>
      <hr />
      <Container>
        <Grid className={classes.gridCont}>
          <Grid
            lg={8}
            md={12}
            sm={12}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            {data.map((n, i) => (
              <div className={classes.newCont}>
                <div className={classes.imgPlay}>
                  <div>
                    <img
                      src={userImg.src}
                      alt={`${data.topic} img`}
                      className={classes.newImg}
                    />
                  </div>
                  <div className={classes.mobileAud}>
                    <StrictMode>
                      <Audio />
                    </StrictMode>
                  </div>
                </div>
                <Typography className={classes.newsTitle} variant='body1'>
                  {n.title}
                </Typography>
                <div className={classes.deskAud}>
                  <StrictMode>
                    <Audio />
                  </StrictMode>
                </div>
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
              </div>
            ))}
          </Grid>
          <Grid lg={4} md={4} sm={12}>
            <Subscribe />
          </Grid>
        </Grid>
        <div style={{ marginTop: 70, marginBottom: 50 }}>
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(news.length / pageSize)}
              variant='outlined'
              shape='rounded'
              onChange={handleChange}
              className={classes.root}
            />
          </Stack>
        </div>
      </Container>
      <Footer />
    </>
  );
};
export default Voices;
