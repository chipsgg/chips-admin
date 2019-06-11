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

import lodash from 'lodash'

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

const CreateMatch = ({ actions, onConfirm }) => {
  const [showConfirmation, setShowConfirmation] = useState(false)

  const [game, setGame] = useState('')
  const [date, setDate] = useState('2019-05-28')
  const [time, setTime] = useState('21:00')
  const [league, setleague] = useState('')
  const [name, setName] = useState('')
  const [oppo1, setOppo1] = useState('')
  const [oppo2, setOppo2] = useState('')

  const [availTeams, setAvailTeams] = useState([])
  const [availLeagues, setAvailLeagues] = useState([])

  function searchTeams(search = '') {
    return actions.searchMatchTeams({ search }).then(teams => {
      teams = teams.map(x => x.name)
      console.log(teams)
      return setAvailTeams(teams)
    })
  }

  function searchLeagues(search = '') {
    return actions.searchMatchLeagues({ search }).then(leagues => {
      leagues = leagues.map(x => x.name)
      console.log(leagues)
      return setAvailLeagues(leagues)
    })
  }
  
  const debounceSearchTeams = lodash.debounce(searchTeams, 500)
  const debounceSearchLeagues = lodash.debounce(searchLeagues, 500)

  useEffect(() => {
    searchTeams()
    searchLeagues()
  }, [])

  const submit = async () => {
    toaster.notify('Creating Match...')
    if (onConfirm) {
      await onConfirm({
        game,
        startTime: `${date}T${time}:00Z`,
        league,
        name,
        selections: [oppo1, oppo2],
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
            type="date"
            label="Start Date"
            description="What Date does this match begin on?"
            placeholder="2019-05-28"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
          <TextInputField
            type="time"
            label="Start Time"
            description="When does this match begin?"
            placeholder="21:00 PM"
            value={time}
            onChange={e => setTime(e.target.value)}
          />
          <Autocomplete
            value={league}
            onChange={v => setleague(v)}
            items={availLeagues}
            children={props => {
              const { getInputProps, getRef, inputValue } = props
              const inputProps = getInputProps()
              return (
                <TextInputField
                  label="League"
                  description="Name of the league."
                  placeholder="DreamHack"
                  value={inputValue}
                  innerRef={getRef}
                  {...inputProps}
                  onChange={e => {
                    debounceSearchLeagues(e.target.value)
                    inputProps.onChange(e)
                  }}
                />
              )
            }}
          />
          <TextInputField
            label="Name"
            description="Name of the match"
            placeholder="Series B: Quarter Finals"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Autocomplete
            onChange={o => setOppo1(o)}
            items={availTeams}
            value={oppo1}
            children={props => {
              const { getInputProps, getRef, inputValue } = props
              const inputProps = getInputProps()
              return (
                <TextInputField
                  label="Opponent 1"
                  description="Name of the opponent."
                  placeholder="Cloud9"
                  value={inputValue}
                  innerRef={getRef}
                  {...inputProps}
                  onChange={e => {
                    debounceSearchTeams(e.target.value)
                    inputProps.onChange(e)
                  }}
                />
              )
            }}
          />
          <Autocomplete
            onChange={o => setOppo2(o)}
            items={availTeams}
            value={oppo2}
            children={props => {
              const { getInputProps, getRef, inputValue } = props
              const inputProps = getInputProps()
              return (
                <TextInputField
                  label="Opponent 2"
                  description="Name of the opponent."
                  placeholder="Fnatic"
                  value={inputValue}
                  innerRef={getRef}
                  {...inputProps}
                  onChange={e => {
                    debounceSearchTeams(e.target.value)
                    inputProps.onChange(e)
                  }}
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
