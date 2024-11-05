import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { withStyles } from "@mui/styles";

const styles = {
  root: {},
};

class PopupDialog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, title, contents, open, handleModalClose, children } =
      this.props;
    return (
      <Dialog
        className={classes.modal}
        open={Boolean(open)}
        onClose={handleModalClose}
        id="modal"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(PopupDialog);
