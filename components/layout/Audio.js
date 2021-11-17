import React from 'react';
import {
  Paper,
  Button,
  Grid,
  Box,
  ThemeProvider,
  Typography,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { ClosedCaption } from '@material-ui/icons';
import AudioPlayer from 'material-ui-audio-player';
import theme from '../../styles/AudioTheme';

export default function App() {
  const RegisPlayer = ({
    useStyles = {},
    color = 'primary',
    size = 'default',
    elevation = 1,
    transcript = '',
    ...rest
  }) => {
    const [openDialog, setOpenDialog] = React.useState(false);
    const iconSize = {
      small: 20,
      default: 24,
      large: 36,
      inherit: 'inherit',
    }[size];
    const fontSize = {
      small: theme.typography.body2.fontSize,
      default: theme.typography.body1.fontSize,
      large: theme.typography.body1.fontSize,
    }[size];
    const spacing = {
      small: { x: 1, y: 0.5, z: 1 },
      default: { x: 1, y: 0.75, z: 1 },
      large: { x: 1.5, y: 1.5, z: 2 },
    }[size];
    const minWidth = {
      small: 220,
      default: 250,
      large: 320,
    }[size];

    const useClasses = makeStyles((theme) => ({
      paper: {
        minWidth: minWidth,
        boxShadow: 'none',
      },
      root: {
        background: 'none',
        '& .MuiGrid-item': {
          display: 'flex',
          alignItems: 'center',
        },
        "& div[class*='volumeControlContainer']": {
          display: 'none',
        },
        "& div[class*='volumeIconContainer']": {
          display: 'none',
        },
        "& div[class*='sliderContainer']": {
          margin: '0',
        },
        "& div[class*='commonContainer']": {
          '&:first-child': {
            display: 'none',
          },
        },
        '& .MuiSvgIcon-root': {
          fontSize: iconSize,
        },
      },
      progressTime: {
        fontSize: 11,
        fontFamily: '"Helvetica"',
        display: 'initial',
        '&:nth-last-child': {
          display: 'none',
        },
      },
      ...useStyles,
    }));
    const customIcon = makeStyles((theme) => ({
      root: {
        cursor: 'pointer',
        '&:hover': {
          color:
            theme.palette[
              ['primary', 'secondary'].includes(color) ? color : 'primary'
            ].light,
        },
      },
    }));
    const classes = useClasses();
    const customIconClasses = customIcon();
    return (
      <React.Fragment>
        <Paper elevation={elevation} className={classes.paper}>
          <Box py={spacing.y}>
            <Grid container alignItems='center'>
              <Grid item xs>
                <AudioPlayer
                  {...rest}
                  variation={color}
                  elevation={0}
                  useStyles={useClasses}
                  spacing={spacing.z}
                />
              </Grid>
              {transcript !== '' && (
                <Grid item style={{ display: 'flex' }}>
                  <ClosedCaption
                    fontSize={size}
                    className={customIconClasses.root}
                    color={color}
                    onClick={() => setOpenDialog(true)}
                  />
                </Grid>
              )}
            </Grid>
          </Box>
        </Paper>
        <Dialog open={openDialog} onBackdropClick={() => setOpenDialog(false)}>
          <DialogTitle disableTypography>
            <Typography variant='h3'>Audio transcript</Typography>
          </DialogTitle>
          <DialogContent dividers>
            {transcript !== '' &&
              transcript.split('\n').map((item, index) => (
                <Typography paragraph key={index}>
                  {item}
                </Typography>
              ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  };

  const styles = {
    paper: {
      minWidth: 320,
      color: 'black',
    },
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <div>
          <RegisPlayer
            color='secondary'
            size='small'
            src='https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
          />
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
}
