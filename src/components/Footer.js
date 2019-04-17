import React from "react";
import { Pane, Text, Link } from "evergreen-ui";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Pane
        borderTop
        display="flex"
        padding={16}
        background="tint2"
        borderRadius={3}
        flex={1}
        alignItems="center"
        display="flex"
        justifyContent="center"
      >
        <Text>
          Maintained by: {"  "}
          <Link href="https://chips.gg/" target="_blank">
            Chips.gg
          </Link>
        </Text>
      </Pane>
    );
  }
}

export default Footer;
