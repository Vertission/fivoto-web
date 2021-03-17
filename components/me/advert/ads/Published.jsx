import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Container, Card, CardActions, CardMedia, Typography, Button } from '@material-ui/core';

import { Dialog, Modal } from '../../../ui';

export default function MeAdvertAdsPublished() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Ad />
      <Ad />
      <Ad />
      <Ad />
      <Ad />
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

function Ad() {
  const classes = useStylesAd();
  const theme = useTheme();

  const [openDialog, closeDialog] = Dialog.useDialog();

  const _handleOpenDeleteDialog = () => {
    openDialog({
      children: (
        <Modal
          title='Email already exist'
          description={`An account with email address  already exists.`}
          closeTitle='cancel'
          handleClose={closeDialog}
          actions={[
            {
              title: 'Delete',
              onPress: () => {},
            },
          ]}
        />
      ),
    });
  };

  return (
    <Card className={classes.card}>
      <CardMedia component='div' className={classes.cardMedia}>
        <img src='https://material-ui.com/static/images/cards/contemplative-reptile.jpg' className={classes.img} />
      </CardMedia>
      <Typography variant='body2' className={classes.title}>
        Baseus Superlative Multifunctional Hub WITH iWatch Wireless Charger
      </Typography>

      <CardActions className={classes.cardActions}>
        <Button size='small' color='primary'>
          View
        </Button>
        <Button size='small' style={{ color: theme.palette.warning.main }}>
          Edit
        </Button>
        <Button size='small' style={{ color: theme.palette.error.main }} onClick={_handleOpenDeleteDialog}>
          Delete
        </Button>
      </CardActions>
      <div className={classes.date}>
        <Typography variant='caption' className={classes.time}>
          20-12-2020
        </Typography>
        <Typography variant='caption' className={classes.time}>
          EXP: 12 days
        </Typography>
      </div>
    </Card>
  );
}

const useStylesAd = makeStyles((theme) => ({
  card: {
    width: `calc(25% - ${theme.spacing(5)})`,
    height: '250px',
    margin: theme.spacing(2.5),
    [theme.breakpoints.down('md')]: {
      width: `calc(33.33% - ${theme.spacing(4)})`,
      margin: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      width: `calc(50% - ${theme.spacing(2)})`,
      margin: theme.spacing(1),
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  cardMedia: {
    width: 'auto',
    height: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0.5),
  },
  img: {
    maxWidth: '100%',
    height: '100%',
  },
  title: {
    padding: theme.spacing(2),
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 'auto',
  },
  date: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  time: {
    color: theme.palette.secondary.dark,
  },
}));
