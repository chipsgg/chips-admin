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

const GameSelector = ({ onChange }) => {
  return (
    <SelectField
      label="Game"
      required
      description="The game the match belongs to."
      onChange={event => onChange(event.target.value)}
    >
      <option value="foo" defaultValue>
        csgo
      </option>
      <option value="bar">dota2</option>
      <option value="bar">lol</option>
    </SelectField>
  )
}

const CreateMatch = ({ onConfirm }) => {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [game, setGame] = useState(null)
  const [selections, setSelections] = useState([])

  const submit = async () => {
    toaster.notify('Creating Match...')
    if (onConfirm) {
      await onConfirm({
        name,
        selections,
      })
        .then(resp => toaster.success('Match Created!'))
        .catch(err => toaster.danger(err.message))
    }
    setShowConfirmation(false)
  }

  return (
    <Pane>
      <Dialog
        title="Custom | Create Match"
        isShown={showConfirmation}
        onCloseComplete={e => setShowConfirmation(false)}
        onConfirm={submit}
        confirmLabel="Create Match"
        cancelLabel="Oops, nevermind."
        intent="success"
      >
        <Pane>
          <GameSelector onChange={setGame} />
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
          onClick={e => setShowConfirmation(true)}
        >
          Create Match
        </Button>
      </Tooltip>
    </Pane>
  )
}

export default CreateMatch
