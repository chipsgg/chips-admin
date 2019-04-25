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

import CancelConfirm from './CancelConfirm'
import ResolveConfirm from './ResolveConfirm'
import CreateProposition from './CreateProposition'
import PlaceBet from './Placebet'

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
    console.log('toggle')
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
                <Heading size={600}>Edit Match Propositions</Heading>
                <Paragraph size={400} color="muted">
                  {match.id}
                </Paragraph>
                <Badge>{match.state}</Badge>
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
                <CreateProposition
                  onConfirm={async params => {
                    await actions.createProposition({
                      matchid: match.id,
                      ...params,
                    })
                    await this.getPropositions()
                  }}
                />
              </Pane>
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
              propositions.map(proposition => (
                <Card
                  key={proposition.id}
                  backgroundColor="white"
                  elevation={0}
                  margin={16}
                  padding={16}
                >
                  <Pane display="flex">
                    <Pane flex={1}>
                      <Heading>{proposition.name}</Heading>
                    </Pane>
                    {proposition.state === 'open' ? (
                      <Pane display="flex" flexDirection="row">
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
                    ) : null}
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
                      <Badge>${proposition.value}</Badge>
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
