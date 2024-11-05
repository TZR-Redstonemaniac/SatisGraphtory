import React from "react";
import Button from "@mui/material/Button";

import PopupDialog from "./PopupDialog";
import { withStyles } from "@mui/styles";
import ShareIcon from "@mui/icons-material/Share";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import TextField from "@mui/material/TextField";
import { rebuildQueryParams, useExperimentalFeature } from "./GraphSvg/util";
import Hidden from "@mui/material/Hidden";

const styles = {
  label: {
    paddingLeft: 10,
  },
  dialogContainer: {
    display: "flex",
    flexDirection: "column",
  },
  inlineDialogButton: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  dialogButton: {
    marginTop: 10,
  },
  statusMessage: {
    display: "flex",
    flexDirection: "column",
  },
};

class ShareButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen: false, value: true };
  }

  handleModalClose = () => this.setState({ modalOpen: false });
  handleModalOpen = () => this.setState({ modalOpen: true });

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevState.modalOpen && this.state.modalOpen) {
      this.setState({ value: "Loading..." }, () => {
        this.props.t.graphSvg.uploadDataWithResponse().then((resp) => {
          const port = window.location.port ? ":" + window.location.port : "";
          const url =
            window.location.protocol +
            "//" +
            window.location.hostname +
            port +
            window.location.pathname +
            "#" +
            resp +
            rebuildQueryParams();
          this.setState({ value: url });
        });
      });
    }
  }

  render() {
    const { classes, onClick } = this.props;
    let value = this.state.value;

    return (
      <React.Fragment>
        <Button color="inherit" onClick={onClick || this.handleModalOpen}>
          <ShareIcon />
          <Hidden smDown implementation="css">
            <div className={classes.label}>Share</div>
          </Hidden>
        </Button>
        <PopupDialog
          title={"Share Code"}
          open={this.state.modalOpen}
          handleModalClose={this.handleModalClose}
        >
          <div className={classes.dialogContainer}>
            <div>
              <TextField
                spellCheck={false}
                inputRef={(ref) => (this.inputRef = ref)}
                label="Share Code"
                value={value}
              ></TextField>
              <Button
                color="primary"
                className={classes.inlineDialogButton}
                onClick={() =>
                  new Promise((resolve) => {
                    this.inputRef.select();
                    document.execCommand("copy");
                    resolve(true);
                  }).then((a) => {
                    this.setState({ statusMessage: "Copied!" }, () => {
                      setTimeout(() => {
                        this.setState({ statusMessage: "" });
                      }, 3000);
                    });
                  })
                }
              >
                <FileCopyIcon />
                <div className={classes.label}>Copy</div>
              </Button>
            </div>
            {useExperimentalFeature("sti") ? (
              <Button
                color="inherit"
                className={classes.dialogButton}
                fullWidth
              >
                <div className={classes.label}>Generate Image</div>
              </Button>
            ) : null}
            <div className={classes.statusMessage}>
              {this.state.statusMessage}
            </div>
          </div>
        </PopupDialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ShareButton);
