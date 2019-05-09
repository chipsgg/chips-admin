import React from 'react'
import {
  Pane,
  Spinner,
  Text,
  Dialog,
  Heading,
  Button,
  Tablist,
  Tab,
  SearchInput,
} from 'evergreen-ui'
import DataTable from '../components/DataTable'
import { sortBy, debounce } from 'lodash'
import CreateMatch from '../components/Actions/CreateMatch'
import EditMatch from '../components/Actions/EditMatch'

class Macthes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      columns: [
        ['ID', 'id'],
        ['Opponents', 'opponents', 'opponents'],
        // ["Value", "value", 'number'],
        ['Status', 'state', 'state'],
        ['Provider', 'provider'],
        ['Start Time', 'startTime', 'time'],
      ],
      tabs: ['Matches', 'Propositions', 'Users'],
      selectedTab: 'Matches',
      matches: [],
      searchTerm: '',
      searchResults: [],
    }
  }

  componentDidMount() {
    this.getMatches()
  }

  getMatches = async () => {
    this.setState({ loading: true })
    const { actions } = this.props
    const list = await actions.listAvailableMatchesWithPropositions()
    console.log(list)
    this.setState({
      loading: false,
      matches: sortBy(list, 'startTime'),
    })
  }

  onSearch = e => {
    const { matches } = this.state
    const searchTerm = e.target.value.toLowerCase()

    this.setState({
      searchTerm,
      searchResults: matches.filter(match => {

        console.log(match)

        const props = [
          match.id,
          match.name.toLowerCase(),
          match.provider,
          match.state,
          match.game
        ]

        return props.find(prop => prop.includes(searchTerm))
      }),
    })
  }

  render() {
    const {
      loading,
      columns,
      matches,
      tabs,
      selectedTab,
      searchTerm,
      searchResults,
    } = this.state
    const { actions } = this.props
    return (
      <Pane width={'100%'} display="flex" flexDirection="column">
        {/* <Pane display="flex" padding={8}>
          <Tablist>
            {tabs.map(tab => (
              <Tab
                key={tab}
                isSelected={selectedTab === tab}
                onSelect={() => this.setState({ selectedTab: tab })}
              >
                {tab}
              </Tab>
            ))}
          </Tablist>
        </Pane> */}
        <Pane
          width={'100%'}
          borderBottom
          // borderTop
          display="flex"
          padding={16}
          background="tint1"
          alignItems="center"
        >
          <Heading size={300}>Actions:</Heading>
          <Button
            onClick={this.getMatches}
            iconBefore="refresh"
            marginLeft={16}
          >
            Refresh
          </Button>
          <CreateMatch />
          <Pane width={1} flex={1} />
          <SearchInput
            placeholder="Search..."
            onChange={this.onSearch}
            value={searchTerm}
          />
        </Pane>

        <Pane display="flex" alignItems="center" justifyContent="center">
          {loading ? (
            <Pane padding={32}>
              <Spinner />
            </Pane>
          ) : (
            <DataTable
              Edit={EditMatch}
              actions={actions}
              columns={columns}
              rows={searchResults.length > 0 ? searchResults : matches}
              onSelect={this.onSelect}
            />
          )}
        </Pane>
      </Pane>
    )
  }
}

export default Macthes
