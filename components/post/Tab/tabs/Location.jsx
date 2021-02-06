import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  useMediaQuery,
  CircularProgress,
  Paper,
  CardActionArea,
  Typography,
  Button,
  SwipeableDrawer,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

import { useQuery } from '@apollo/client';
import schema from '../../../../apollo/schema';

import { dispatch } from '../../Context';

export default function TabsLocation({ setActiveStep }) {
  const classes = useStyles();
  const theme = useTheme();
  const showDrawer = useMediaQuery(theme.breakpoints.down('sm'));

  const [openDialog, setOpenDialog] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    district: null,
    cities: [],
  });

  const { data, loading } = useQuery(schema.query.LOCATION);

  const _onSelectLocation = ({ district, cities }) => {
    setSelectedLocation({ district, cities });
    showDrawer ? setOpenDrawer(true) : setOpenDialog(true);
  };

  const _onSelect = (city) => {
    dispatch('SET_LOCATION', {
      district: selectedLocation.district,
      city,
    });
    setOpenDialog(false);
    setOpenDrawer(false);
    setActiveStep(2);
  };

  const CitiesButtons = () => {
    return selectedLocation.cities.map((city) => (
      <Button
        key={city}
        variant='contained'
        color='primary'
        size='large'
        fullWidth
        classes={{
          root: classes.dialog_button_root,
          label: classes.dialog_button_label,
        }}
        onClick={() => _onSelect(city)}
      >
        {city}
      </Button>
    ));
  };

  if (loading)
    return (
      <Container className={classes.root_loading}>
        <CircularProgress open={true} />
      </Container>
    );

  return (
    <React.Fragment>
      <Container className={classes.root}>
        <Grid container direction='row' justify='space-evenly' alignItems='center' className={classes.grid}>
          {data?.location.map(({ district, cities }) => (
            <Paper
              key={district}
              square
              className={classes.paper}
              onClick={() => _onSelectLocation({ district, cities })}
            >
              <CardActionArea className={classes.paper_card}>
                <Typography className={classes.paper_title} align='center'>
                  {district}
                </Typography>
              </CardActionArea>
            </Paper>
          ))}
        </Grid>
      </Container>
      {/* DIALOG  */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle className={classes.paper_title}>{selectedLocation.district}</DialogTitle>
        <DialogContent className={classes.dialog_content}>
          <CitiesButtons />
        </DialogContent>
      </Dialog>
      {/* DRAWER  */}
      <SwipeableDrawer
        anchor='bottom'
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{
          paperAnchorBottom: classes.drawer,
          paper: classes.drawer_paper,
        }}
      >
        <CitiesButtons />
      </SwipeableDrawer>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  root_loading: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(10),
  },
  grid: {
    flexWrap: 'wrap',
    width: '100%',
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(3),
    width: '30%',
    height: 70,
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(2),
      width: '45%',
      height: 50,
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: 40,
    },
  },
  paper_card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper_title: {
    textTransform: 'capitalize',
    fontWeight: '500',
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.caption.fontSize,
    },
  },
  dialog_content: {
    width: 600,
    [theme.breakpoints.down('sm')]: {
      width: 400,
    },
  },
  dialog_button_root: {
    margin: theme.spacing(1.5, 0),
    color: theme.palette.secondary.main,
  },
  dialog_button_label: {
    fontWeight: 700,
    padding: theme.spacing(1, 0),
    textTransform: 'capitalize',
  },
  drawer: {
    padding: theme.spacing(3),
  },
  drawer_paper: {
    maxHeight: '80%',
  },
}));
