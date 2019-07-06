import React from 'react'
import {
  Pane,
  Heading,
  Strong,
  Card,
  UnorderedList,
  ListItem,
  Badge,
} from 'evergreen-ui'

import moment from 'moment'
import PlaceBet from './Actions/Placebet'
import ResolveConfirm from './Actions/ResolveConfirm'
import MatchEditor from './Actions/MatchEditor'
import CancelConfirm from './Actions/CancelConfirm'

import EditStartTime from './Actions/EditStartTime'

const Proposition = ({ proposition, actions, onConfirm }) => {
  return (
    <Card
      key={proposition.id}
      backgroundColor="white"
      elevation={0}
      margin={16}
      padding={16}
      position="relative"
    >
      {proposition.state === 'finished' && (
        <Pane
          top={0}
          left={0}
          display="flex"
          position="absolute"
          backgroundColor="black"
          width="100%"
          height="100%"
          opacity={0.2}
          zIndex={999}
        />
      )}
      <Pane display="flex">
        <Pane flex={1}>
          <Heading>{proposition.name}</Heading>
        </Pane>
        {proposition.state !== 'finished' && (
          <Pane display="flex" flexDirection="row">
            <MatchEditor
              getFunc={() =>
                actions.getProposition({
                  propositionid: proposition.id,
                })
              }
              onConfirm={async proposition => {
                proposition = JSON.parse(proposition)
                await actions.editProposition(proposition)
                if (onConfirm) onConfirm()
              }}
            >
              Edit
            </MatchEditor>
            <EditStartTime
              onConfirm={async startTime => {
                await actions.editProposition({ id: proposition.id, startTime })
                if (onConfirm) onConfirm()
              }}
            />
            <PlaceBet
              onConfirm={async params => {
                await actions.placeBetOnProposition({
                  propositionid: proposition.id,
                  ...params,
                })
                if (onConfirm) onConfirm()
              }}
              selections={proposition.selections}
            />
            <ResolveConfirm
              onConfirm={async selection => {
                await actions.resolveProposition({
                  propositionid: proposition.id,
                  selection,
                })
                if (onConfirm) onConfirm()
              }}
              selections={proposition.selections}
            />
            <CancelConfirm
              onConfirm={async () => {
                await actions.cancelProposition({
                  propositionid: proposition.id,
                })
                if (onConfirm) onConfirm()
              }}
            />
          </Pane>
        )}
      </Pane>
      <UnorderedList>
        <ListItem>
          <Strong>ID: </Strong>
          {proposition.id}
        </ListItem>
        <ListItem>
          <Strong>Provider: </Strong>
          {proposition.provider}
        </ListItem>
        <ListItem>
          <Strong>StartTime: </Strong>
          {moment(proposition.startTime).fromNow()}
        </ListItem>
        <ListItem>
          <Strong>State: </Strong>
          <Badge>{proposition.state}</Badge>
        </ListItem>
        <ListItem>
          <Strong>Selections: </Strong>
          {proposition.selections.toString()}
        </ListItem>
        <ListItem>
          <Strong>Odds: </Strong>
          {proposition.odds.map(odds => odds.odds).toString()}
        </ListItem>
        <ListItem>
          <Strong>Value: </Strong>
          <Badge>
            {proposition.value.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </Badge>
        </ListItem>
        <ListItem>
          <Strong>Outcome: </Strong>
          {proposition.outcome || 'n/a'}
        </ListItem>
      </UnorderedList>
    </Card>
  )
}

export default Proposition
