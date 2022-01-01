import React, { useState } from 'react';
import Link from 'next/link';

// Material
import { makeStyles, createStyles, useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';

// Icons
import SearchIcon from '@material-ui/icons/Search';

// Comps
import SearchModal from './SearchModal';

const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,
    iconClass: {
      cursor: 'pointer',
      [theme.breakpoints.down('sm')]: {
        fontSize: 24,
      },
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);

export default function Search(props) {
  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleOpen}>
        <SearchIcon className={classes.iconClass} />
      </div>
      {
        open && (
          <Backdrop
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}>
            <SearchModal handleClose={handleClose} />
          </Backdrop>
        )
      }
    </div>
  );
}
