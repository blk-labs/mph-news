import React, { useState } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/userActions';

// Material
import { makeStyles, createStyles, useTheme } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';

// Comps
import AuthModal from '../../pages/login';
import logo from '../../public/images/logoFullColor2.png';
import navImg from '../../public/images/navImg.png';
import navClose from '../../public/images/navClose.png';
import SearchModal from './Search';
import userImg from '../../public/images/userImg.png';

// Icons
import { Facebook, Twitter, YouTube, Instagram } from '@material-ui/icons';
const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,
    imgNav: {
      padding: 0,
      minWidth: '24px',
      marginLeft: '1rem',
    },
    list: {
      width: '100vw',
      marginTop: '1rem',
    },
    navTop: {
      display: 'flex',
      padding: '0 16px',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    iconClass: {
      width: '105px',
      marginRight: 'auto',
    },
    navCont: {
      marginTop: '.5rem',
      height: '100%',
      padding: '1.5rem',
      color: 'black',
    },
    titleClass: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
      fontFamily: '"Helvetica"',
      marginBottom: 20,
    },
    authClass: {
      backgroundColor: theme.palette.secondary.light,
      color: 'white',
      width: '100%',
      borderRadius: 0,
      borderColor: '#5ba56e',
    },
    subClass: {
      color: 'white',
      width: '100%',
      borderRadius: 0,
      borderColor: '#5ba56e!important',
    },
    linkClass: {
      textAlign: 'center',
    },
    userImg: {
      width: 'auto',
      height: '24px',
      margin: 'auto 0',
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    hubClass: {
      minWidth: 24,
      maxWidth: 24,
      height: 24,
    },
  })
);

const titles = [
  { start: 'N', end: 'igeria', link: 'nigeria' },
  { start: 'I', end: 'nternational', link: 'international' },
  { start: 'S', end: 'ecurity', link: 'security' },
  { start: 'H', end: 'ealth', link: 'health' },
  { start: 'B', end: 'usiness', link: 'business' },
  { start: 'O', end: 'ther', link: 'other' },
  { start: 'N', end: 'ational assembly', link: 'documents' },
  { start: 'V', end: 'oices', link: 'voices' },
];

export function MobileNav(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [anchor, setAnchor] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleDrawer = () => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setAnchor(!anchor);
  };

  const handleLogout = (evt) => {
    props.logoutUser();
    console.log('working');
  };
  /*      onClick={toggleDrawer()}
		  onKeyDown={toggleDrawer()}*/

  const markup = (
    <div className={classes.list} role='presentation'>
      <span className={classes.navTop}>
        <img src={logo.src} alt='' className={classes.iconClass} />
        <div className='flex align-items: center'>
          <SearchModal className='pr-2' />
          <img
            src={navClose.src}
            alt=''
            onClick={toggleDrawer()}
            style={{ cursor: 'pointer', width: 24, marginLeft: 16 }}
          />
        </div>
      </span>
      <div className={classes.navCont}>
        <div style={{ textTransform: 'inherit', fontSize: 25 }}>
          {titles.map((tit, i) => (
            <Link
              href={
                tit.link == 'documents'
                  ? `/documents`
                  : `/topics/${tit.link}` && tit.link == 'voices'
                  ? `/voices`
                  : `/topics/${tit.link}`
              }
              onClick={toggleDrawer()}
              key={i}
            >
              <a className={classes.linkClass}>
                <span className={classes.titleClass}>
                  <Typography
                    variant='p'
                    style={{
                      fontFamily: '"Helvetica"',
                    }}
                  >
                    {tit.start}
                  </Typography>
                  <p
                    style={{
                      fontFamily: '"Helvetica"',
                    }}
                  >
                    {tit.end}
                  </p>
                </span>
              </a>
            </Link>
          ))}
          {props.user.authenticated && (
            <Link
              href='/admin'
              className={`${classes.titleCont} ${classes.linkClass}`}
            >
              <a
                className={classes.linkClass}
                style={{
                  display: 'block',
                }}
              >
                <span className={classes.titleClass}>
                  <Typography
                    variant='p'
                    style={{
                      fontFamily: '"Helvetica"',
                    }}
                  >
                    Admin Panel
                  </Typography>
                </span>
              </a>
            </Link>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span>
            <Container maxWidth='lg' style={{ display: 'contents' }}>
              <div className={classes.topClass}>
                {props.user.authenticated ? (
                  <Link href='/'>
                    <a
                      color='default'
                      style={{ textTransform: 'capitalize', padding: '0 20px' }}
                      onClick={handleLogout}
                    >
                      <Typography
                        variant='caption'
                        style={{
                          fontSize: 25,
                          fontFamily: '"Helvetica"',
                          fontWeight: 600,
                          marginLeft: '8px',
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
                        padding: '0 20px',
                        display: 'flex',
                        alignItems: 'center',
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
                          fontSize: 25,
                          fontFamily: '"Helvetica"',
                          fontWeight: 600,
                          marginLeft: '8px',
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
        </div>

        <div className='flex justify-center mt-4'>
          <a
            target='_blank'
            rel='noreferrer'
            style={{ marginRight: '15px' }}
            className={classes.linkClass}
            href='https://web.facebook.com/My-Political-Hub-106231897488181/'
          >
            <Facebook fontSize='medium' />
          </a>
          <a
            target='_blank'
            style={{ marginRight: '15px' }}
            rel='noreferrer'
            className={classes.linkClass}
            href='https://www.twitter.com/my_politicalhub'
          >
            <Twitter fontSize='medium' />
          </a>
          <a
            target='_blank'
            style={{ marginRight: '15px' }}
            rel='noreferrer'
            className={classes.linkClass}
            href='https://www.youtube.com/channel/UCwnOgB3veQgUkuB0QCBX55w'
          >
            <YouTube fontSize='medium' />
          </a>
          <a
            target='_blank'
            rel='noreferrer'
            className={classes.linkClass}
            href='https://www.instagram.com/my_politicalhub'
          >
            <Instagram fontSize='medium' />
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <React.Fragment key={anchor}>
        <Button onClick={toggleDrawer()} className={classes.imgNav}>
          <img src={navImg.src} alt='' className='w-6' />
        </Button>
        <Drawer
          anchor='left'
          open={anchor}
          onClose={toggleDrawer()}
          onOpen={toggleDrawer()}
        >
          {markup}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = { logoutUser };

export default connect(mapStateToProps, mapDispatchToProps)(MobileNav);
