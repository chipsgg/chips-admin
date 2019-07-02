import React, { useState, useEffect } from 'react'
import {
  Pane,
  Heading,
  SideSheet,
  Badge,
  Button,
  Tooltip,
  Spinner,
  Strong,
  Text,
} from 'evergreen-ui'

import MatchEditor from './MatchEditor'
import CancelConfirm from './CancelConfirm'
import CreateProposition from './CreateProposition'
import { orderBy } from 'lodash'

import Proposition from '../Proposition'

const Actions = ({ actions, match, onConfirm, onCancel }) => {
  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding={16}
    >
      <Button iconBefore="refresh" onClick={onConfirm}>
        Refresh
      </Button>
      <MatchEditor
        getFunc={() => actions.getMatch({ matchid: match.id })}
        onConfirm={async match => {
          match = JSON.parse(match)
          await actions.editMatch(match)
          if (onConfirm) onConfirm()
        }}
      >
        Edit
      </MatchEditor>
      <CreateProposition
        onConfirm={async params => {
          await actions.createProposition({
            matchid: match.id,
            ...params,
          })
          if (onConfirm) onConfirm()
        }}
      />
      <CancelConfirm
        marginLeft={16}
        onConfirm={async () => {
          await actions.cancelMatch({ matchid: match.id })
          if (onCancel) onCancel()
        }}
      >
        Cancel
      </CancelConfirm>
    </Pane>
  )
}

const MatchInfo = ({ match, propositions }) => {
  const value = propositions.reduce((memo, row) => {
    memo += row.value
    return memo
  }, 0)

  return (
    <Pane display="flex" flexDirection="row" padding={16}>
      <Pane flex={1}>
        <Heading size={600}>Edit Match Details</Heading>
        <Pane display="flex" flexDirection="column">
          <Text>
            <Strong>ID: </Strong>
            {match.id}
          </Text>
          <Text>
            <Strong>Name: </Strong>
            {match.name}
          </Text>
        </Pane>

        {/* <Paragraph size={400} color="muted">
          {match.id}
          {match.name}
        </Paragraph> */}
      </Pane>
      <Pane
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
      >
        <Badge>{match.state}</Badge>
        <Badge>
          {value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </Badge>
      </Pane>
    </Pane>
  )
}

const Header = ({ children }) => {
  return (
    <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderBottom="muted"
      />
      {children}
    </Pane>
  )
}

const EditMatch = ({ row, actions, onClose }) => {
  const matchid = row.id

  const [loading, setLoading] = useState(true)
  const [isShown, setIsShown] = useState(false)
  const [match, setMatch] = useState({})
  const [propositions, setPropositions] = useState([])

  const toggleShown = () => {
    if (isShown && onClose) onClose()
    setIsShown(!isShown)
  }

  const getPropositions = async () => {
    let list = await actions.listPropositionsByMatchid({ matchid })
    list = orderBy(list, 'done')
    setPropositions(list)
  }

  const getMatch = async () => {
    const newMatch = await actions.getMatch({ matchid })
    setMatch(newMatch)
  }

  const refresh = async () => {
    setLoading(true)
    await Promise.all([getPropositions(), getMatch()])
    setLoading(false)
  }

  // load initial content
  useEffect(() => {
    refresh()
  }, [])

  return (
    <Pane>
      <SideSheet
        preventBodyScrolling={true}
        isShown={isShown}
        onCloseComplete={toggleShown}
        containerProps={{
          display: 'flex',
          flex: '1',
          flexDirection: 'column',
        }}
      >
        <Header>
          <MatchInfo match={match} propositions={propositions} />
          <Actions
            actions={actions}
            match={match}
            onConfirm={refresh}
            onCancel={toggleShown}
          />
        </Header>
        <Pane flex="1" overflowY="scroll" background="tint1">
          {loading ? (
            <Pane
              display="flex"
              alignItems="center"
              justifyContent="center"
              padding={32}
            >
              <Spinner />
            </Pane>
          ) : (
            propositions.map(proposition => (
              <Proposition
                key={proposition.id}
                proposition={proposition}
                actions={actions}
                onConfirm={refresh}
              />
            ))
          )}
        </Pane>
      </SideSheet>
      <Tooltip content="Edit">
        <Button iconBefore="annotation" onClick={toggleShown}>
          Edit
        </Button>
      </Tooltip>
    </Pane>
  )
}

export default EditMatch
