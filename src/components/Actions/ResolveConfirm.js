import React from "react";
import {
  Pane,
  IconButton,
  Tooltip,
  toaster,
  CornerDialog,
  RadioGroup
} from "evergreen-ui";

class ResolveConfirm extends React.Component {
  constructor(props) {
    super(props);

    const selections = props.selections.map(item => {
      return { label: item, value: item };
    });

    this.state = {
      showConfirmation: false,
      selections,
      selected: selections[0].value
    };
  }

  render() {
    const { showConfirmation, selections, selected } = this.state;
    const { onConfirm } = this.props;

    return (
      <Pane>
        <CornerDialog
          title="Select The Resolve"
          isShown={showConfirmation}
          onCloseComplete={() => this.setState({ showConfirmation: false })}
          confirmLabel="Resolve Proposition"
          cancelLabel="Oops, nevermind."
          intent="success"
          containerProps={{
            zIndex: 999
          }}
          onConfirm={async () => {
            toaster.notify("Resolving Proposition...");
            if (onConfirm) {
              await onConfirm(selected)
                .then(resp => toaster.success("Proposition Resolved!"))
                .catch(err => toaster.danger(err.message));
            }
            this.setState({ showConfirmation: false });
          }}
        >
          <RadioGroup
            size={16}
            value={selected}
            options={selections}
            onChange={selected => this.setState({ selected })}
          />
        </CornerDialog>

        <Tooltip content="Resolve">
          <IconButton
            marginLeft={16}
            icon="tick-circle"
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

export default ResolveConfirm;
