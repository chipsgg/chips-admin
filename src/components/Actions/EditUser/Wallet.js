import React from "react";
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
  Spinner
} from "evergreen-ui";

import AddCredits from "./AddCredits";
import RemoveCredits from "./RemoveCredits";

class EditMatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wallet: null
    };
  }

  componentDidMount() {
    this.getWallet();
  }

  getWallet = async () => {
    this.setState({ wallet: null });
    const { actions, userid } = this.props;
    const wallet = await actions.getWallet({ userid });
    console.log(wallet);
    this.setState({
      wallet
    });
  };

  render() {
    const { wallet } = this.state;
    const { actions, userid } = this.props;
    return (
      <Pane>
        {!wallet ? (
          <Card
            backgroundColor="white"
            elevation={0}
            margin={16}
            display="flex"
            alignItems="center"
            justifyContent="center"
            padding={32}
          >
            <Spinner />
          </Card>
        ) : (
          <Card backgroundColor="white" elevation={0} margin={16} padding={16}>
            <Pane display="flex">
              <Pane flex={1}>
                <Heading>Wallet</Heading>
              </Pane>
              <Pane display="flex" flexDirection="row">
                <Tooltip content="Refresh">
                  <IconButton
                    marginLeft={16}
                    icon="refresh"
                    onClick={this.getWallet}
                  />
                </Tooltip>
                <AddCredits
                  onConfirm={async amount => {
                    await actions.creditWallet({ userid, amount });
                    this.getWallet();
                  }}
                />
                <RemoveCredits
                  onConfirm={async amount => {
                    await actions.debitWallet({ userid, amount });
                    this.getWallet();
                  }}
                />
              </Pane>
            </Pane>
            <UnorderedList>
              <ListItem icon="bank-account">
                $
                {wallet.balance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </ListItem>
              <ListItem
                icon="tick-circle"
                iconColor={wallet.canDeposit ? "success" : "danger"}
              >
                Can Deposit
              </ListItem>
              <ListItem
                icon="tick-circle"
                iconColor={wallet.canWithdraw ? "success" : "danger"}
              >
                Can Withdraw
              </ListItem>
            </UnorderedList>
          </Card>
        )}
      </Pane>
    );
  }
}

export default EditMatch;
