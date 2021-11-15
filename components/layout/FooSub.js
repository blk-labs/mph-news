import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Material
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,
    titleCont: {
      textTransform: 'uppercase',
      textAlign: 'center',
      fontSize: 24,
      fontFamily: '"Helvetica Black Bold"',
      margin: '2rem 0 .6rem',
    },
    subClass: {
      textAlign: 'center',
      marginBottom: 60,
    },
    subBtn: {
      boxShadow: 'none',
      height: '46px',
      width: '150px',
      marginLeft: 10,
      color: 'white',
      backgroundColor: '#69409e',
      fontFamily: '"Helvetica"',

      [theme.breakpoints.down('sm')]: {
        width: '113px',
        fontSize: 15,
      },
    },
    textField: {
      backgroundColor: 'white',
      display: 'flex',
      padding: '7.5px',
      width: 325,
      [theme.breakpoints.down('sm')]: {
        fontSize: 15,
        width: 250,
      },
    },
  })
);

export default function Subscribe(props) {
  const [subscribe, setSubscribe] = useState('');

  const theme = useTheme();
  const classes = useStyles(props);
  // const matches = useMediaQuery(theme.breakpoints.down('md'));

  const handleSubmit = (evt) => {
    // do something
  };

  return (
    <div className={classes.subClass}>
      <Typography variant='h4' className={classes.titleCont}>
        Weekly News Updates
      </Typography>
      <Typography
        variant='body1'
        style={{
          marginBottom: '1rem',
          fontSize: 15,
          fontWeight: 400,
          fontFamily: '"Helvetica"',
        }}
      >
        Subscribe to get the week&apos;s most important news.
      </Typography>
      <div className='flex justify-center mx-2'>
        <TextField
          color='secondary'
          value={subscribe}
          onChange={(e) => setSubscribe(e.target.value)}
          onClick={handleSubmit}
          placeholder='email@address.com'
          className='textField'
          className={classes.textField}
          InputProps={{ disableUnderline: true }}
        />
        <Button variant='contained' className={classes.subBtn}>
          Subscribe
        </Button>
      </div>
    </div>
  );
}
