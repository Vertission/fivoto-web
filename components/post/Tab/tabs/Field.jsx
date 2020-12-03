import React, { useContext } from "react";
import { useQuery } from "@apollo/client";

import { makeStyles } from "@material-ui/core/styles";
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
} from "@material-ui/core";

import schema from "../../../../apollo/schema";

import { Context, dispatch } from "../../Context";

export default function TabsField() {
  const context = useContext(Context);
  const classes = useStyles();

  const { data, loading } = useQuery(schema.query.FIELD, {
    variables: {
      name: context.category.item,
    },
  });

  if (loading)
    return (
      <Container className={classes.root_loading}>
        <CircularProgress open={true} />
      </Container>
    );

  if (!data) return null;

  const fields = [];

  Object.keys(data.field).map((field) => {
    const Field = (field) => {
      const fieldProps = data.field[field];
      switch (field) {
        case "title":
          /**
           * map title field
           */
          return fields.push(
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              required
              inputProps={{
                maxLength: 50,
              }}
              className={classes.inputField}
              onChange={(e) => dispatch("SET_TITLE", e.target.value)}
            />
          );
        case "price":
          /**
           * map price field with negotiable true and false
           */
          return fields.push(
            <React.Fragment>
              <TextField
                label="Price"
                variant="outlined"
                type="number"
                fullWidth
                required
                inputProps={{
                  maxLength: 50,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      {fieldProps.currency}
                    </InputAdornment>
                  ),
                }}
                className={classes.inputField}
                onChange={(e) => dispatch("SET_PRICE", e.target.value)}
              />
              {fieldProps.negotiable && (
                <FormControlLabel
                  control={<Checkbox name="negotiable" color="primary" />}
                  label="Negotiable"
                  onChange={(_, value) =>
                    dispatch("SET_FIELDS", { field: "negotiable", value })
                  }
                />
              )}
            </React.Fragment>
          );
        case "description":
          /**
           * map description field
           */
          return fields.push(
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              required
              rows={15}
              inputProps={{
                maxLength: 4500,
              }}
              className={classes.inputField}
              onChange={(e) => dispatch("SET_DESCRIPTION", e.target.value)}
            />
          );
        case "subFields":
          /**
           * map sbu field
           */
          return fieldProps.map((field) => {
            switch (field.variant) {
              case "select":
                /**
                 * map sub field select
                 */
                return fields.push(
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    fullWidth
                    className={classes.inputField}
                  >
                    <InputLabel className={classes.inputLabel}>
                      {field.name}
                    </InputLabel>
                    <Select
                      label={field.name}
                      onChange={(e) =>
                        dispatch("SET_FIELDS", {
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
              case "input":
                return fields.push(
                  <TextField
                    label={field.name}
                    variant="outlined"
                    fullWidth
                    inputProps={{
                      maxLength: 25,
                    }}
                    className={classes.inputField}
                    onChange={(e) =>
                      dispatch("SET_FIELDS", {
                        field: field.name,
                        value: e.target.value,
                      })
                    }
                  />
                );
              /**
               * map sub field inputSelect
               */
              case "inputSelect":
                return fields.push(
                  <div className={classes.inputSelect}>
                    <TextField
                      label={field.name}
                      type={field.type}
                      variant="outlined"
                      InputProps={{
                        classes: {
                          root: classes.inputSelect_textField,
                        },
                      }}
                      fullWidth
                      className={classes.inputField}
                      onChange={(e) =>
                        dispatch("SET_FIELDS", {
                          field: field.name,
                          value: {
                            input: e.target.value,
                            select:
                              context.fields[field.name]?.select ||
                              field.items[0],
                          },
                        })
                      }
                    />
                    <FormControl
                      variant="outlined"
                      classes={{ root: classes.inputSelect_select }}
                      className={classes.inputField}
                    >
                      <Select
                        defaultValue={field.items[0]}
                        onChange={(e) =>
                          dispatch("SET_FIELDS", {
                            field: field.name,
                            value: {
                              select: e.target.value,
                              input: context.fields[field.name]?.input,
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
              case "radio":
                //  default value
                if (!context.fields[field.name]) {
                  dispatch("SET_FIELDS", {
                    field: field.name,
                    value: field.options[0],
                  });
                }
                return fields.push(
                  <FormControl className={classes.inputField}>
                    <FormLabel className={classes.inputLabel}>
                      {field.name}
                    </FormLabel>
                    <RadioGroup
                      defaultValue={field.options[0]}
                      onChange={console.log}
                    >
                      {field.options.map((option) => (
                        <FormControlLabel
                          value={option}
                          control={<Radio color="primary" />}
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
        default:
          return null;
      }
    };

    return Field(field);
  });

  return (
    <Container className={classes.root}>
      <form className={classes.form}>{fields}</form>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
  },
  root_loading: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(10),
  },
  form: {
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  inputField: {
    width: "100%",
    margin: theme.spacing(2, 0),
    textTransform: "capitalize",
  },
  inputLabel: {
    textTransform: "capitalize",
  },
  inputSelect: {
    display: "flex",
  },
  inputSelect_textField: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  inputSelect_select: {
    width: "50%",
    "& > *": {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  },
}));
