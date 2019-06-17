import React from "react";
import { withRouter } from "react-router-dom";

import { Pane, Heading, Menu } from "evergreen-ui";

import Pages from '../pages'

class SideMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: Object.keys(Pages).map(key => {
        return { label: key, value: `/${key}` }
      }),
      selected: props.location.pathname
    };
  }

  handleOnClick = selected => {
    this.setState({ selected });
    this.props.history.push(selected);
  };

  render() {
    const { title, options, selected } = this.state;
    return (
      <Pane borderRight width={250}>
        <Menu>
          <Menu.OptionsGroup
            title={title}
            options={options}
            selected={selected}
            onChange={this.handleOnClick}
          />
        </Menu>
      </Pane>
    );
  }
}

export default withRouter(SideMenu);
