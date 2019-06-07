import React, { useState, useEffect } from 'react'
import {
  Pane,
  Button,
  Tooltip,
  toaster,
  Dialog,
  TextInputField,
  TagInput,
  Text,
  SelectField,
  Autocomplete,
  TextInput,
} from 'evergreen-ui'

class CreateMatch extends React.Component {
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
          title="Custom | Create Match"
          isShown={showConfirmation}
          onCloseComplete={() => this.setState({ showConfirmation: false })}
          onConfirm={async () => {
            toaster.notify('Creating Match...')
            if (onConfirm) {
              await onConfirm({
                name,
                selections,
              })
                .then(resp => toaster.success('Match Created!'))
                .catch(err => toaster.danger(err.message))
            }
            this.setState({ showConfirmation: false })
          }}
          confirmLabel="Create Match"
          cancelLabel="Oops, nevermind."
          intent="success"
        >
          <Pane>
            <SelectField
              label="Game"
              required
              description="The game the match belongs to."
            >
              <option value="foo" selected>
                csgo
              </option>
              <option value="bar">dota2</option>
              <option value="bar">lol</option>
            </SelectField>
            <TextInputField
              label="Start Time"
              description="When does this match begin?"
              placeholder="2019-05-28T21:00:00Z"
              // value={name}
              // onChange={e => this.setState({ name: e.target.value })}
            />
            <Autocomplete
              // title="Opponent 1"
              // onChange={changedItem => console.log(changedItem)}
              items={['Apple', 'Apricot', 'Banana', 'Cherry', 'Cucumber']}
              children={props => {
                const { getInputProps, getRef, inputValue } = props
                return (
                  <TextInputField
                    label="Leauge"
                    description="Name of the Leauge."
                    placeholder="DreamHack"
                    value={inputValue}
                    innerRef={getRef}
                    {...getInputProps()}
                  />
                )
              }}
            />
            <TextInputField
              label="Name"
              description="Name of the match"
              placeholder="Series B: Quarter Finals"
              // value={name}
              // onChange={e => this.setState({ name: e.target.value })}
            />
            <Autocomplete
              // title="Opponent 1"
              // onChange={changedItem => console.log(changedItem)}
              items={['Apple', 'Apricot', 'Banana', 'Cherry', 'Cucumber']}
              children={props => {
                const { getInputProps, getRef, inputValue } = props
                return (
                  <TextInputField
                    label="Opponent 1"
                    description="Name of the opponent."
                    placeholder="Cloud9"
                    value={inputValue}
                    innerRef={getRef}
                    {...getInputProps()}
                  />
                )
              }}
            />
            <Autocomplete
              // title="Opponent 2"
              // onChange={changedItem => console.log(changedItem)}
              items={['Apple', 'Apricot', 'Banana', 'Cherry', 'Cucumber']}
              children={props => {
                const { getInputProps, getRef, inputValue } = props
                return (
                  <TextInputField
                    label="Opponent 2"
                    description="Name of the opponent."
                    placeholder="Fnatic"
                    value={inputValue}
                    innerRef={getRef}
                    {...getInputProps()}
                  />
                )
              }}
            />
          </Pane>
        </Dialog>
        <Tooltip content="Create Match">
          <Button
            iconBefore="plus"
            marginLeft={16}
            onClick={() => {
              this.setState({ showConfirmation: true })
            }}
          >
            Create Match
          </Button>
        </Tooltip>
      </Pane>
    )
  }
}

export default CreateMatch
