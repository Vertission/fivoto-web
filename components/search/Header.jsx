import React, { useState } from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash';

import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

import { dispatch } from './modules/context';

export default function SearchHeader() {
  const classes = useStyles();

  const router = useRouter();

  const [search, setSearch] = useState(router.query?.query);

  const _onUpdateQuery = (query, value) => {
    router.push({
      query: Object.assign({ ...router.query }, { [query]: value }),
    });
  };

  const _onHandleSearchQuery = (query) => {
    setSearch(query);
    dispatch('SET_QUERY', query);
    _onUpdateQuery('query', query);
  };

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <div className={classes.search}>
            <IconButton
              type='submit'
              className={classes.searchIcon}
              onClick={() => _onHandleSearchQuery(search)}
            >
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
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
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
      marginRight: theme.spacing(0.5),
      marginLeft: theme.spacing(1),
      display: 'flex',
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
}));
