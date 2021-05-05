import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import GifIcon from '@material-ui/icons/Gif';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import GetAppIcon from '@material-ui/icons/GetApp';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

const MenuList = (props) => {
  const history = useHistory();
  
  return (
    <div
      className={props.classes.list}
      role="presentation"
      onClick={props.toggleDrawer}
      onKeyDown={props.toggleDrawer}
    >
      <List>
        <ListItem button onClick={() => history.push("/")}>
          <ListItemIcon><LocalParkingIcon /></ListItemIcon>
          <ListItemText primary="Tracking the GODS" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => history.push("/best_team")}>
          <ListItemIcon><GifIcon /></ListItemIcon>
          <ListItemText primary="Campeão do MSI?" />
        </ListItem>
        <ListItem button onClick={() => history.push("/mvp")}>
          <ListItemIcon><GifIcon /></ListItemIcon>
          <ListItemText primary="MVP do MSI?" />
        </ListItem>
        <ListItem button onClick={() => history.push("/download")}>
          <ListItemIcon><GetAppIcon /></ListItemIcon>
          <ListItemText primary="Auxiliar de Spec" />
        </ListItem>

        <ListItem button onClick={() => history.push("/live_stream")}>
          <ListItemIcon><LiveTvIcon /></ListItemIcon>
          <ListItemText primary="Nosso Spec" />
        </ListItem>
      </List>
    </div>
  )
}

const Page = (props) => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenDrawer(!openDrawer);
  }
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        <Typography variant="h6" className={classes.title}>
          {props.title || "Tracking the GODS"}
        </Typography>
        </Toolbar>
        
        <SwipeableDrawer
        anchor="left"
        open={openDrawer}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
        >
        <MenuList 
          classes={classes} 
          toggleDrawer={toggleDrawer}
        />
        </SwipeableDrawer>
    </AppBar>
    {props.children}
  </>)
}

export default Page;



