import React, { useState, useEffect } from "react";
import { Pane, Heading, Button, Spinner, SearchInput } from "evergreen-ui";
import DataTable from "./DataTable";

const TablePage = ({
  actions,
  columns = [["ID", "id"]],
  listFunc,
  editFunc,
  tableActions
}) => {
  const [state, setState] = useState({
    columns,
    loading: true,
    list: [],
    searchTerm: "",
    searchResults: []
  });

  console.log("page render:", state);

  const updateStateProp = (prop, data) => {
    return setState({ ...state, [prop]: data });
  };

  const mergeState = newState => {
    return setState({
      ...state,
      ...newState
    });
  };

  const populateList = () => {
    updateStateProp("loading", true);
    listFunc()
      .then(list =>
        mergeState({
          loading: false,
          list
        })
      )
      .catch(console.error);
  };

  // populate the page list
  useEffect(populateList, []);

  const onSearch = e => {
    const searchTerm = e.target.value.toLowerCase();

    const searchResults = state.list.filter(row => {
      return columns.find(([label, prop, type]) => {
        // console.log(row[prop], state.searchTerm);
        try {
          return row[prop].toLowerCase().includes(state.searchTerm);
        } catch (e) {
          return row[prop].includes(state.searchTerm);
        }
      });
    });

    return mergeState({
      searchTerm,
      searchResults
    });
  };

  return (
    <Pane width={"100%"} display="flex" flexDirection="column">
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
        <Button onClick={populateList} iconBefore="refresh" marginLeft={16}>
          Refresh
        </Button>
        {tableActions}
        <Pane width={1} flex={1} />
        <SearchInput
          placeholder="Search..."
          onChange={onSearch}
          value={state.searchTerm}
        />
      </Pane>
      <Pane
        width={"100%"}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {state.loading ? (
          <Pane padding={32}>
            <Spinner />
          </Pane>
        ) : (
          <DataTable
            columns={state.columns}
            rows={
              state.searchTerm.length > 0 ? state.searchResults : state.list
            }
            actions={actions}
            Edit={editFunc}
          />
        )}
      </Pane>
    </Pane>
  );
};

export default TablePage;
