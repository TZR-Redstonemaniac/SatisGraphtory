import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Popper from "@mui/material/Popper";
import Tooltip from "@mui/material/Tooltip";

import { withStyles } from "@mui/styles";
import MenuList from "@mui/material/MenuList";
import Grow from "@mui/material/Grow";
import ClickAwayListenerV2 from "./ClickAwayListenerV2";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const styles = {
  root: {},
  button: {
    flex: "0 0 100%",
    justifyContent: "left",
    padding: 10,
  },
  paper: {
    margin: 16,
    display: "flex",
    zIndex: 1302,
  },
  label: {
    paddingLeft: 10,
  },
  popper: {
    zIndex: 1301,
    left: "13px !important",
  },
  itemListIcon: {
    height: 24,
    paddingRight: 15,
  },
  tooltip: {},
  tooltipIcon: {
    height: 40,
    display: "inline-block",
    paddingLeft: 10,
  },
  tooltipIconFirst: {
    height: 40,
    display: "inline-block",
  },
  tooltipText: {
    fontSize: 18,
    display: "inline-block",
  },
  maxHeightPaper: {
    overflowY: "auto",
    maxHeight: 600,
  },
};

class SidebarButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { anchorEl: null };
  }

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (event) => {
    this.setState({ anchorEl: null });
  };

  clickAwayClose = (event) => {
    // event.stopImmediatePropagation();
    if (this.state.anchorEl) {
      this.setState({ anchorEl: null });
    }
  };

  listItems(classes, label, appObject) {
    return this.props.items.map((link) => {
      return (
        <Tooltip
          key={link.id}
          className={classes.tooltip}
          placement="right"
          title={link.inputs.map((element, index) => {
            return (
              <React.Fragment key={element.item.id}>
                <img
                  src={element.item.icon}
                  className={
                    index === 0 ? classes.tooltipIconFirst : classes.tooltipIcon
                  }
                />
                <div className={classes.tooltipText}>{element.quantity}</div>
              </React.Fragment>
            );
          })}
        >
          <MenuItem
            onClick={() => {
              const machine_nodes = appObject.state.machine_node.machine_node;
              machine_nodes.sort((node1, node2) => node1.rank - node2.rank);
              const upgrades = machine_nodes.filter(
                (node) => node.machine_class.id === link.machine_class.id,
              );
              const instance = upgrades[0];

              appObject.graphSvg.addNode({
                data: { recipe: link },
                machine: link.machine_class,
                allowedIn: link.inputs.map((dict) => dict.item.id),
                allowedOut: [link.item.id],
                instance: instance,
                upgradeTypes: upgrades,
              });
              this.handleClose();
              appObject.setState({ mobileOpen: false });
            }}
          >
            <img
              alt="probably some goat image"
              src={link.item.icon}
              className={classes.itemListIcon}
            />
            {link.name}
            {link.quantity === 1 ? "" : " x" + link.quantity}
            <div className={classes.grow} />
          </MenuItem>
        </Tooltip>
      );
    });
  }

  render() {
    const { classes, label, appObject } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const listItems = this.listItems(classes, label, appObject);
    return (
      <React.Fragment key={label}>
        <Paper className={classes.paper}>
          <Button
            aria-owns={open ? "menu-appbar" : null}
            aria-haspopup="true"
            onClick={open ? this.handleClose : this.handleMenu}
            className={classes.button}
          >
            {open ? <RemoveCircleIcon /> : <AddCircleOutlineIcon />}

            <div className={classes.label}>{label}</div>
          </Button>
          <Popper
            className={classes.popper}
            open={open}
            anchorEl={anchorEl}
            transition
            placement="right-start"
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow-2"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper className={classes.maxHeightPaper}>
                  <ClickAwayListenerV2
                    onClickAway={this.clickAwayClose}
                    clobberedElement={"#mainRender"}
                  >
                    <MenuList>{listItems}</MenuList>
                  </ClickAwayListenerV2>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Paper>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SidebarButton);
