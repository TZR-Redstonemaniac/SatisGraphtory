import React from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Popper from "@mui/material/Popper";
import { withStyles } from "@mui/styles";
import MenuList from "@mui/material/MenuList";
import Grow from "@mui/material/Grow";

import InnerNestedSidebarButton from "./InnerNestedSidebarButton";
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
    width: 24,
    paddingRight: 15,
  },
};

class NestedSidebarButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { anchorEl: null };
  }

  handleMenu = (event) => {
    if (event.currentTarget === this.state.lastTarget) return;
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState(
      {
        anchorEl: null,
        lastTarget: this.state.anchorEl,
      },
      () =>
        new Promise((resolve) => setTimeout(resolve, 100)).then(() =>
          this.setState({ lastTarget: null }),
        ),
    );
  };

  render() {
    const { classes, listItems, label, appObject } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
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
                id="menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                      {Object.keys(listItems).map((key) => {
                        const returnDivList = [];
                        //Keep it as Miner
                        if (["Miner"].includes(key)) {
                          listItems[key].forEach((resource) => {
                            returnDivList.push(
                              <InnerNestedSidebarButton
                                appObject={appObject}
                                resource={resource}
                              />,
                            );
                          });
                        }
                        return returnDivList;
                      })}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Paper>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(NestedSidebarButton);
