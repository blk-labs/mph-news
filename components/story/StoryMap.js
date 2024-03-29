import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

// Material
import { makeStyles, createStyles, useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import EmailIcon from '@mui/icons-material/Email';
import { Facebook } from '@material-ui/icons';
import { Twitter } from '@material-ui/icons';
import Container from '@mui/material/Container';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,
    imgCont: {
      marginTop: '2rem',
      objectFit: 'cover',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        height: '400px',
      },
    },
    headerCont: {
      paddingTop: 35,
    },
    newsTitle: {
      fontWeight: 900,
      fontSize: 36,
      textTransform: 'initial',
      fontFamily: '"Playfair Display"',
      lineHeight: 1.1,
      letterSpacing: -1,
      [theme.breakpoints.down('sm')]: {
        fontSize: 24,
      },
    },
    headerCont: {
      display: 'flex',
      marginTop: '3rem',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column-reverse',
      },
    },
    socialCont: {
      marginRight: '5rem',
      [theme.breakpoints.down('sm')]: {
        marginRight: '0',
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '2rem'
      },
    },
    bodyText: {
      fontSize: 18,
      fontWeight: 400,
      whiteSpace: 'pre-line',
      margin: '1rem auto 5rem',
      fontFamily: '"Helvetica"',

      [theme.breakpoints.down('md')]: {
        marginBottom: '5rem',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 15,
      },
    },
    createBy: {
      fontSize: 15,
      color: '#6B3FA0',
      fontFamily: '"Helvetica"',
      marginRight: 20,
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
      },
    },
    createAt: {
      fontFamily: '"Helvetica"',
      textTransform: 'capitalize',
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
        marginTop: 0,
      },
    },
  })
);

export default function StoryMap(props) {
  const router = useRouter();

  const { topic, createdAt, postedBy, postImage, body, title } = props.story;

  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const link = `https://news.mypoliticalhub.com${props.link}`;

  return (
    <span>
      <Container maxWidth='lg'>
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
          container
        >
          {topic}
        </Typography>
      </Container>
      <span>
        <img className={classes.imgCont} src={postImage} />
      </span>
      <Container maxWidth='lg' className={`${classes.headerCont} flex`}>
        <div className={classes.socialCont}>
          <div
            style={{
              border: '0.5px solid #eee',
              padding: '5px  20px',
              width: 'fit-content',
              marginBottom: '10px',
            }}
          >
            <EmailIcon
              style={{ fill: '#262F56' }}
              subject={props.title}
              body='Check out http://mypoliticalhub.com'
              link={`${link}`}
            />
          </div>
          <div
            style={{
              border: '0.5px solid #eee',
              padding: '5px  20px',
              width: 'fit-content',
              marginBottom: '10px',
            }}
          >
            <Facebook style={{ fill: '#3B5998' }} link={`${link}`} />
          </div>
          <div
            style={{
              border: '0.5px solid #eee',
              padding: '5px  20px',
              width: 'fit-content',
              marginBottom: '10px',
            }}
          >
            <Twitter
              style={{ fill: '#55ACEE' }}
              message={props.title}
              link={`${link}@my_politicalhub`}
            />
          </div>
          <div
            style={{
              border: '0.5px solid #eee',
              padding: '5px  20px',
              width: 'fit-content',
              marginBottom: '10px',
            }}
          >
            <WhatsAppIcon
              style={{ fill: '#25D366' }}
              message={props.title}
              link={`${link}`}
            />
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <Typography className={`${classes.newsTitle} cinzel font-bold text-xl lg:text-4xl`}>{title}</Typography>
          <div className='flex items-baseline sm:justify-inherit capitalize my-4'>
            <Typography className={`${classes.createBy} mr-2`} variant='caption'>
              <span style={{ color: 'black' }}>By</span> {postedBy}
            </Typography>
            <Typography className={classes.createAt} variant='caption'>
              {typeof dayjs(createdAt).fromNow === 'function' && dayjs(createdAt).fromNow()}
            </Typography>
          </div>
          <Typography variant='p' className={classes.bodyText}>
            {body}
          </Typography>
        </div>
      </Container>
    </span>
  );
}
