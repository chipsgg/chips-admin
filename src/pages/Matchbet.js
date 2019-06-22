import React, { useState, useEffect } from "react";
import { Pane, Tablist, Tab } from "evergreen-ui";

import { sortBy, debounce } from "lodash";

import MatchEditor from "../components/Actions/MatchEditor";
import EditMatch from "../components/Actions/EditMatch";
import CreateMatch from "../components/Actions/CreateMatch";
import TablePage from "../components/TablePage";

const TableActions = ({ actions }) => {
  return (
    <>
      <CreateMatch actions={actions} onConfirm={actions.createMatch} />
    </>
  );
};

const Matchbet = ({ actions }) => {
  const [tabs, setTabs] = useState(["Matches", "Propositions"]);
  const [selectedTab, setSelectedTab] = useState("Matches");

  return (
    <Pane width={"100%"} display="flex" flexDirection="column">
      <Pane display="flex" padding={8}>
        <Tablist>
          {tabs.map(tab => (
            <Tab
              key={tab}
              isSelected={selectedTab === tab}
              onSelect={() => setSelectedTab(tab)}
            >
              {tab}
            </Tab>
          ))}
        </Tablist>
      </Pane>
      <Router tab={selectedTab} actions={actions} />
    </Pane>
  );
};

const Router = ({ tab, actions }) => {
  switch (tab) {
    case "Matches":
      return <Matches actions={actions} />;
    case "Propositions":
      return <Propositions actions={actions} />;
    default:
      return <Matches actions={actions} />;
  }
};

const Matches = ({ actions }) => {
  const columns = [
    ["ID", "id"],
    ["Name", "name"],
    ["Opponents", "opponents", "opponents"],
    // ["Value", "value", 'number'],
    ["Provider", "provider"],
    // ['Winner', 'winner']
    ["Status", "state", "state"],
    ["Start Time", "startTime", "time"]
  ];

  return (
    <TablePage
      actions={actions}
      columns={columns}
      listFunc={e => {
        return actions
          .listAvailableMatchesWithPropositions()
          .then(list => sortBy(list, "startTime"));
      }}
      editFunc={p => <EditMatch {...p} />}
      tableActions={<TableActions actions={actions} />}
    />
  );
};

const Propositions = ({ actions }) => {
  const columns = [
    ["ID", "id"],
    ["Name", "name"],
    ["Matchid", "matchid"],
    ["Value", "value", 'number'],
    ["Provider", "provider"],
    ['Selections', 'selections', 'array'],
    ['Odds', 'odds', 'odds'],
    ["Status", "state", "state"],
  ];

  return (
    <TablePage
      actions={actions}
      columns={columns}
      listFunc={e => {
        return actions
          .listPropositions()
          .then(list => {
            console.log(list)
            return sortBy(list, "created")
          });
      }}
      // editFunc={p => <EditMatch {...p} />}
      tableActions={<TableActions actions={actions} />}
    />
  );
};

export default Matchbet;
