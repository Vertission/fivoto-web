import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { Logo } from '../ui';

export default function HomeHeader({}) {
  const classes = useStyles();
  const router = useRouter();

  const [search, setSearch] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      router.push(`/search?query=${search}`);
    }
  };

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <Logo className={classes.logo} />
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
              onKeyPress={handleKeyPress}
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
  logo: {
    cursor: 'pointer',
    width: 40,
    [theme.breakpoints.down('sm')]: {
      width: 30,
    },
  },
}));
