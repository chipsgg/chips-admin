import React from "react";
import {
  Pane,
  Button,
  Tooltip,
  toaster,
  Dialog,
  TextInputField,
  TagInput,
  Text,
  IconButton
} from "evergreen-ui";

class AddCredits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmation: false,
      value: 0
    };
  }

  render() {
    const { onConfirm } = this.props;
    const { showConfirmation, value } = this.state;

    return (
      <Pane>
        <Dialog
          title="Modify Wallet Balance"
          isShown={showConfirmation}
          onCloseComplete={() => this.setState({ showConfirmation: false })}
          onConfirm={async () => {
            toaster.notify("Modifying Wallet Balance...");
            if (onConfirm) {
              await onConfirm(value)
                .then(resp => toaster.success("Balance Added!"))
                .catch(err => toaster.danger(err.message));
            }
            this.setState({ showConfirmation: false });
          }}
          confirmLabel="Add Balance"
          cancelLabel="Oops, nevermind."
          intent="success"
        >
          <Pane>
            <TextInputField
              type="number"
              label="Value"
              description="The value you would like to add."
              placeholder=""
              value={value}
              onChange={e =>
                this.setState({ value: parseFloat(e.target.value || 0) })
              }
            />
          </Pane>
        </Dialog>
        <Tooltip content="Add Credit">
          <IconButton
            marginLeft={16}
            icon="add"
            intent="success"
            onClick={() => {
              this.setState({ showConfirmation: true });
            }}
          />
        </Tooltip>
      </Pane>
    );
  }
}

export default AddCredits;
