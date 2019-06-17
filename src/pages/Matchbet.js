import React, { useState, useEffect } from "react";
import { Pane } from "evergreen-ui";

import { sortBy, debounce } from "lodash";

import MatchEditor from "../components/Actions/MatchEditor";
import EditMatch from "../components/Actions/EditMatch";
import CreateMatch from "../components/Actions/CreateMatch";
import TablePage from "../components/TablePage";

const TableActions = ({ actions }) => {
  return (
    <>
      <CreateMatch
        actions={actions}
        onConfirm={async params => {
          await actions.createMatch(params);
          await this.getMatches();
        }}
      />
    </>
  );
};

const Macthes = ({ actions }) => {
  const columns = [
    ["ID", "id"],
    ["Opponents", "opponents", "opponents"],
    // ["Value", "value", 'number'],
    ["Status", "state", "state"],
    ["Provider", "provider"],
    ["Start Time", "startTime", "time"]
  ];

  const [state, setState] = useState({
    tabs: ["Matches", "Propositions", "Users"],
    selectedTab: "Matches"
  });

  return (
    <Pane width={"100%"} display="flex" flexDirection="column">
      {/* <Pane display="flex" padding={8}>
        <Tablist>
          {state.tabs.map(tab => (
            <Tab
              key={tab}
              isSelected={state.selectedTab === tab}
              onSelect={() => this.setState({ selectedTab: tab })}
            >
              {tab}
            </Tab>
          ))}
        </Tablist>
      </Pane> */}
      <TablePage
        actions={actions}
        columns={columns}
        listFunc={e => {
          return actions
            .listAvailableMatchesWithPropositions()
            .then(list => sortBy(list, "startTime"));
        }}
        editFunc={EditMatch}
        tableActions={<TableActions actions={actions} />}
      />
    </Pane>
  );
};

export default Macthes;
