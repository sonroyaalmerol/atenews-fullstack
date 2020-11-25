import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  viewContainer: {
    position: 'relative',
    marginTop: 10,
    padding: theme.spacing(2),
    borderRadius: 10,
  },
  arrowUp: {
    position: 'absolute',
    top: -10,
    right: 20,
    width: 0,
    height: 0,
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderBottom: `10px solid ${theme.palette.primary.main}`,
  },
}));

const PopoutView = () => {
  const classes = useStyles();

  return (
    <Paper variant="outlined" className={classes.viewContainer}>
      <div className={classes.arrowUp} />
      Notifications coming soon!
    </Paper>
  );
};

export default PopoutView;