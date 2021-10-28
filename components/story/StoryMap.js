import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

// Material
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import EmailIcon from '@mui/icons-material/Email';
import { Facebook } from '@material-ui/icons';
import { Twitter } from '@material-ui/icons';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,
    imgCont: {
      marginTop: '2rem',
      objectFit: 'cover',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        height: '300px',
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
    },
    headerCont: {
      display: 'flex',
      marginTop: '5rem',
    },
    socialCont: {
      marginRight: '5rem',
    },
    bodyText: {
      fontSize: 18,
      fontWeight: 400,
      whiteSpace: 'pre-line',
      margin: '1rem auto 5rem',
      [theme.breakpoints.down('md')]: {
        marginBottom: '5rem',
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
        {topic}
      </Typography>
      {matches ? (
        <span>
          <img className={classes.imgCont} src={postImage} />
        </span>
      ) : null}
      <div className={classes.headerCont}>
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
          <Typography className={classes.newsTitle}>{title}</Typography>
          <div
            style={{
              display: 'flex',
              margin: '15px 0 40px',
            }}
          >
            <Typography
              variant='body1'
              style={{
                fontSize: 15,
                textTransform: 'capitalize',
              }}
            >
              By
              <span
                style={{
                  marginRight: 40,
                  marginLeft: 5,
                  marginBotttom: 40,
                  color: '#6B3FA0',
                }}
              >
                {postedBy}
              </span>
            </Typography>
            <Typography
              variant='caption'
              style={{ margin: 'auto 0' }}
            >
              {dayjs(createdAt).format('h:mm a, dddd DD-MMM-YYYY')}
            </Typography>
          </div>
          <Typography variant='subtitle2' className={classes.bodyText}>
            {body}
          </Typography>
        </div>
      </div>
    </span>
  );
}
