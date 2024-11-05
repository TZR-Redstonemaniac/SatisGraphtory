import React from "react";
import { withStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Hidden from "@mui/material/Hidden";

const styles = {
  label: {
    paddingLeft: 10,
  },
};

class NightToggle extends React.Component {
  constructor(props) {
    super(props);
    const nightModeStore = window.localStorage.getItem("nightMode");
    let night = "light";
    if (night !== nightModeStore) {
      night = "dark";
    }
    this.state = { night };
  }

  shouldComponentUpdate(nextState, nextProps) {
    if (nextState.night !== this.state.night) {
      this.setState({ night: nextState.night });
      return true;
    }
    return false;
  }

  render() {
    const { classes, onNightToggle, night } = this.props;
    return (
      <React.Fragment>
        <Button onClick={onNightToggle} color="inherit">
          {this.state.night === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness3Icon />
          )}
          <Hidden smDown implementation="css">
            <div className={classes.label}>
              {this.state.night === "dark" ? "Day" : "Night"}
            </div>
          </Hidden>
        </Button>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(NightToggle);
