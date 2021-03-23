import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import MaterialLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';

import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import AndroidIcon from '@material-ui/icons/Android';
// import AppleIcon from "@material-ui/icons/Apple";

import Link from '../Link';

export default function Footer() {
  const classes = useStyles();

  const Bottom = () => (
    <div className={classes.bottom}>
      <Typography variant='caption' color='secondary'>
        &#169; 2020 - {new Date().getFullYear()} Fivoto. All Rights Reserved
      </Typography>
      <div className={classes.bottomLinks}>
        <MaterialLink href='https://www.fivoto.com/terms'>
          <Typography color='secondary' variant='caption' className={classes.linkText}>
            Terms & Conditions
          </Typography>
        </MaterialLink>
        <MaterialLink href='https://www.fivoto.com/privacy'>
          <Typography color='secondary' variant='caption' className={classes.linkText}>
            Privacy Policy
          </Typography>
        </MaterialLink>
        <Link href='/sitemap'>
          <Typography color='secondary' variant='caption' className={classes.linkText}>
            Sitemap
          </Typography>
        </Link>
      </div>
    </div>
  );

  const About = () => (
    <div className={classes.middleContents}>
      <Typography color='secondary' align='center'>
        ABOUT
      </Typography>
      <Typography color='secondary' variant='caption' align='center' className={classes.aboutTypography}>
        About Us
      </Typography>
      <Typography color='secondary' variant='caption' align='center' className={classes.aboutTypography}>
        Contact Us
      </Typography>
      <Typography color='secondary' variant='caption' align='center' className={classes.aboutTypography}>
        Feedback
      </Typography>
    </div>
  );

  const Apps = () => {
    const _onClick = (link) => {
      const newWindow = window.open(link, '_blank', 'noopener,noreferrer');
      if (newWindow) newWindow.opener = null;
    };

    const Stores = ({ style }) => {
      return [
        {
          store: 'Google Play',
          icon: <AndroidIcon fontSize='large' style={{ color: '#fff' }} />,
          link: 'https://play.google.com/store/apps/details?id=com.vertission.fivoto',
        },
      ].map(({ store, icon, link }) => (
        <Paper key={store} className={classes.storeRoot} style={style} onClick={() => _onClick(link)} elevation={0}>
          <div className={classes.storeIconContainer}>{icon}</div>
          <div className={classes.storeText}>
            <Typography variant='overline' style={{ lineHeight: 'normal' }}>
              DOWNLOAD FIVOTO ON
            </Typography>
            <Typography variant='h6' style={{ lineHeight: 'normal' }}>
              {store}
            </Typography>
          </div>
        </Paper>
      ));
    };

    return (
      <div className={classes.middleContents}>
        <Typography color='secondary' align='center'>
          APPS
        </Typography>
        <Stores />
      </div>
    );
  };

  const SocialMedia = () => {
    return (
      <div className={classes.middleContents}>
        <Typography color='secondary' align='center'>
          SOCIAL MEDIA
        </Typography>
        <Typography color='secondary' variant='caption' align='center' className={classes.socialMediaAbout}>
          Follow us on social media to find out the latest updates on our progress.
        </Typography>
        <div className={classes.socialMediaContainer}>
          <IconButton color='secondary' target={'_blank'} href='https://www.instagram.com/fivoto'>
            <InstagramIcon fontSize='large' />
          </IconButton>
          <IconButton color='secondary' target={'_blank'} href='https://www.facebook.com/fivoto'>
            <FacebookIcon fontSize='large' />
          </IconButton>
          <IconButton color='secondary' target={'_blank'} href='https://twitter.com/fivoto'>
            <TwitterIcon fontSize='large' />
          </IconButton>
        </div>
      </div>
    );
  };

  return (
    <footer className={classes.root}>
      <Container>
        <div className={classes.middleContainer}>
          <Apps /> <SocialMedia />
        </div>
        <Divider classes={{ root: classes.divider }} />
        <Bottom />
      </Container>
    </footer>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    marginTop: theme.spacing(5),
    padding: theme.spacing(5, 3, 8, 3),
    // position: 'absolute',
    // bottom: 0,
    // width: '100%',
  },
  logoImg: {
    width: '33px',
    marginRight: theme.spacing(0.5),
  },
  middleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  bottomLinks: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  linkText: {
    marginLeft: theme.spacing(3),
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(3),
      marginBottom: theme.spacing(2),
    },
  },
  bottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      alignItems: 'center',
    },
  },
  divider: {
    background: theme.palette.secondary.main,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  aboutTypography: {
    display: 'block',
    marginTop: theme.spacing(1),
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  storeRoot: {
    background: theme.palette.primary.light,
    width: '220px',
    height: '60px',
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',
    display: 'flex',
    marginTop: theme.spacing(1),
  },
  storeIconContainer: {
    background: theme.palette.primary.dark,
    width: '30%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeText: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    padding: theme.spacing(0.5),
  },
  socialMediaContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  middleContents: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
    },
  },
  socialMediaAbout: {
    display: 'flex',
  },
}));
