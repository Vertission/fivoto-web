import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash';

import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  InputBase,
  IconButton,
  SwipeableDrawer,
  Typography,
  Button,
  useMediaQuery,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LabelIcon from '@material-ui/icons/Label';
import HomeIcon from '@material-ui/icons/Home';

import { Link } from '../common';

import { dispatch, Context } from './modules/context';

import { LocationSelector, CategorySelector } from './modules/header/index';

export default function SearchHeader({ search, setSearch }) {
  const classes = useStyles();
  const theme = useTheme();
  const isSMDown = useMediaQuery(theme.breakpoints.down('sm'));

  const [toggleLocation, setToggleLocation] = useState(false);
  const [toggleCategory, setToggleCategory] = useState(false);

  const { location, category } = useContext(Context);

  const router = useRouter();

  // const [search, setSearch] = useState(state.query);

  const _onUpdateQuery = (query, value) => {
    router.push({
      query: Object.assign({ ...router.query }, { [query]: value }),
    });
  };

  const _onHandleSearchQuery = (query) => {
    setSearch(query);
    _onUpdateQuery('query', query);
  };

  return (
    <div>
      <AppBar position='static'>
        <Toolbar className={classes.toolbar}>
          {/* LOCATION SELECTOR */}
          <Button
            variant='contained'
            color='primary'
            startIcon={<LocationOnIcon color='secondary' />}
            className={classes.button}
            classes={{ label: classes.button_label }}
            onClick={() => setToggleLocation(true)}
          >
            <Typography noWrap variant='button'>
              {location.city || location.district || 'location'}
            </Typography>
          </Button>
          {/* CATEGORY SELECTOR */}
          <Button
            variant='contained'
            color='primary'
            startIcon={<LabelIcon color='secondary' />}
            className={classes.button}
            classes={{ label: classes.button_label }}
            onClick={() => setToggleCategory(true)}
          >
            <Typography noWrap variant='button'>
              {category.item || category.field || 'category'}
            </Typography>
          </Button>

          <div className={classes.search}>
            <IconButton type='submit' className={classes.searchIcon} onClick={() => _onHandleSearchQuery(search)}>
              <SearchIcon color='inherit' />
            </IconButton>
            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              onKeyPress={(e) => {
                if (e.key === 'Enter') _onHandleSearchQuery(search);
              }}
            />
            <IconButton
              type='submit'
              style={{ visibility: _.isEmpty(search) ? 'hidden' : 'initial' }}
              className={classes.searchIcon}
              onClick={() => _onHandleSearchQuery('')}
            >
              <CloseIcon color='inherit' />
            </IconButton>
          </div>

          <IconButton component={Link} href={`/`} className={classes.buttonHome}>
            <HomeIcon fontSize='large' />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* LOCATION DRAWER */}
      <SwipeableDrawer
        anchor='left'
        open={toggleLocation}
        onOpen={() => setToggleLocation(true)}
        onClose={() => setToggleLocation(false)}
      >
        <LocationSelector toggleDrawer={setToggleLocation} />
      </SwipeableDrawer>
      {/* CATEGORY DRAWER */}
      <SwipeableDrawer
        anchor={isSMDown ? 'right' : 'left'}
        open={toggleCategory}
        onOpen={() => setToggleCategory(true)}
        onClose={() => setToggleCategory(false)}
      >
        <CategorySelector toggleDrawer={setToggleCategory} />
      </SwipeableDrawer>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(5),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1, 0.5, 2, 1),
      display: 'flex',
      order: -1,
      width: '100%',
    },
  },
  searchIcon: {
    height: '100%',
    padding: 10,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    transition: theme.transitions.create('width'),
    width: '100%',
    marginLeft: 'auto',
    [theme.breakpoints.up('md')]: {
      width: 400,
      '&:focus': {
        width: 450,
      },
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1, 1, 1, 0.1),
    },
  },
  button: {
    boxShadow: 'none',
    width: 150,
    [theme.breakpoints.down('sm')]: {
      width: '50%',
    },
  },
  toolbar: {
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      margin: theme.spacing(2, 0, 3, 0),
    },
  },
  button_label: {
    color: theme.palette.secondary.main,
  },
  buttonHome: {
    marginLeft: 'auto',
  },
}));
