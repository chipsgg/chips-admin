import React from "react";
import {
  Pane,
  Spinner,
  Text,
  Dialog,
  Heading,
  Button,
  Tablist,
  Tab
} from "evergreen-ui";
import DataTable from "../components/DataTable";
import { sortBy } from "lodash";
import CreateMatch from "../components/Actions/CreateMatch";
import EditMatch from "../components/Actions/EditMatch";

class Macthes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      columns: [
        ["ID", "id"],
        ["Opponents", "opponents", "opponents"],
        // ["Value", "value", 'number'],
        ["Status", "state", "state"],
        ["Provider", "provider"],
        ["Start Time", "startTime", "time"]
      ],
      tabs: ["Matches", "Propositions", "Users"],
      selectedTab: "Matches"
    };
  }

  componentDidMount() {
    this.getMatches();
  }

  getMatches = async () => {
    this.setState({ loading: true });
    const { actions } = this.props;
    const list = await actions.listAvailableMatchesWithPropositions();
    console.log(list);
    this.setState({
      loading: false,
      matches: sortBy(list, "startTime")
    });
  };

  render() {
    const { loading, columns, matches, tabs, selectedTab } = this.state;
    const { actions } = this.props;
    return (
      <Pane width={"100%"} display="flex" flexDirection="column">
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
          width={"100%"}
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
              rows={matches}
              onSelect={this.onSelect}
            />
          )}
        </Pane>
      </Pane>
    );
  }
}

export default Macthes;
