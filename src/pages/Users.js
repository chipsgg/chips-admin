import React from "react";

import { Pane, Heading, Button, Spinner, SearchInput } from "evergreen-ui";
import TablePage from "../components/TablePage";
import EditUser from "../components/Actions/EditUser/EditUser";

const Users = ({ actions }) => {
  const columns = [
    ["ID", "id"],
    ["Login", "login"],
    ["Username", "username"]
    // ["Balance", "balance", "number"],
    // ["Can Withdraw", "canWithdraw", "boolean"],
    // ["Can Deposit", "canDeposit", 'boolean']
  ];

  return (
    <TablePage
      actions={actions}
      columns={columns}
      listFunc={actions.listUsers}
      editFunc={p => <EditUser {...p} />}
    />
  );
};

export default Users;
