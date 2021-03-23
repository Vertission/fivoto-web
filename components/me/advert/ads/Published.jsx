import { useState } from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import { format } from 'timeago.js';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Container, Card, CardActions, CardMedia, Typography, Button, CircularProgress } from '@material-ui/core';

import { Dialog, Modal, PostButton } from '../../../ui';
import { Link } from '../../../common';

import { useQueryMe } from '../../../../apollo/query';
import { useDeleteMutation } from '../../../../apollo/mutation/ad';

import { dispatch } from '../../../post/Context';

export default function MeAdvertAdsPublished() {
  const classes = useStyles();

  const { data, loading } = useQuery(ME_PUBLISHED_ADS);

  if (loading)
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  else if (data.me.publishedAds.length)
    return (
      <Container className={classes.root}>
        {data.me.publishedAds.map((ad) => (
          <Ad key={ad.id} {...ad} />
        ))}
      </Container>
    );
  else
    return (
      <div className={classes.post}>
        <Typography gutterBottom>No Ads published yet!</Typography>
        <PostButton />
      </div>
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
  post: { height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' },
}));

function Ad({ id, slug, title, price, photos, expireAt }) {
  const classes = useStylesAd();
  const theme = useTheme();

  const [deleteAd, { loading: deleteAdLoading }] = useDeleteMutation();

  const [openDialog, closeDialog] = Dialog.useDialog();
  const router = useRouter();

  const [editLoading, setEditLoading] = useState(false);
  const [, { client }] = useQueryMe();

  const _handleEditAd = () => {
    setEditLoading(true);
    client
      .query({ query: AD_EDIT, variables: { id } })
      .then(({ data }) => {
        console.log({ data });
        dispatch('RESET_CONTEXT');
        const photos = data.ad.photos.map((photo) => {
          return { preview: photo, source: 'CLOUD' };
        });

        // TODO: move this refactoring logics into set_context the photos and price replace
        dispatch('SET_CONTEXT', {
          ...data.ad,
          price: data.ad.price.replace('LKR ', '').replace(/,/g, ''),
          photos,
          removePhotos: [],
        });

        setEditLoading(false);
        router.push(`/post`);
      })
      .catch((error) => {
        setEditLoading(false);
      });
  };

  const _handleOpenDeleteDialog = () => {
    openDialog({
      children: (
        <Modal
          title='Delete ad?'
          description='Are you sure you want to permanently delete this ad?'
          closeTitle='cancel'
          handleClose={closeDialog}
          actions={[
            {
              title: 'Yes, delete ad',
              style: { background: theme.palette.error.main },
              onClick: () => {
                deleteAd(id);
                closeDialog();
              },
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
            href={`/ad/${slug}`}
            target='_blank'
          >
            View
          </Button>
          <Button
            size='small'
            disabled={editLoading}
            style={{ color: editLoading ? theme.palette.grey[500] : theme.palette.warning.main }}
            onClick={_handleEditAd}
          >
            Edit
          </Button>
          <Button
            size='small'
            style={{ color: deleteAdLoading ? theme.palette.grey[500] : theme.palette.error.main }}
            disabled={deleteAdLoading}
            onClick={_handleOpenDeleteDialog}
          >
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
    height: '40%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0.5),
  },
  cardContent: {
    height: '60%',
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

const ME_PUBLISHED_ADS = gql`
  query {
    me {
      publishedAds {
        id
        slug
        title
        price
        photos
        expireAt
      }
    }
  }
`;

const AD_EDIT = gql`
  query($id: ID!) {
    ad(id: $id) {
      id
      status
      category {
        field
        item
      }
      location {
        district
        city
      }
      title
      price
      description
      photos
      fields
      phone
    }
  }
`;
