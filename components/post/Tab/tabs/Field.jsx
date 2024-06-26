import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';

import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  TextField,
  InputAdornment,
  Checkbox,
  FormControl,
  MenuItem,
  CircularProgress,
  Radio,
  FormControlLabel,
  RadioGroup,
  InputLabel,
  Select,
  FormLabel,
} from '@material-ui/core';

import schema from '../../../../apollo/schema';

import { Context, dispatch } from '../../Context';

import { Photos, Phone } from '../_modules';

export default function TabsField() {
  const context = useContext(Context);
  const classes = useStyles();

  const { data: dataField, loading, error } = useQuery(schema.query.FIELD);

  if (loading)
    return (
      <Container className={classes.root_loading}>
        <CircularProgress open={true} />
      </Container>
    );

  if (error) console.log(error);

  const data = {
    field: dataField.fields[context.category.item?.split(' ').join('_')] || {},
  };

  const fields = [];

  Object.keys(data.field).map((field) => {
    const Field = (field) => {
      const fieldProps = data.field[field];
      switch (field) {
        case 'title':
          /**
           * map title field
           */
          return fields.push(
            <TextField
              label='Title'
              variant='outlined'
              fullWidth
              required
              inputProps={{
                maxLength: 50,
              }}
              className={classes.inputField}
              value={context.title}
              onChange={(e) => dispatch('SET_TITLE', e.target.value)}
            />
          );
        case 'price':
          /**
           * map price field with negotiable true and false
           */
          return fields.push(
            <React.Fragment>
              <TextField
                label='Price'
                variant='outlined'
                type='number'
                fullWidth
                required
                inputProps={{
                  maxLength: 21,
                }}
                InputProps={{
                  endAdornment: <InputAdornment position='end'>{fieldProps.currency}</InputAdornment>,
                }}
                className={classes.inputField}
                value={context.price}
                onChange={(e) => dispatch('SET_PRICE', e.target.value)}
              />
              {fieldProps.negotiable && (
                <FormControlLabel
                  control={
                    <Checkbox
                      name='negotiable'
                      color='primary'
                      classes={{ root: classes.checkbox_radio_root }}
                      checked={context.fields.negotiable}
                    />
                  }
                  label='Negotiable'
                  value={true}
                  onChange={(_, value) => dispatch('SET_FIELDS', { field: 'negotiable', value })}
                />
              )}
            </React.Fragment>
          );
        case 'description':
          /**
           * map description field
           */
          return fields.push(
            <TextField
              label='Description'
              variant='outlined'
              fullWidth
              multiline
              required
              rows={15}
              inputProps={{
                maxLength: 4500,
              }}
              className={classes.inputField}
              value={context.description}
              onChange={(e) => dispatch('SET_DESCRIPTION', e.target.value)}
            />
          );
        case 'subFields':
          /**
           * map sbu field
           */
          return fieldProps.map((field) => {
            switch (field.variant) {
              case 'select':
                /**
                 * map sub field select
                 */
                return fields.push(
                  <FormControl
                    variant='outlined'
                    className={classes.formControl}
                    fullWidth
                    className={classes.inputField}
                  >
                    <InputLabel className={classes.inputLabel}>{field.name}</InputLabel>
                    <Select
                      label={field.name}
                      value={context.fields[field.name]}
                      onChange={(e) =>
                        dispatch('SET_FIELDS', {
                          field: field.name,
                          value: e.target.value,
                        })
                      }
                    >
                      {field.items.map((item) => (
                        <MenuItem value={item}>{item}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                );
              /**
               * map sub field input
               */
              case 'input':
                const InputProps = {};
                if (field.options) {
                  if (field.options.adornment) {
                    if (field.options.adornment.position === 'end') {
                      InputProps.endAdornment = (
                        <InputAdornment position='end'>{field.options.adornment.value}</InputAdornment>
                      );
                    } else if (field.options.adornment.position === 'start') {
                      InputProps.startAdornment = (
                        <InputAdornment position='start'>{field.options.adornment.value}</InputAdornment>
                      );
                    }
                  }
                }

                return fields.push(
                  <TextField
                    label={field.name}
                    type={field.type}
                    variant='outlined'
                    fullWidth
                    inputProps={{
                      maxLength: 25,
                    }}
                    InputProps={InputProps}
                    className={classes.inputField}
                    value={context.fields[field.name]}
                    onChange={(e) =>
                      dispatch('SET_FIELDS', {
                        field: field.name,
                        value: e.target.value,
                      })
                    }
                  />
                );
              /**
               * map sub field inputSelect TEST:
               */
              case 'inputSelect':
                console.log(context.fields[field.name]);

                return fields.push(
                  <div className={classes.inputSelect}>
                    <TextField
                      label={field.name}
                      type={field.type}
                      variant='outlined'
                      InputProps={{
                        classes: {
                          root: classes.inputSelect_textField,
                        },
                      }}
                      fullWidth
                      className={classes.inputField}
                      value={context.fields[field.name]?.value}
                      onChange={(e) =>
                        dispatch('SET_FIELDS', {
                          field: field.name,
                          value: {
                            value: e.target.value,
                            key: context.fields[field.name]?.key || field.items[0],
                          },
                        })
                      }
                    />
                    <FormControl
                      variant='outlined'
                      classes={{ root: classes.inputSelect_select }}
                      className={classes.inputField}
                    >
                      <Select
                        value={context.fields[field.name]?.key}
                        onChange={(e) =>
                          dispatch('SET_FIELDS', {
                            field: field.name,
                            value: {
                              key: e.target.value,
                              value: context.fields[field.name]?.value,
                            },
                          })
                        }
                      >
                        {field.items.map((item) => (
                          <MenuItem value={item}>{item}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                );
              /**
               * map sub field inputSelect
               */
              case 'radio':
                return fields.push(
                  <FormControl className={classes.inputField}>
                    <FormLabel className={classes.inputLabel}>{field.name}</FormLabel>
                    <RadioGroup
                      value={context.fields[field.name]}
                      onChange={(e) => {
                        dispatch('SET_FIELDS', {
                          field: field.name,
                          value: e.target.value,
                        });
                      }}
                    >
                      {field.options.map((option) => (
                        <FormControlLabel
                          value={option}
                          control={<Radio classes={{ root: classes.checkbox_radio_root }} color='primary' />}
                          label={option}
                          className={classes.inputLabel}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                );
              default:
                return null;
            }
          });
        /**
         * display phone
         */
        case 'phone':
          return fields.push(<Phone maxLength={fieldProps.maxLength} maxPhone={fieldProps.maxPhone} />);
        /**
         * display image drop zone
         */
        case 'photo':
          return fields.push(<Photos maxFiles={fieldProps.max} />);
      }
    };

    return Field(field);
  });

  return (
    <Container className={classes.root}>
      <form
        className={classes.form}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {fields}
      </form>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  root_loading: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(10),
  },
  form: {
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  inputField: {
    width: '100%',
    margin: theme.spacing(2, 0),
    textTransform: 'capitalize',
  },
  inputLabel: {
    textTransform: 'capitalize',
  },
  inputSelect: {
    display: 'flex',
  },
  inputSelect_textField: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  inputSelect_select: {
    width: '50%',
    '& > *': {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  },
  checkbox_radio_root: {
    '& span': {
      '& svg': {
        color: theme.palette.primary.main,
      },
    },
  },
}));
