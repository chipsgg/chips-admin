import React from 'react'

import { Pane, Heading, Button, Spinner, SearchInput } from 'evergreen-ui'
import DataTable from '../components/DataTable'
import EditUser from '../components/Actions/EditUser/EditUser'

class Wallets extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [
        ['ID', 'id'],
        ['Username', 'username'],
        // ["Balance", "balance", "number"],
        // ["Can Withdraw", "canWithdraw", "boolean"],
        // ["Can Deposit", "canDeposit", 'boolean']
      ],
      users: [],
      loading: false,
      searchTerm: '',
      searchResults: [],
    }
  }

  componentDidMount() {
    this.listUsers()
  }

  listUsers = async () => {
    this.setState({ loading: true })
    const { actions } = this.props
    const list = await actions.listUsers()
    console.log(list)
    this.setState({ users: list, loading: false })
  }

  onSearch = e => {
    const { users } = this.state
    const searchTerm = e.target.value.toLowerCase()

    this.setState({
      searchTerm,
      searchResults: users.filter(user => {

        const name = user.username ? user.username : user.login

        const props = [
          name.toLowerCase(),
          user.id
        ]

        return props.find(prop => prop.includes(searchTerm))
      }),
    })
  }

  render() {
    const { columns, users, loading, searchTerm, searchResults } = this.state
    const { actions } = this.props
    return (
      <Pane width={'100%'} display="flex" flexDirection="column">
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
          <Button onClick={this.listUsers} iconBefore="refresh" marginLeft={16}>
            Refresh
          </Button>
          <Pane width={1} flex={1} />
          <SearchInput
            placeholder="Search..."
            onChange={this.onSearch}
            value={searchTerm}
          />
        </Pane>
        <Pane
          width={'100%'}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {loading ? (
            <Pane padding={32}>
              <Spinner />
            </Pane>
          ) : (
            <DataTable
              columns={columns}
              rows={searchResults.length > 0 ? searchResults : users}
              actions={actions}
              Edit={EditUser}
            />
          )}
        </Pane>
      </Pane>
    )
  }
}

export default Wallets
