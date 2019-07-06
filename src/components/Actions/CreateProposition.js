import React from "react";
import {
  Pane,
  Button,
  Tooltip,
  toaster,
  Dialog,
  TextInputField,
  TagInput,
  Text
} from "evergreen-ui";

class CreateProposition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmation: false,
      name: "",
      selections: [],
      position: 0,
      startTime: 0
    };
  }

  render() {
    const { onConfirm } = this.props;
    const { showConfirmation, name, selections, position, startTime } = this.state;

    return (
      <Pane>
        <Dialog
          shouldCloseOnOverlayClick={false}
          title="Custom | Create Proposition"
          isShown={showConfirmation}
          onCloseComplete={() => this.setState({ showConfirmation: false })}
          onConfirm={async () => {
            toaster.notify("Creating Proposition...");
            if (onConfirm) {
              await onConfirm({
                position,
                name,
                selections,
                startTime: Date.now() + startTime * (1000 * 60)
              })
                .then(resp => toaster.success("Proposition Created!"))
                .catch(err => toaster.danger(err.message));
            }
            this.setState({ showConfirmation: false });
          }}
          confirmLabel="Create Proposition"
          cancelLabel="Oops, nevermind."
          intent="success"
        >
          <Pane>
            <TextInputField
              type="number"
              label="Start Time"
              description="How many MINUTES before the match begins?"
              placeholder={48}
              value={startTime}
              onChange={e =>
                this.setState({ startTime: parseInt(e.target.value) })
              }
            />
            <TextInputField
              label="Position (Round)"
              description="The round the proposition is relevant for. Round 0 is equivilant to the entirity of the match. (all rounds)"
              placeholder="0"
              value={position}
              onChange={e => this.setState({ position: e.target.value })}
            />
            <TextInputField
              label="Name"
              description="The name of displayed for the proposition."
              placeholder="Total Rounds Over/Under 26.5"
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
            />
            <TextInputField
              label="Selections ( Limit 2 )"
              description="Comma seperated list of available selections."
              placeholder="Over,Under"
              value={selections.toString()}
              onChange={e => {
                const selections = e.target.value.split(",").slice(0, 2);
                this.setState({ selections });
              }}
            />
          </Pane>
        </Dialog>
        <Tooltip content="Create Proposition">
          <Button
            iconBefore="plus"
            marginLeft={16}
            onClick={() => {
              this.setState({ showConfirmation: true });
            }}
          >
            Proposition
          </Button>
        </Tooltip>
      </Pane>
    );
  }
}

export default CreateProposition;
