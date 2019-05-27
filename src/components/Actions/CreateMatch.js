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
      schema: JSON.stringify(schema, null, 2)
    };
  }

  render() {
    const { onConfirm } = this.props;
    const { showConfirmation, match, schema } = this.state;

    return (
      <Pane>
        <Dialog
          title="Custom | Create Match"
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
          confirmLabel="Create Match"
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
              width={'100%'}
              name="editor"
              mode="json"
              theme="monokai"
              defaultValue={schema}
              value={match}
              onChange={match => this.setState({ match })}
              editorProps={{ $blockScrolling: true }}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2
              }}
            />
          </Pane>
        </Dialog>
        <Tooltip content="Create Match">
          <Button
            iconBefore="plus"
            marginLeft={16}
            onClick={() => {
              this.setState({ showConfirmation: true });
            }}
          >
            Create Match
          </Button>
        </Tooltip>
      </Pane>
    );
  }
}

export default CreateProposition;
