import React, { useState, useEffect } from "react";
import { Pane, Heading, Button, Spinner, SearchInput } from "evergreen-ui";
import DataTable from "./DataTable";
import { debounce } from "lodash";

const TablePage = ({
  actions,
  columns = [["ID", "id"]],
  listFunc,
  editFunc,
  tableActions
}) => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSeachResults] = useState([]);

  const populateList = () => {
    setLoading(true);
    listFunc()
      .then(list => {
        setLoading(false);
        setList(list);
      })
      .catch(console.error);
  };

  // populate the page list
  useEffect(populateList, []);

  const onSearch = value => {
    const searchResults = list.filter(row => {
      return columns.find(([label, prop, type]) => {
        // console.log(row[prop], searchTerm);
        console.log("searching...")
        return row[prop]
          .toString()
          .toLowerCase()
          .includes(searchTerm);
      });
    });

    return setSeachResults(searchResults);
  };

  const debounceSearch = debounce(onSearch, 1000);

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
          onChange={({ target }) => {
            setSearchTerm(target.value);
            return debounceSearch();
          }}
          value={searchTerm}
        />
      </Pane>
      <Pane
        width={"100%"}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {loading ? (
          <Pane padding={32}>
            <Spinner />
          </Pane>
        ) : (
          <DataTable
            columns={columns}
            rows={searchTerm.length > 0 ? searchResults : list}
            actions={actions}
            Edit={editFunc}
          />
        )}
      </Pane>
    </Pane>
  );
};

export default TablePage;
