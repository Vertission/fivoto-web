import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

import MOCKUP_MOBILE from "../../public/mockup_mobile.png";

export default function HomeDownload() {
  const classes = useStyles();

  return (
    <Grid container justify="space-between" className={classes.root}>
      <Grid
        item
        direction="column"
        justify="center"
        alignItems="center"
        xs={12}
        lg={6}
        className={classes.grid_item_1}
      >
        <Typography
          align="center"
          variant="h4"
          color="secondary"
          className={classes.title}
        >
          DOWNLOAD FIVOTO
        </Typography>
        <a href="https://play.google.com/store/apps/details?id=com.vertission.fivoto&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
          <img
            alt="Get it on Google Play"
            src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
            className={classes.download_png}
          />
        </a>
      </Grid>
      <Grid item xs={12} lg={6}>
        <img src={MOCKUP_MOBILE} className={classes.mockup} />
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(5, 0, 5, 0),
  },
  mockup: {
    width: "100%",
  },
  grid_item_1: {
    flex: 1,
    display: "flex",
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(10),
    },
  },
  title: {
    fontWeight: "700",
  },
  download_png: {
    height: 100,
    [theme.breakpoints.down("sm")]: {
      height: 75,
    },
    [theme.breakpoints.down("xs")]: {
      height: 50,
    },
  },
}));
