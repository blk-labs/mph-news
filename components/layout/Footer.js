import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Subscribe from './FooSub';

import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import useMediaQuery from '@material-ui/core/useMediaQuery';
// Icons
import { Facebook } from '@material-ui/icons';
import { Twitter } from '@material-ui/icons';
import { YouTube } from '@material-ui/icons';
import { Instagram } from '@material-ui/icons';

import logo from '../../public/images/logoMPH.png';

const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,
    gridCont: {
      backgroundColor: 'black',
      color: 'white',
      paddingTop: '5%',
    },
    footerLogo: {
      width: 200,
      height: 'auto',
    },
    listFooter: {
      display: 'flex',
    },
    listCont: {
      // paddingTop: '2rem',
    },
    paddingSM: {
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('sm')]: {
        paddingTop: '2rem',
      },
    },

    footerLine: {
      backgroundColor: 'black',
      marginTop: '4rem',
    },
    hrFooter: {
      borderColor: 'rgba(255,255,255,.5)',
      borderBottom: 0,
      borderLeft: 0,
      borderRight: 0,
    },
    fooDetails: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  })
);

export default function Footer(props) {
  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <div className={classes.gridCont}>
      <Subscribe />
      <Container maxWidth='lg'>
        <div className={classes.fooDetails}>
          <div>
            <img
              src={logo.src}
              alt='mph-logo-white'
              className={classes.footerLogo}
            />
          </div>
          <div className={classes.listCont}>
            <div>
              <ul className='listFooter'>
                <li>
                  <Typography variant='caption'>
                    <Link href='/' className={classes.linkClass}>
                      <a>Home</a>
                    </Link>
                  </Typography>
                </li>
                <li>
                  <Typography variant='caption'>
                    <Link href='/about' className={classes.linkClass}>
                      <a>About</a>
                    </Link>
                  </Typography>
                </li>
                <li>
                  <Typography variant='caption'>
                    <Link href='/contact' className={classes.linkClass}>
                      <a>Contact</a>
                    </Link>
                  </Typography>
                </li>
                <li>
                  <Typography variant='caption'>
                    <Link href='/disclaimer' className={classes.linkClass}>
                      <a>Disclaimer</a>
                    </Link>
                  </Typography>
                </li>
                <li>
                  <Typography variant='caption'>
                    <Link href='/privacy' className={classes.linkClass}>
                      <a>Privacy Policy</a>
                    </Link>
                  </Typography>
                </li>
              </ul>
              <div
                style={{
                  marginTop: '1rem',
                  display: 'flex',
                  justifyContent: 'space-evenly',
                }}
              >
                <div className={classes.iconClass}>
                  <a
                    target='_blank'
                    rel='noreferrer'
                    className={classes.linkClass}
                    href='https://web.facebook.com/My-Political-Hub-106231897488181/'
                  >
                    <Facebook />
                  </a>
                </div>
                <div className={classes.iconClass}>
                  <a
                    target='_blank'
                    rel='noreferrer'
                    className={classes.linkClass}
                    href='https://www.twitter.com/my_politicalhub'
                  >
                    <Twitter />
                  </a>
                </div>
                <div className={classes.iconClass}>
                  <a
                    target='_blank'
                    rel='noreferrer'
                    className={classes.linkClass}
                    href='https://www.youtube.com/channel/UCwnOgB3veQgUkuB0QCBX55w'
                  >
                    <YouTube />
                  </a>
                </div>
                <div className={classes.iconClass}>
                  <a
                    target='_blank'
                    rel='noreferrer'
                    
                    className={classes.linkClass}
                    href='https://www.instagram.com/my_politicalhub'
                  >
                    <Instagram />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.paddingSM}>
            <Typography variant='caption'>
              Plot 177 R.B. Dikko Rd, Garki, Abuja
            </Typography>
            <Typography style={{ paddingTop: '.5rem' }} variant='caption'>
              (+234) 814 565 5270
            </Typography>
            <Typography style={{ paddingTop: '.5rem' }} variant='caption'>
              info@mypoliticalhub.com
            </Typography>
          </div>
        </div>
      </Container>
      <div className={classes.footerLine}>
        <hr className={classes.hrFooter} />
        <Container
          maxWidth='lg'
          style={{ paddingBottom: '1rem', color: 'gray' }}
        >
          <Typography variant='caption'>
            Copyright © 2020 My Political Hub. All rights reserved.
          </Typography>
        </Container>
      </div>
    </div>
  );
}
