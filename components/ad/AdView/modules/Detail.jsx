import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Grid, Divider } from "@material-ui/core";

export default function AdViewDetail({
  location,
  createdAt,
  title,
  price,
  negotiable,
}) {
  const classes = useStyles();

  return (
    <Paper square className={classes.root}>
      <Grid container justify="space-between" alignItems="center">
        <Typography color="textSecondary" className={classes.location_date}>
          {location.district}, {location.city}
        </Typography>
        <Typography color="textSecondary" className={classes.location_date}>
          {dateFormat(createdAt)}
        </Typography>
      </Grid>
      <Divider />
      <Typography variant="h5" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="h6" className={classes.price}>
        {price}{" "}
        {negotiable ? (
          <Typography
            variant="body2"
            color="textSecondary"
            display="inline"
            className={classes.negotiable}
          >
            negotiable
          </Typography>
        ) : null}
      </Typography>
    </Paper>
  );
}

function dateFormat(date) {
  const newDate = new Date(date);

  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][newDate.getUTCMonth()];

  return `${month} ${newDate.getUTCDate()}, ${newDate.getUTCFullYear()}`;
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
  },
  location_date: {
    fontWeight: "500",
  },
  title: {
    fontWeight: "700",
    letterSpacing: 1.5,
    marginTop: theme.spacing(1),
  },
  price: {
    fontWeight: "600",
  },
  negotiable: {
    fontStyle: "italic",
  },
}));
