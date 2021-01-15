import { useState } from 'react';
import _ from 'lodash';
import schema from '../../apollo/schema';
import { useQuery } from '@apollo/client';

import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';

const SearchTextField = withStyles((theme) => ({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        [theme.breakpoints.down('sm')]: {
          borderRadius: theme.shape.borderRadius,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderBottomWidth: 0,
        },
      },
    },
  },
}))(TextField);

const CategoryTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: 0,
      },
    },
  },
})(TextField);

const LocationTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: 0,
      },
    },
  },
})(TextField);

// TODO: add category, location gql query
export default function HomeDownload() {
  const classes = useStyles();

  const [query, setQuery] = useState(null);
  const [category, setCategory] = useState(null);
  const [location, setLocation] = useState(null);

  const handleSubmit = () => {
    console.log({ query, category, location });
  };

  const { data: categoryData } = useQuery(schema.query.CATEGORY);
  const { data: locationData } = useQuery(schema.query.LOCATION);

  const categoryOptions = categoryData?.category.map(({ category, items }) => {
    return items.map((item) => ({
      category: _.upperCase(category),
      item: _.capitalize(item),
    }));
  });

  const locationOptions = locationData?.location.map(({ district, cities }) => {
    return cities.map((city) => ({
      district: _.upperCase(district),
      city: _.capitalize(city),
    }));
  });

  return (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='center'
      className={classes.root}
    >
      {/* SEARCH INPUT  */}
      <SearchTextField
        label='Search'
        variant='outlined'
        className={classes.search}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {/* CATEGORY INPUT  */}
      <Autocomplete
        options={_.flatten(categoryOptions).sort(
          (a, b) => -b.category.localeCompare(a.category)
        )}
        getOptionLabel={(option) => option.item}
        groupBy={(option) => option.category}
        className={classes.category}
        // inputValue={category}
        onChange={(e, v) => setCategory(v)}
        renderInput={(params) => (
          <CategoryTextField {...params} label='Category' variant='outlined' />
        )}
      />
      {/* LOCATION INPUT  */}
      <Autocomplete
        options={_.flatten(locationOptions).sort(
          (a, b) => -b.district.localeCompare(a.district)
        )}
        getOptionLabel={(option) => option.city}
        groupBy={(option) => option.district}
        className={classes.location}
        // inputValue={location}
        onChange={(e, v) => setLocation(v)}
        renderInput={(params) => (
          <LocationTextField {...params} label='Location' variant='outlined' />
        )}
      />
      {/* SEARCH BUTTON  */}
      <Button
        color='primary'
        variant='contained'
        className={classes.search_button}
        onClick={handleSubmit}
      >
        <SearchIcon fontSize='large' />
      </Button>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    // background: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(5, 0, 5, 0),
    padding: theme.spacing(5),
  },
  search: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  category: {
    width: 300,
    [theme.breakpoints.down('md')]: {
      width: 220,
    },
    [theme.breakpoints.down('sm')]: {
      width: '50%',
    },
  },
  location: {
    width: 300,
    [theme.breakpoints.down('md')]: {
      width: 220,
    },
    [theme.breakpoints.down('sm')]: {
      width: '50%',
    },
  },
  search_button: {
    borderRadius: theme.shape.borderRadius,
    height: 56,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    boxShadow: 'none',
    [theme.breakpoints.down('sm')]: {
      borderRadius: theme.shape.borderRadius,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      width: '100%',
    },
  },
}));
