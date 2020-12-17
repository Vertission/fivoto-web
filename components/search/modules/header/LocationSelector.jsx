import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import schema from '../../../../apollo/schema';
import { useQuery } from '@apollo/client';

import { dispatch } from '../context';

const Accordion = withStyles((theme) => ({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    background: theme.palette.primary,
    width: '300px',
    margin: theme.spacing(1.5, 0),
    boxShadow: 'none',
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  expanded: {},
}))(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
  },
}))(MuiAccordionDetails);

function SearchHeaderLocationSelector({ toggleDrawer, updateParam }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(null);

  const router = useRouter();

  const handleChange = (panel) => (_, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const { data, loading } = useQuery(schema.query.LOCATION);

  const _onSelect = (district, city) => {
    toggleDrawer(false);
    dispatch('SET_LOCATION', {
      district,
      city,
    });

    // url param updating
    const param = router.query.param;
    param[0] = city || district || 'sri lanka';
    param[0] = param[0].split(' ').join('-').toLowerCase();

    router.push({
      query: { param },
    });
  };

  if (loading) return null;
  return (
    <div className={classes.root}>
      <Button fullWidth onClick={() => _onSelect(null, null)}>
        all of sri lanka
      </Button>
      {data.location.map(({ district, cities }, i) => (
        <Accordion
          square
          expanded={expanded === district}
          onChange={handleChange(district)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.district}>{district}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Button
              className={classes.city}
              onClick={() => _onSelect(district, null)}
            >
              all of {district}
            </Button>
            {cities.map((city) => (
              <Button
                className={classes.city}
                onClick={() => _onSelect(district, city)}
              >
                {city}
              </Button>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default React.memo(SearchHeaderLocationSelector); // TODO: optimize this render

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      width: 250,
    },
  },
  district: {
    textTransform: 'uppercase',
    fontWeight: '700',
    marginRight: 'auto',
  },
  city: {
    width: '100%',
    textTransform: 'capitalize',
  },
}));
