import { createMuiTheme } from '@material-ui/core/styles';

import { grey, red, green, orange, blue } from '@material-ui/core/colors';

/*
    Palette
*/
const palette = {
  //type: "dark",
  primary: {
    main: '#333A4A',
  },
  secondary: {
    main: '#000',
  },
  tertiary: {
    main: '#FFD200',
    dark: '#DFB200',
    light: '#FFE311',
    contrastText: '#000000',
  },
  text: {
    //primary: "#231F20",
  },
  divider: grey[200],
  background: {},
  error: {
    main: red[500],
  },
  success: {
    main: green[500],
  },
  warning: {
    main: orange[500],
  },
  info: {
    main: blue[500],
  },
  action: {},
};

/*
    Shape
*/
const shape = {
  borderRadius: 6,
};

/*
    Transitions
*/
const transitions = {
  duration: {
    enteringScreen: 500,
    leavingScreen: 500,
  },
};

/*
    Props
*/
const props = {
  MuiTabs: {
    indicatorColor: 'primary',
  },
  MuiTextField: {
    variant: 'outlined',
    size: 'small',
  },
  MuiButton: {},
  MuiSelect: {
    margin: 'dense',
    variant: 'outlined',
  },
  MuiTextField: {
    variant: 'outlined',
    size: 'small',
  },
};

/*
    Overrides
*/
const overrides = {
  /*
        Target release: beyond MVP
        MuiSlider
    */

  MuiSlider: {
    root: {
      // color: '#6B3FA0',
    },

    thumb: {
      display: 'none',
    },
    active: {},
    valueLabel: {
      left: 'calc(-50%)',
      top: -40,
    },
    track: {
      height: 4,
      borderRadius: 30,
      backgroundColor: '#6B3FA0',
    },
    rail: {
      height: 4,
      borderRadius: 30,
      backgroundColor: '#E1E1E1',
    },
    mark: {
      width: 6,
      height: 6,
      position: 'absolute',
      marginTop: -1,
      marginLeft: -1,
      borderRadius: 4,
      backgroundColor: 'currentColor',
    },
    markLabel: {
      opacity: 0.5,
      '&Active': {
        opacity: 1,
      },
      '&:nth-child(3n+2)': {
        transform: 'translatex(0)',
      },
      '&:nth-last-child(2)': {
        transform: 'translatex(-90%)',
      },
    },
  },
  // Narrowing spacing in the dropdown lists after icon
  MuiListItemIcon: {
    root: {
      minWidth: 40,
    },
  },
  // Matching font size with body1
  MuiButton: {
    label: {
      fontSize: 18,
    },
    text: {
      textTransform: 'none',
    },
    contained: {
      textTransform: 'none',
    },
    outlined: {
      textTransform: 'none',
    },
  },
  // Changing default table border to match divider color
  MuiTableCell: {
    root: {
      borderBottom: '1px solid ' + palette.divider,
    },
  },
  // Matching input font size with body1
  MuiInput: {
    fontSize: 18,
    root: {
      fontSize: 18,
    },
  },
  MuiStepper: {
    root: {
      background: 'none',
      border: 'none',
      padding: 0,
    },
  },
  // Colors for Completed/Active icons in steppers
  MuiStepIcon: {
    root: {},
    completed: {
      color: palette.success.main + '!important',
    },
    active: {
      color: palette.warning.main + '!important',
    },
  },
  // Matching font size with body1
  MuiTab: {
    wrapper: {
      fontSize: 18,
      textTransform: 'none',
    },
  },
  // Matching font size with body1
  MuiTooltip: {
    tooltip: {
      fontSize: 18,
    },
  },
  // Matching font size with body1
  MuiAlert: {
    root: {
      fontSize: 18,
    },
  },
  // Making progress indicator thicker
  MuiLinearProgress: {
    root: {
      height: '8px',
      borderRadius: shape.borderRadius,
    },
    bar: {
      borderRadius: shape.borderRadius,
    },
  },
  // Making progress indicator thicker and adding round caps
  MuiCircularProgress: {
    circle: {
      strokeLinecap: 'round',
    },
  },
  // Matching font size with body1
  MuiChip: {
    label: {
      fontSize: 18,
    },
  },
};

const theme = {
  title: 'Regis project theme',
  palette: palette,
 
  shape: shape,
  spacing: 8,
  transitions: transitions,
  props: props,
  overrides: overrides,
};

export default createMuiTheme(theme);
export { theme as sourceTheme };
