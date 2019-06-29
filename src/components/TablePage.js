import React, { useState, useEffect } from "react";
import { Pane, Heading, Button, Spinner, SearchInput } from "evergreen-ui";
import DataTable from "./DataTable";

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set debouncedValue to value (passed in) after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
}

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
    setSearchTerm('')
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
    if (searchTerm.length < 2) return;
    setLoading(true);

    const searchResults = list.filter(row => {
      return columns.find(([label, prop, type]) => {
        return row[prop]
          .toString()
          .toLowerCase()
          .includes(searchTerm);
      });
    });

    setLoading(false);
    return setSeachResults(searchResults);
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  useEffect(onSearch, [debouncedSearchTerm]);

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
            setSearchTerm(target.value.toString().toLowerCase());
            // return debounceSearch();
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
