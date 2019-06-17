import React from "react";

import {
  Pane,
  Spinner,
  Text,
  Dialog,
  Heading,
  Button,
  Tablist,
  Tab,
  SearchInput
} from "evergreen-ui";

const NotFound = () => (
  <Pane padding={4} width={"100%"} display="flex" flexDirection="column">
    <Heading>404</Heading>
    <Text>Not Found</Text>
  </Pane>
);
export default NotFound;
