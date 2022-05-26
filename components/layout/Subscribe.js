import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Material

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,
    subClass: {
      color: 'white',
      padding: 20,
      marginTop: '1rem',
      marginBottom: '1rem',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      width: 387,
      marginLeft: 'auto',
      backgroundColor: 'black',
      position: 'sticky',
      top: 50,
      height: 'fit-content',
      [theme.breakpoints.down('md')]: {
        margin: '4rem 0',
        width: '100%',
      },
    },
    titleCont: {
      fontSize: 24,
      textAlign: 'left',
      textTransform: 'uppercase',
      fontFamily: '"Helvetica Black Bold"',
      margin: '.5rem 0 1rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: 20,
      },
    },
    contDetails: {
      textAlign: 'left',
      fontWeight: 300,
      fontSize: 18,
      [theme.breakpoints.down('sm')]: {
        fontSize: 15,
      },
    },
    textField: {
      backgroundColor: 'white',
      height: 40,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      margin: '2rem 0',
      padding: '0 7.5px',
    },
    terms: {
      fontWeight: 300,
      fontSize: 15,
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
      },
    },
    subBtn: {
      margin: '1.5rem 0 1rem 0',
      boxShadow: 'none',
      height: '46px',
      fontSize: 15,
      color: 'white',
      float: 'left',
      fontFamily: '"Helvetica Bold"',

      backgroundColor: '#69409e',
      [theme.breakpoints.down('sm')]: {
        height: 44,
        width: 148,
        fontSize: 12,
      },
    },
  })
);

export default function Subscribe(props) {
  const [subscribe, setSubscribe] = useState('');

  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const handleSubmit = (evt) => {
    // do something
  };

  return (
    <div className={classes.subClass}>
      <span>
        <Typography className={classes.titleCont}>Our newsletter</Typography>
        <Typography variant='body1' className={classes.contDetails}>
          Now to get notified about exclusive offers every week!
        </Typography>
        <TextField
          color='secondary'
          value={subscribe}
          onChange={(e) => setSubscribe(e.target.value)}
          onClick={handleSubmit}
          placeholder='email@address.com'
          className={classes.textField}
          InputProps={{ disableUnderline: true }}
        />

        <form
          style={{
            textAlign: 'left',
          }}
        >
          <input
            type='checkbox'
            id='termsCon'
            name='termsCheck'
            value='termsCons'
          />
          <label htmlFor='termsCon' className={classes.terms}>
            I agree to the terms of newsletter
          </label>
        </form>
        <Button variant='contained' className={classes.subBtn}>
          add new story
        </Button>
      </span>
    </div>
  );
}
