import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Paper,
  Typography,
  CardActionArea,
  Dialog,
  DialogTitle,
  DialogContent,
  SwipeableDrawer,
  useMediaQuery,
  Button,
} from "@material-ui/core";

import schema from "../../../../apollo/schema";

export default function TabsCategory() {
  const classes = useStyles();
  const theme = useTheme();
  const showDrawer = useMediaQuery(theme.breakpoints.down("sm"));

  const [openDialog, setOpenDialog] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState({
    field: null,
    items: [],
  });
  const { data, loading } = useQuery(schema.query.CATEGORY);

  const _onSelectCategory = ({ field, items }) => {
    setSelectedCategory({ field, items });
    showDrawer ? setOpenDrawer(true) : setOpenDialog(true);
  };

  const _onSelect = (item) => {
    console.log(item, selectedCategory.field);
    setOpenDialog(false);
    setOpenDrawer(false);
  };

  const ItemButtons = () => {
    return selectedCategory.items.map((item) => (
      <Button
        key={item}
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        classes={{
          root: classes.dialog_button_root,
          label: classes.dialog_button_label,
        }}
        onClick={() => _onSelect(item)}
      >
        {item}
      </Button>
    ));
  };

  return (
    <React.Fragment>
      <Container className={classes.root}>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
          className={classes.grid}
        >
          {data?.category.map(({ category, image, items }) => (
            <Paper
              key={category}
              square
              className={classes.paper}
              onClick={() => _onSelectCategory({ field: category, items })}
            >
              <CardActionArea className={classes.paper_card}>
                <img src={image} className={classes.paper_image} />
                <Typography className={classes.paper_title} align="center">
                  {category}
                </Typography>
              </CardActionArea>
            </Paper>
          ))}
        </Grid>
      </Container>
      {/* DIALOG  */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle className={classes.paper_title}>
          {selectedCategory.field}
        </DialogTitle>
        <DialogContent className={classes.dialog_content}>
          <ItemButtons />
        </DialogContent>
      </Dialog>
      {/* DRAWER  */}
      <SwipeableDrawer
        anchor="bottom"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{
          paperAnchorBottom: classes.drawer,
        }}
      >
        <ItemButtons />
      </SwipeableDrawer>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    flexWrap: "wrap",
    width: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(3),
    width: "25%",
    height: 150,
    [theme.breakpoints.down("xs")]: {
      width: "40%",
      height: 110,
    },
  },
  paper_card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  paper_image: {
    width: 70,
    padding: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      width: 50,
    },
  },
  paper_title: {
    textTransform: "capitalize",
    marginTop: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      fontSize: theme.typography.caption.fontSize,
    },
  },
  dialog_content: {
    width: 600,
    [theme.breakpoints.down("sm")]: {
      width: 400,
    },
  },
  dialog_button_root: {
    margin: theme.spacing(1.5, 0),
  },
  dialog_button_label: {
    fontWeight: 700,
    padding: theme.spacing(1, 0),
    textTransform: "capitalize",
  },
  drawer: {
    padding: theme.spacing(3),
  },
}));