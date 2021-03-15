import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Typography } from '@material-ui/core';

import { Avatar } from '../../ui';

import { useQueryMe } from '../../../apollo/query';

export default function MeSectionDashboard() {
  const classes = useStyles();

  // const [user, { loading: userLoading }] = useQueryMe();

  // if (userLoading)
  //   return (
  //     <div className={classes.root_circular}>
  //       <CircularProgress />
  //     </div>
  //   );

  return (
    <div className={classes.root}>
      {/* PROFILE IMAGE  */}
      <Avatar url='https://material-ui.com/static/images/avatar/1.jpg' name='usama' className={classes.avatar} />
      {/* USER NAME  */}
      <Typography variant='h6' gutterBottom>
        Usama Asfar
      </Typography>
      {/* LOCATION  */}
      <Typography variant='subtitle2' color='textSecondary'>
        Kandy, Akurana
      </Typography>

      {/* ADS, FOLLOWERS, FOLLOWING  */}
      <div className={classes.aff}>
        {/* ADS  */}
        <div className={classes.aff_container}>
          <Typography variant='h6'>78</Typography>
          <Typography color='textSecondary'>Ads</Typography>
        </div>
        {/* FOLLOWERS  */}
        {/* <div className={classes.aff_container}>
          <Typography variant='h6'>78</Typography>
          <Typography color='textSecondary'>Followers</Typography>
        </div> */}
        {/* FOLLOWING  */}
        {/* <div className={classes.aff_container}>
          <Typography variant='h6'>78</Typography>
          <Typography color='textSecondary'>Following</Typography>
        </div> */}
      </div>

      {/* MEMBER SINCE  */}
      <Typography color='textSecondary' className={classes.member}>
        Member since 2013,02,5
      </Typography>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  avatar: {
    width: 120,
    height: 120,
  },
  aff: {
    display: 'flex',
    marginTop: theme.spacing(5),
    width: 400,
    justifyContent: 'space-around',
  },
  aff_container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  member: {
    marginTop: theme.spacing(5),
    fontSize: 14,
  },
}));
