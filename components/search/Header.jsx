import React, { useState } from 'react';

import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

export default function SearchHeader({ setInput, params }) {
  const classes = useStyles();

  const [search, setSearch] = useState('');

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <div className={classes.search}>
            <IconButton
              type='submit'
              className={classes.searchIcon}
              onClick={() => setInput(search)}
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
            />
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
