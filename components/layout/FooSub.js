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
      fontWeight: 900,
      fontSize: 24,
      fontFamily: '"Helvetica Bold"',
      margin: '2rem 0 .6rem',
    },
    subClass: {
      textAlign: 'center',
      marginBottom: 60,
    },
    subBtn: {
      boxShadow: 'none',
      height: '48px',
      width: '150px',
      marginLeft: 10,
      color: 'white',
      backgroundColor: '#69409e',
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
      <span>
        <Typography variant='h4' className={classes.titleCont}>
          Weekly News Updates
        </Typography>
        <Typography
          variant='body1'
          style={{ marginBottom: '1rem', fontSize: 15, fontWeight: 400 }}
        >
          Subscribe to get the week&apos;s most important news.
        </Typography>
        <TextField
          value={subscribe}
          onChange={(e) => setSubscribe(e.target.value)}
          onClick={handleSubmit}
          placeholder='email@address.com'
          className='textField'
        />
        <Button variant='contained' className={classes.subBtn}>
          Subscribe
        </Button>
      </span>
    </div>
  );
}
