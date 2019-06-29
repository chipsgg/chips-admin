import React from 'react'

import { Box, Pane, Heading, Text, Badge, Spinner } from 'evergreen-ui'

import Authenticate from './Actions/Authenticate'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.user,
      wallet: null,
    }
  }

  componentDidMount() {
    this.getWalletBalance()
  }

  getWalletBalance = async () => {
    const { actions } = this.props
    const wallet = await actions.myWallet()
    this.setState({ wallet })
  }

  authenticate = async credentials => {
    const { actions } = this.props

    let userid = null
    try {
      userid = await actions.signup(credentials)
    } catch (e) {
      userid = await actions.login(credentials)
    }

    location.reload()
  }

  render() {
    const { user, wallet } = this.state
    const { actions } = this.props
    return (
      <Pane
        borderBottom
        display="flex"
        padding={16}
        background="tint2"
        borderRadius={3}
      >
        <Pane flex={1} alignItems="center" display="flex">
          <Heading size={600}>Chips.gg - Administration</Heading>
        </Pane>
        <Pane display={'flex'} alignItems="center">
          {user ? (
            <>
              <Pane display={'flex'} alignItems="center">
                <Badge marginRight={16}>
                  {wallet ? (
                    `$${wallet.balance.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
                  ) : (
                    <Spinner size={16} />
                  )}
                </Badge>
                <Badge> {user.login} </Badge>
              </Pane>
              <Authenticate.Logout onClick={actions.logout} />
            </>
          ) : (
            <>
              <Authenticate.Login onConfirm={this.authenticate} />
              {/* <Authenticate.Register onConfirm={this.authenticate} /> */}
            </>
          )}
        </Pane>
      </Pane>
    )
  }
}

export default Header
