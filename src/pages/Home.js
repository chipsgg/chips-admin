import React from "react";

import { Pane, Text } from "evergreen-ui";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // this.getMatches();
  }

  // async getMatches() {
  //   const { actions } = this.props;
  //   const list = await actions.listAvailableMatchesWithPropositions();
  // }

  render() {
    return (
      <Pane
        width={"100%"}
        display="flex"
        padding={16}
        alignItems="center"
        justifyContent="center"
      >
        <Text>A homepage yo, maybe some stats or somthing...</Text>
      </Pane>
    );
  }
}

export default Home;
