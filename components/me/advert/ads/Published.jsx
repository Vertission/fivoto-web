import { gql, useQuery } from '@apollo/client';
import { format } from 'timeago.js';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Container, Card, CardActions, CardMedia, Typography, Button, CircularProgress } from '@material-ui/core';

import { Dialog, Modal } from '../../../ui';
import { Link } from '../../../common';

const ME_PUBLISHED_ADS = gql`
  query {
    me {
      publishedAds {
        id
        title
        price
        photos
        createdAt
        expireAt
      }
    }
  }
`;

export default function MeAdvertAdsPublished() {
  const classes = useStyles();

  const { data, loading } = useQuery(ME_PUBLISHED_ADS);

  if (loading)
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  else
    return (
      <Container className={classes.root}>
        {data.me.publishedAds.map((ad) => (
          <Ad {...ad} />
        ))}
      </Container>
    );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  loading: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function Ad({ id, title, price, photos, createdAt, expireAt }) {
  const classes = useStylesAd();
  const theme = useTheme();

  const [openDialog, closeDialog] = Dialog.useDialog();

  const _handleOpenClickedAd = () => {};

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
        <img src={photos[0]} className={classes.img} />
      </CardMedia>
      <div className={classes.cardContent}>
        <Typography variant='subtitle1'>{title}</Typography>
        <Typography color='primary' variant='subtitle2' className={classes.price}>
          {price}
        </Typography>

        <CardActions className={classes.cardActions}>
          <Button
            size='small'
            color='primary'
            style={{ color: theme.palette.primary.main, textDecoration: 'none' }}
            component={Link}
            href={`/ad/${id}`}
            target='_blank'
          >
            View
          </Button>
          <Button size='small' style={{ color: theme.palette.warning.main }}>
            Edit
          </Button>
          <Button size='small' style={{ color: theme.palette.error.main }} onClick={_handleOpenDeleteDialog}>
            Delete
          </Button>
        </CardActions>
        <Typography variant='caption' className={classes.expire}>
          EXP: {format(expireAt)}
        </Typography>
      </div>
    </Card>
  );
}

const useStylesAd = makeStyles((theme) => ({
  card: {
    width: `calc(25% - ${theme.spacing(5)})`,
    height: '250px',
    padding: theme.spacing(2),
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
  cardContent: {
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
  },
  img: {
    maxWidth: '100%',
    height: '100%',
  },
  price: {
    marginBottom: 'auto',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    letterSpacing: 0.5,
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  expire: {
    color: theme.palette.secondary.dark,
    textAlign: 'right',
  },
}));
