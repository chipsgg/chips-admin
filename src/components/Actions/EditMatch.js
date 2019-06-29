import React from 'react'
import {
  Pane,
  Heading,
  Strong,
  SideSheet,
  IconButton,
  Paragraph,
  Card,
  UnorderedList,
  ListItem,
  Badge,
  Button,
  Tooltip,
  Spinner,
} from 'evergreen-ui'

import MatchEditor from './MatchEditor'
import CancelConfirm from './CancelConfirm'
import ResolveConfirm from './ResolveConfirm'
import CreateProposition from './CreateProposition'
import PlaceBet from './Placebet'
import { orderBy } from 'lodash'

class EditMatch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isShown: false,
      loading: false,
      propositions: props.row.propositions || [],
      match: props.row,
    }
  }

  toggleShown = () => {
    const { onClose } = this.props
    if (this.state.isShown && onClose) onClose()
    this.setState({
      isShown: !this.state.isShown,
    })
  }

  getPropositions = async () => {
    this.setState({ loading: true })
    const { actions } = this.props
    const { match } = this.state
    const list = await actions.listPropositionsByMatchid({ matchid: match.id })
    console.log(list)
    this.setState({
      loading: false,
      propositions: list,
    })
  }

  render() {
    const { isShown, match, propositions, loading } = this.state
    const { actions } = this.props
    return (
      <Pane>
        <SideSheet
          preventBodyScrolling={true}
          isShown={isShown}
          onCloseComplete={() => this.setState({ isShown: false })}
          containerProps={{
            display: 'flex',
            flex: '1',
            flexDirection: 'column',
          }}
        >
          <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
            <Pane
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderBottom="muted"
            >
              <Pane flex={1} padding={16}>
                <Heading size={600}>Edit Match Details</Heading>
                <Paragraph size={400} color="muted">
                  {match.id}
                </Paragraph>
                <Badge>{match.state}</Badge>
              </Pane>
            </Pane>
            <Pane
              display="flex"
              alignItems="center"
              justifyContent="center"
              padding={16}
            >
              <Button iconBefore="refresh" onClick={this.getPropositions}>
                Refresh
              </Button>
              <MatchEditor
                getFunc={() => actions.getMatch({ matchid: match.id })}
                onConfirm={async match => {
                  match = JSON.parse(match)
                  await actions.editMatch(match)
                  const newMatch = await actions.getMatch({ matchid: match.id })
                  return this.setState({ match: newMatch })
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
                  await this.getPropositions()
                }}
              />
              <CancelConfirm
                marginLeft={16}
                onConfirm={async () => {
                  await actions.cancelMatch({ matchid: match.id })
                  this.toggleShown()
                }}
              >
                Cancel
              </CancelConfirm>
            </Pane>
          </Pane>

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
              orderBy(propositions, 'done').map(proposition => (
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
                            await this.getPropositions()
                          }}
                        >
                          Edit
                        </MatchEditor>
                        <PlaceBet
                          onConfirm={async params => {
                            await actions.placeBetOnProposition({
                              propositionid: proposition.id,
                              ...params,
                            })
                            await this.getPropositions()
                          }}
                          selections={proposition.selections}
                        />
                        <ResolveConfirm
                          onConfirm={async selection => {
                            await actions.resolveProposition({
                              propositionid: proposition.id,
                              selection,
                            })
                            await this.getPropositions()
                          }}
                          selections={proposition.selections}
                        />
                        <CancelConfirm
                          onConfirm={async () => {
                            await actions.cancelProposition({
                              propositionid: proposition.id,
                            })
                            await this.getPropositions()
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
                      <Strong>State: </Strong>
                      <Badge>{proposition.state}</Badge>
                    </ListItem>
                    <ListItem>
                      <Strong>Outcome: </Strong>
                      {proposition.outcome || 'n/a'}
                    </ListItem>
                  </UnorderedList>
                </Card>
              ))
            )}
          </Pane>
        </SideSheet>
        <Tooltip content="Edit">
          <Button iconBefore="annotation" onClick={this.toggleShown}>
            Edit
          </Button>
        </Tooltip>
      </Pane>
    )
  }
}

export default EditMatch
