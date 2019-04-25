import React from 'react'
import {
  Pane,
  Button,
  Tooltip,
  toaster,
  Dialog,
  TextInputField,
  TagInput,
  Text,
} from 'evergreen-ui'

class CreateProposition extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showConfirmation: false,
      name: '',
      selections: [],
    }
  }

  render() {
    const { onConfirm } = this.props
    const { showConfirmation, name, selections } = this.state

    return (
      <Pane>
        <Dialog
          title="Custom | Create Proposition"
          isShown={showConfirmation}
          onCloseComplete={() => this.setState({ showConfirmation: false })}
          onConfirm={async () => {
            toaster.notify('Creating Proposition...')
            if (onConfirm) {
              await onConfirm({
                name,
                selections,
              })
                .then(resp => toaster.success('Proposition Created!'))
                .catch(err => toaster.danger(err.message))
            }
            this.setState({ showConfirmation: false })
          }}
          confirmLabel="Create Proposition"
          cancelLabel="Oops, nevermind."
          intent="success"
        >
          <Pane>
            <TextInputField
              label="Name"
              description="The name of displayed for the proposition."
              placeholder="Who's going to win the gang war?"
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
            />
            <TextInputField
              label="Selections"
              description="Comma seperated list of available selections."
              placeholder="Bloods,Crips"
              value={selections.toString()}
              onChange={e => {
                this.setState({ selections: e.target.value.split(',') })
              }}
            />
          </Pane>
        </Dialog>
        <Tooltip content="Create Proposition">
          <Button
            iconBefore="plus"
            marginLeft={16}
            onClick={() => {
              this.setState({ showConfirmation: true })
            }}
          >
            Create Proposition
          </Button>
        </Tooltip>
      </Pane>
    )
  }
}

export default CreateProposition
