import React from "react";

import { Pane, Heading, Button, Spinner, SearchInput } from "evergreen-ui";
import TablePage from "../components/TablePage";
// import EditUser from '../components/Actions/EditUser/EditUser'

const Bets = ({ actions }) => {
  const columns = [
    ["ID", "id"],
    ['Propositionid', 'propositionid'],
    ["Type", "type"],
    ["State", "state"],
    ["Selection", "selection"],
    ["Amount", "amount", "number"],
    
  ];

  return (
    <TablePage
      actions={actions}
      columns={columns}
      listFunc={actions.listBets}
      // editFunc={EditUser}
    />
  );
};

export default Bets;
