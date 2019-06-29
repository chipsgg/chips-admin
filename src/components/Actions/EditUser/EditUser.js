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

import Wallet from './Wallet'

class EditMatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: false,
      loading: false,
      user: props.row
    };
  }

  toggleShown = () => {
    this.setState({
      isShown: !this.state.isShown
    });
  };

//   getPropositions = async () => {
//     this.setState({ loading: true });
//     const { actions, match } = this.props;
//     const list = await actions.listPropositionsByMatchid({ matchid: match.id });
//     this.setState({
//       loading: false
//     });
//   };

  render() {
    const { isShown, user, loading } = this.state;
    const { actions } = this.props;
    return (
      <Pane>
        <SideSheet
          preventBodyScrolling={true}
          isShown={isShown}
          onCloseComplete={() => this.setState({ isShown: false })}
          containerProps={{
            display: "flex",
            flex: "1",
            flexDirection: "column"
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
                <Heading size={600}>Edit User</Heading>
                <Paragraph size={400} color="muted">
                  {user.id}
                </Paragraph>
                <Badge>{user.username || user.login}</Badge>
              </Pane>
              <Pane
                display="flex"
                alignItems="center"
                justifyContent="center"
                padding={16}
              >
                {/* <Button iconBefore="refresh" onClick={this.getPropositions}>
                  Refresh
                </Button> */}
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
              <Wallet actions={actions} userid={user.id} />
              // <Card
              //   backgroundColor="white"
              //   elevation={0}
              //   margin={16}
              //   padding={16}
              // >
              //   yo nig
              // </Card>
            )}
          </Pane>
        </SideSheet>
        <Tooltip content="Edit">
          <Button iconBefore="annotation" onClick={this.toggleShown}>
            Edit
          </Button>
        </Tooltip>
      </Pane>
    );
  }
}

export default EditMatch;
