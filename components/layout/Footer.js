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
      maxWidth: 200,
      minWidth: 200,
      height: 'auto',
      [theme.breakpoints.down('sm')]: {
        maxWidth: 105,
        minWidth: 105,
      },
    },
    listFooter: {
      display: 'flex',
    },
    listCont: {
      [theme.breakpoints.down('sm')]: {
        // margin: 0,
      },
    },
    paddingSM: {
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('sm')]: {
        fontSize: 15,
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
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    fooCont: {
      display: 'contents',
      [theme.breakpoints.down('xs')]: {
        justifyContent: 'space-between',
        display: 'flex',
        marginTop: '1rem',
      },
    },
    socialIcons: {
      marginTop: '1rem',
      display: 'flex',
      justifyContent: 'space-evenly',
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    mobileIcons: {
      marginTop: '1rem',
      display: 'none',
      [theme.breakpoints.down('xs')]: {
        display: 'flex',
        justifyContent: 'space-evenly',
      },
    },
    menu: {
      fontFamily: '"Helvetica"',
      fontSize: 15,
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
      },
    },
    address: {
      fontFamily: '"Helvetica"',
      fontSize: 15,
      lineHeight: 2,
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
      },
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
          <div className={classes.fooCont}>
            <div className={classes.listCont}>
              <div>
                <ul className='listFooter'>
                  <li>
                    <Typography variant='caption'>
                      <Link href='/'>
                        <a className={classes.menu}>Home</a>
                      </Link>
                    </Typography>
                  </li>
                  <li>
                    <Typography variant='caption'>
                      <Link href='/about'>
                        <a className={classes.menu}>About</a>
                      </Link>
                    </Typography>
                  </li>
                  <li>
                    <Typography variant='caption'>
                      <Link href='/contact'>
                        <a className={classes.menu}>Contact</a>
                      </Link>
                    </Typography>
                  </li>
                  <li>
                    <Typography variant='caption'>
                      <Link href='/disclaimer'>
                        <a className={classes.menu}>Disclaimer</a>
                      </Link>
                    </Typography>
                  </li>
                  <li>
                    <Typography variant='caption'>
                      <Link href='/privacy'>
                        <a className={classes.menu}>Privacy Policy</a>
                      </Link>
                    </Typography>
                  </li>
                </ul>
              </div>
              <div className={classes.socialIcons}>
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

            <div className={classes.paddingSM}>
              <Typography variant='caption' className={classes.address}>
                Plot 177 R.B. Dikko Rd, Garki, Abuja
                <br />
                (+234) 814 565 5270
                <br />
                info@mypoliticalhub.com
              </Typography>
            </div>
          </div>
          <div className={classes.mobileIcons}>
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
