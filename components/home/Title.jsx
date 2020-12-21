import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

export default function HomeDownload() {
  const classes = useStyles();

  return (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      className={classes.root}
    >
      <Typography
        variant='h1'
        color='secondary'
        align='center'
        className={classes.title}
      >
        FIVOTO
      </Typography>
      <Typography
        variant='h4'
        color='secondary'
        align='center'
        className={classes.title}
      >
        Buy Anything, Sell Anywhere
      </Typography>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(5, 0, 5, 0),
    padding: theme.spacing(5),
  },
  title: {
    fontWeight: '700',
  },
}));
