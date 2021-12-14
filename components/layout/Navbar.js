import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/userActions';

// Material
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { LinearProgress } from '@material-ui/core';

// Icons
import {
  Search,
  Apps,
  Home,
  Facebook,
  Twitter,
  YouTube,
  Instagram,
} from '@material-ui/icons';

//Comps
import MobileNav from './MobileNav';
import SearchModal from './Search';
// import AuthModal from '../../pages/authModal';
import logoFull from '../../public/images/logoFullColor2.png';
import userImg from '../../public/images/userImg.png';
import logo from '../../public/images/logo.png';
import hub from '../../public/images/hub.png';

const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,
    topClass: {
      textAlign: 'right',
    },
    navCont: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '1rem',
    },
    homeIcon: {
      color: theme.palette.secondary.light,
      padding: '.3rem .2rem',
      marginRight: '1rem',
      borderBottom: `2px solid ${theme.palette.secondary.light}`,
    },
    hubClass: {
      height: '20px',
      width: 'auto',
      marginRight: '.25rem',
    },
    logoComp: {
      margin: 'auto',
      [theme.breakpoints.down('sm')]: {
        margin: 'unset',
        marginRight: 'auto',
      },
    },

    logoFull: {
      height: 'auto',
      width: 189,
      [theme.breakpoints.down('sm')]: {
        width: '105px',
      },
    },
    logoClass: {
      height: 'auto',
      width: 189,
    },
    searchCont: {
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      marginLeft: 'auto',

      [theme.breakpoints.down('sm')]: {
        width: '2rem',
        height: '2rem',
      },
    },
    menuCont: {
      backgroundColor: 'white',
      color: 'black',
      position: 'sticky',
      overflowX: 'auto',
      overflowY: 'hidden',
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    menuList: {
      borderTop: '0.5px solid #eee',
      borderBottom: '0.5px solid #eee',
      width: '100%',
    },
    titleCont: {
      display: 'flex',
      alignItems: 'baseline',
      fontSize: 15,
      padding: '.5rem 3rem .5rem 0',
      '&:hover': {
        color: theme.palette.secondary.light,
      },
      [theme.breakpoints.down('md')]: {
        padding: '.5rem 1.5rem .5rem 0',
      },
    },
    stickyClass: {
      position: 'fixed',
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);

const titles = [
  { title: 'Nigeria' },
  { title: 'International' },
  { title: 'Security' },
  { title: 'Health' },
  { title: 'Business' },
  { title: 'Other' },
  { title: 'National Assembly' },
  { title: 'Voices' },
];

export function Navbar(props) {
  const router = useRouter();

  const [sticky, setSticky] = useState();
  const [open, setOpen] = useState(false);
  const [navLoading, setNavLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleSticky = () => {
    if (window.scrollY > 150) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  const handleLogout = (evt) => {
    props.logoutUser();
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleSticky);
    return () => {
      window.removeEventListener('scroll', toggleSticky);
    };
  }, []);

  useEffect(() => {
    const handleNavStart = (url) => {
      console.log(`Loading: ${url}`);
      setNavLoading(true);
    };
    const handleNavStop = () => {
      setNavLoading(false);
    };

    router.events.on('routeChangeStart', handleNavStart);
    router.events.on('routeChangeComplete', handleNavStop);
    router.events.on('routeChangeError', handleNavStop);

    return () => {
      router.events.off('routeChangeStart', handleNavStart);
      router.events.off('routeChangeComplete', handleNavStop);
      router.events.off('routeChangeError', handleNavStop);
    };
  }, [router]);

  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <div id='navBar'>
      <Container className={classes.navCont}>
        <div
          className='hidden md:block md:flex'
          style={{ alignItems: 'center' }}
        >
          <div className={classes.iconClass}>
            <a
              target='_blank'
              rel='noreferrer'
              className={classes.linkClass}
              style={{ marginRight: '20px' }}
              href='https://web.facebook.com/My-Political-Hub-106231897488181/'
            >
              <Facebook fontSize='small' />
            </a>
          </div>
          <div className={classes.iconClass}>
            <a
              target='_blank'
              rel='noreferrer'
              className={classes.linkClass}
              style={{ marginRight: '20px' }}
              href='https://www.twitter.com/my_politicalhub'
            >
              <Twitter fontSize='small' />
            </a>
          </div>
          <div className={classes.iconClass}>
            <a
              target='_blank'
              rel='noreferrer'
              className={classes.linkClass}
              style={{ marginRight: '20px' }}
              href='https://www.youtube.com/channel/UCwnOgB3veQgUkuB0QCBX55w'
            >
              <YouTube fontSize='small' />
            </a>
          </div>
          <div className={classes.iconClass}>
            <a
              target='_blank'
              rel='noreferrer'
              className={classes.linkClass}
              href='https://www.instagram.com/my_politicalhub'
            >
              <Instagram fontSize='small' />
            </a>
          </div>
        </div>
        <Link href='/'>
          <a className={classes.logoComp}>
            <img
              src={matches ? logoFull.src : logoFull.src}
              className={matches ? classes.logoClass : classes.logoFull}
              alt='MPH-logo'
            />
          </a>
        </Link>
        {!matches ? (
          <div className='flex'>
            <SearchModal />
            <MobileNav />
            <hr />
          </div>
        ) : null}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {matches ? (
            <span>
              <Container maxWidth='lg' style={{ display: 'contents' }}>
                <div className={classes.topClass}>
                  {props.user.authenticated ? (
                    <Link href='/'>
                      <a
                        color='default'
                        style={{
                          textTransform: 'capitalize',
                          padding: 5,
                          display: 'flex',
                        }}
                        onClick={handleLogout}
                      >
                        <Typography
                          variant='caption'
                          style={{
                            fontSize: '14px',
                            fontWeight: 600,
                            fontFamily: '"Helvetica"',
                            textTransform: 'uppercase',
                          }}
                        >
                          Logout
                        </Typography>
                      </a>
                    </Link>
                  ) : (
                    <Link href='/login'>
                      <a
                        color='default'
                        style={{
                          textTransform: 'capitalize',
                          padding: 5,
                          display: 'flex'
                        }}
                        onClick={handleOpen}
                      >
                        <img
                          src={userImg.src}
                          alt=''
                          className={classes.hubClass}
                        />
                        <Typography
                          style={{
                            fontSize: '14px',
                            fontWeight: 600,
                            margin: 'auto',
                            textTransform: 'uppercase',
                          }}
                          variant='p'
                        >
                          Account
                        </Typography>
                      </a>
                    </Link>
                  )}
                </div>
              </Container>
            </span>
          ) : null}
        </div>
      </Container>
      <AppBar
        className={sticky ? classes.stickyClass : ''}
        position='sticky'
        elevation={0}
      >
        <div className={classes.menuCont}>
          <div className={classes.menuList}>
            <Container style={{ display: 'flex' }} maxWidth='lg'>
              {matches
                ? titles.map((str, i) => {
                    const chars = str.title.charAt(0);
                    const words = str.title.split(chars);
                    return (
                      <Link
                        key={i}
                        href={
                          str.title === 'Admin Panel'
                            ? `/admin`
                            : `/topics/${str.title.toLowerCase()}` &&
                              str.title === 'Voices'
                            ? `/voices`
                            : `/topics/${str.title.toLowerCase()}` &&
                              str.title === 'National Assembly'
                            ? `/document`
                            : `/topics/${str.title.toLowerCase()}`
                        }
                        className={`${classes.titleCont} ${classes.linkClass}`}
                      >
                        <a
                          className={`${classes.titleCont} ${classes.linkClass}`}
                        >
                          <Typography
                            variant='body2'
                            style={{
                              fontSize: '15px',
                              fontFamily: '"Helvetica"',
                            }}
                          >
                            {chars}
                          </Typography>
                          <Typography
                            variant='body2'
                            style={{
                              textTransform: 'lowercase',
                              fontFamily: '"Helvetica"',
                              fontSize: 15,
                            }}
                          >
                            {words[1]}
                          </Typography>
                        </a>
                      </Link>
                    );
                  })
                : titles.map((str, i) => (
                    <Link
                      key={i}
                      href={
                        str.title === 'National Assembly'
                          ? `/documents`
                          : `/topics/${str.title.toLowerCase()}`
                      }
                      className={`${classes.titleCont} ${classes.linkClass}`}
                    >
                      <a className='pr-3 py-1'>
                        <Typography
                          variant='body2'
                          style={{
                            width: 'max-content',
                            textTransform: 'capitalize',
                          }}
                        >
                          {str.title}
                        </Typography>
                      </a>
                    </Link>
                  ))}
              {props.user.authenticated && (
                <Link
                  href='/admin'
                  className={`${classes.titleCont} ${classes.linkClass}`}
                >
                  <a className={`${classes.titleCont} ${classes.linkClass}`}>
                    <Typography
                      variant='body2'
                      style={{
                        fontSize: '15px',
                        fontFamily: '"Helvetica"',
                      }}
                    >
                      Admin Panel
                    </Typography>
                  </a>
                </Link>
              )}

              <div className={classes.searchCont}>
                <SearchModal style={{ padding: 'auto' }} />
              </div>
            </Container>
          </div>
        </div>
      </AppBar>
      {navLoading ? <LinearProgress /> : <div />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = { logoutUser };

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
