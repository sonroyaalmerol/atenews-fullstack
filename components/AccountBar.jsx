import React from 'react';

import { useRouter } from 'next/router';

import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import Avatar from '@material-ui/core/Avatar';
import BellIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';

import { useSpring, animated } from 'react-spring';

import Grow from '@material-ui/core/Grow';
import StockTextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchView from './PopoutViews/Search';
import NotificationView from './PopoutViews/Notification';
import ProfileView from './PopoutViews/Profile';

const TextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: 30,
      },
    },
  },
})(StockTextField);

const useStyles = makeStyles((theme) => ({
  account: {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    right: 0,
    marginRight: '0.5vw',
    height: 65,
    zIndex: 1500,
    width: '15vw',
    background: theme.palette.background.default,
  },
  button: {
    height: 65,
    width: 65,
  },
  search: {
    height: 105,
    position: 'fixed',
    backgroundColor: theme.palette.background.default,
    right: 'calc(15vw + 20px)',
    top: 0,
    zIndex: 1100,
  },
}));

export default function AccountBar() {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();

  const [props, set] = useSpring(() => ({ width: '0vw', opacity: 0 }));
  const [searchOpened, setSearchOpened] = React.useState(false);

  const profileView = () => (
    <ProfileView />
  );

  const notificationView = () => (
    <NotificationView />
  );

  const searchView = () => (
    <SearchView />
  );

  const [activeButton, setActiveButton] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentView, setCurrentView] = React.useState(profileView);

  const handleClick = (event, button) => {
    if (activeButton === button) {
      setActiveButton(null);
      setAnchorEl(null);
    } else {
      setActiveButton(button);
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setActiveButton(null);
    setAnchorEl(null);
    if (searchOpened) {
      set({ width: '0vw', opacity: 0 });
      setSearchOpened(false);
    }
  };

  React.useEffect(() => {
    if (activeButton === 'Search') {
      setCurrentView(searchView);
    } else if (activeButton === 'Notifications') {
      setCurrentView(notificationView);
    } else if (activeButton === 'Account') {
      setCurrentView(profileView);
    }
  }, [activeButton]);

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        <animated.div className={classes.search} style={props}>
          <Grid container alignItems="center" style={{ height: '100%' }}>
            <Grid item xs>
              <TextField
                variant="outlined"
                placeholder="Search Atenews"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <SearchIcon color={theme.palette.type === 'light' ? 'primary' : 'secondary'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </animated.div>
        <div className={classes.account}>
          <IconButton
            className={classes.button}
            color={theme.palette.type === 'light' ? 'primary' : 'secondary'}
            onClick={() => {
              if (searchOpened) {
                set({ width: '0vw', opacity: 0 });
                setSearchOpened(false);
              } else {
                set({ width: '66vw', opacity: 1 });
                setSearchOpened(true);
              }
            }}
          >
            <SearchIcon />
          </IconButton>
          <IconButton
            className={classes.button}
            color={theme.palette.type === 'light' ? 'primary' : 'secondary'}
            onClick={(e) => handleClick(e, 'Notifications')}
          >
            <BellIcon />
          </IconButton>
          <IconButton
            className={classes.button}
            color={theme.palette.type === 'light' ? 'primary' : 'secondary'}
            onClick={() => router.push('/profile')}
          >
            <Avatar src="https://lh3.googleusercontent.com/VHB9bVB8cTcnqwnu0nJqKYbiutRclnbGxTpwnayKB4vMxZj8pk1220Rg-6oQ68DwAkqO" style={{ width: 40, height: 40 }} />
          </IconButton>
          <Popper
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            placement="bottom-end"
            disablePortal={false}
            modifiers={{
              flip: {
                enabled: false,
              },
              preventOverflow: {
                enabled: true,
                boundariesElement: 'scrollParent',
              },
            }}
          >
            <Grow in={Boolean(anchorEl)}>
              {currentView}
            </Grow>
          </Popper>
        </div>
      </div>
    </ClickAwayListener>
  );
}