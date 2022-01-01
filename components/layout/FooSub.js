import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Material
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/styles';
import { createStyles } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

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
      fontFamily: '"Helvetica Bold"',
      fontSize: 15,

      [theme.breakpoints.down('sm')]: {
        width: '113px',
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
      <Typography variant='h4' className={`${classes.titleCont} bebas-neue`}>
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
      <div className='flex justify-center items-stretch mx-2'>
        <TextField
          color='secondary'
          value={subscribe}
          onChange={(e) => setSubscribe(e.target.value)}
          onClick={handleSubmit}
          size="small"
          placeholder='email@address.com'
          className={`${classes.textField} h-full lg:mr-3`}
          InputProps={{ disableUnderline: true }}
        />
        <a href="#" className="px-10 flex justify-center items-center uppercase tracking-wide bg-violet-600 text-sm text-white font-bold">
          Subscribe
        </a>
      </div>
    </div>
  );
}
