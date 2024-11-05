import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

import PopupDialog from './PopupDialog';
import {withStyles} from '@mui/styles';
import Hidden from "@mui/material/Hidden";

const styles = theme => ({
    label: {
        paddingLeft: 10,
    },
    dialogContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
});

class ClearButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {modalOpen: false};
    }

    handleModalClose = () => this.setState({modalOpen: false});
    handleModalOpen = () => this.setState({modalOpen: true});


    render() {
        const {classes, label, title, children, onClick} = this.props;
        return (
            <React.Fragment>
                <Button color='inherit' onClick={onClick || this.handleModalOpen}>

                    <DeleteIcon/>
                    <Hidden smDown implementation="css">
                    <div className={classes.label}>Clear</div>
                    </Hidden>
                </Button>
                <PopupDialog title={'Clear Graph?'} open={this.state.modalOpen}
                             handleModalClose={this.handleModalClose}>
                    <div className={classes.dialogContainer}>
                        <Typography variant="h5">Are you sure you want to clear everything?</Typography>
                        <Button color="secondary" variant="outlined" className={`${classes.dialogButton}`} onClick={
                            () => {
                                this.props.t.graphSvg.clearGraphData(this.props.t);
                                this.handleModalClose();
                            }
                        }>
                            <DeleteIcon/>
                            <div className={classes.label}>Yes, I'm sure!</div>
                        </Button>
                    </div>
                </PopupDialog>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(ClearButton);