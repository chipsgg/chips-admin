import React from "react";
import { Pane, IconButton, Tooltip, toaster, CornerDialog } from "evergreen-ui";

const Confirmation = ({ showConfirmation = false, onConfirm, setState }) => (
  <CornerDialog
    title="This will refund all bets!"
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
    const { onConfirm } = this.props;

    return (
      <Pane>
        <Confirmation
          showConfirmation={showConfirmation}
          setState={state => {
            console.log(state);
            this.setState(state);
          }}
          onConfirm={async () => {
            toaster.notify("Canceling Proposition...");
            if (onConfirm) {
              await onConfirm()
                .then(resp => toaster.success("Proposition Canceled!"))
                .catch(err => toaster.danger(err.message));
            }
            this.setState({ showConfirmation: false });
          }}
        />
        <Tooltip content="Cancel">
          <IconButton
            icon="delete"
            intent="danger"
            onClick={() => {
              this.setState({ showConfirmation: true });
            }}
          />
        </Tooltip>
      </Pane>
    );
  }
}

export default CancelConfirm;
