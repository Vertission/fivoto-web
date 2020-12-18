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

function SearchHeaderCategorySelector({ toggleDrawer }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (_, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const router = useRouter();

  const { data, loading } = useQuery(schema.query.CATEGORY);

  const _onSelect = (field, item) => {
    toggleDrawer(false);
    dispatch('SET_CATEGORY', {
      field,
      item,
    });

    // url param updating
    const param = router.query.param;
    param[1] = item || field || 'all categories';
    param[1] = param[1].split(' ').join('-').replace('&-', '').toLowerCase();

    router.push({
      query: { param },
    });
  };

  if (loading) return null;
  return (
    <div className={classes.root}>
      <Button fullWidth onClick={() => _onSelect(null, null)}>
        all categories
      </Button>
      {data.category.map(({ category, items }) => (
        <Accordion
          square
          expanded={expanded === category}
          onChange={handleChange(category)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.category}>{category}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Button
              className={classes.item}
              onClick={() => _onSelect(category, null)}
            >
              all {category}
            </Button>
            {items.map((item) => (
              <Button
                className={classes.item}
                onClick={() => _onSelect(category, item)}
              >
                {item}
              </Button>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default React.memo(SearchHeaderCategorySelector); // TODO: optimize this render

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      width: 250,
    },
  },
  category: {
    textTransform: 'uppercase',
    fontWeight: '700',
    marginRight: 'auto',
  },
  item: {
    width: '100%',
    textTransform: 'capitalize',
  },
}));
