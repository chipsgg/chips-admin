import React from "react";
import {
  Pane,
  Button,
  IconButton,
  Tooltip,
  toaster,
  CornerDialog
} from "evergreen-ui";

const Confirmation = ({ showConfirmation = false, onConfirm, setState }) => (
  <CornerDialog
    title="Are you sure?"
    isShown={showConfirmation}
    onCloseComplete={() => setState({ showConfirmation: false })}
    onConfirm={onConfirm}
    confirmLabel="Yes im sure!"
    cancelLabel="Oops, nevermind."
    intent="danger"
    containerProps={{
      zIndex: 999
    }}
  >
    Are you sure you want to do this?
  </CornerDialog>
);

class CancelConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmation: false
    };
  }

  render() {
    const { showConfirmation } = this.state;
    const { onConfirm, children } = this.props;

    return (
      <Pane>
        <Confirmation
          showConfirmation={showConfirmation}
          setState={this.setState}
          onConfirm={async () => {
            toaster.notify("Canceling...");
            if (onConfirm) {
              await onConfirm()
                .then(resp => toaster.success("Canceled!"))
                .catch(err => toaster.danger(err.message));
            }
            this.setState({ showConfirmation: false });
          }}
        />
        <Tooltip content="Cancel">
          {children ? (
            <Button
              marginLeft={16}
              iconBefore="delete"
              intent="danger"
              onClick={() => {
                this.setState({ showConfirmation: true });
              }}
            >
              {children}
            </Button>
          ) : (
            <IconButton
              marginLeft={16}
              icon="delete"
              intent="danger"
              onClick={() => {
                this.setState({ showConfirmation: true });
              }}
            />
          )}
        </Tooltip>
      </Pane>
    );
  }
}

export default CancelConfirm;
