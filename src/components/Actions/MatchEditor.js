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
  Label,
  Textarea
} from "evergreen-ui";

import brace from "brace";
import AceEditor from "react-ace";

import "brace/mode/json";
import "brace/theme/monokai";

import schema from "../../libs/matchSchema";

class CreateProposition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmation: false,
      match: "",
      schema: JSON.stringify(props.schema || schema, null, 2)
    };
  }

  render() {
    const { onConfirm, children } = this.props;
    const { showConfirmation, match, schema } = this.state;

    return (
      <Pane>
        <Dialog
          width={'75%'}
          title="Create/Edit Match"
          isShown={showConfirmation}
          onCloseComplete={() => this.setState({ showConfirmation: false })}
          onConfirm={async () => {
            toaster.notify("Creating Match...");
            if (onConfirm) {
              await onConfirm(match)
                .then(resp => toaster.success("Match Created!"))
                .catch(err => toaster.danger(err.message));
            }
            this.setState({ showConfirmation: false });
          }}
          confirmLabel="Create/Edit Match"
          cancelLabel="Oops, nevermind."
          intent="success"
        >
          <Pane>
            {/* <Label htmlFor="textarea-object" marginBottom={4} display="block">
              Match Object
            </Label>
            <Textarea
              id="textarea-object"
              placeholder={JSON.stringify(match)}
              // onChange={e => setState({ value: e.target.value })}
              // value={state.value}
            /> */}

            <AceEditor
              fontSize={14}
              width={'100%'}
              name="editor"
              mode="json"
              theme="monokai"
              defaultValue={schema}
              value={match}
              onChange={match => this.setState({ match })}
              editorProps={{ $blockScrolling: true }}
              tabSize={2}
            />
          </Pane>
        </Dialog>
        <Tooltip content="Open Editor">
          <Button
            iconBefore="annotation"
            marginLeft={16}
            onClick={() => {
              this.setState({ showConfirmation: true });
            }}
          >
            {children}
          </Button>
        </Tooltip>
      </Pane>
    );
  }
}

export default CreateProposition;