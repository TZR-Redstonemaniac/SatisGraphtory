import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import PopupDialog from "./PopupDialog";
import { withStyles } from "@mui/styles";

const styles = {
  icons: {
    marginRight: 0,
  },
};

class SidebarPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen: false };
  }

  render() {
    const { classes, Icon, label, title, contents } = this.props;

    return (
      <React.Fragment>
        <ListItem
          key={label}
          style={{ cursor: "pointer" }}
          onClick={() => this.setState({ modalOpen: true })}
        >
          <ListItemIcon className={classes.icons}>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={label} />
        </ListItem>
        <PopupDialog
          title={title}
          open={this.state.modalOpen}
          handleModalClose={() => this.setState({ modalOpen: false })}
        >
          {this.props.children}
        </PopupDialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SidebarPopup);
