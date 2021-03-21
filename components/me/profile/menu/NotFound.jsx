import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

export default function MeProfileNotFound() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant='h4' className={classes.message}>
        Oops! There's no page here.
      </Typography>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: theme.spacing(20),
    color: theme.palette.grey[500],
  },
}));
