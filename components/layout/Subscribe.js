import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Material
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,
    subClass: {
      color: 'white',
      padding: 20,
      marginLeft: '2rem',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      height: 403,
      backgroundColor: 'black',
    },
    titleCont: {
      fontWeight: 900,
      fontSize: 24,
      textAlign: 'left',
      textTransform: 'uppercase',
      // letterSpacing: 2.5,
      fontFamily: '"Helvetica Bold"',
      margin: '1.3rem 0 1rem',
    },
    contDetails: { textAlign: 'left', fontWeight: 300, fontSize: 18 },
    textField: {
      backgroundColor: 'white',
      height: 40,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      margin: '2rem 0',
    },
    terms: {
      fontWeight: 300,
      fontSize: 15,
    },
    subBtn: {
      margin: '1.5rem 0 0 0',
      boxShadow: 'none',
      height: '46px',
      float: 'left',
      fontSize: 15,
      color: 'white',
      backgroundColor: '#69409e',
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
      {!matches && (
        <span>
          <Typography className={classes.titleCont}>
            Our newsletter
          </Typography>
          <Typography variant='body1' className={classes.contDetails}>
            Now to get notified about exclusive offers every week!
          </Typography>
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

          <form
            style={{
              float: 'left',
            }}
          >
            <input
              type='checkbox'
              id='termsCon'
              name='termsCheck'
              value='termsCons'
            />
            <label for='termsCon' className={classes.terms}>
              I agree to the terms of newsletter
            </label>
          </form>
          <Button variant='contained' className={classes.subBtn}>
            add new story
          </Button>
        </span>
      )}
    </div>
  );
}
