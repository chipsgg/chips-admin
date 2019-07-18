import React, { useState, useEffect } from "react";

import { Pane, Text, Heading } from "evergreen-ui";
import Stat from "../components/Stat.js";

const Home = ({ actions }) => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    actions
      .getStats({
        start: 1,
        end: Date.now()
      })
      .then(([stats]) => {
        console.log(stats);
        setStats(stats);
      })
      .catch(console.error);
  }, []);

  return (
    <Pane
      width={"100%"}
      display="flex"
      padding={16}
      alignItems="center"
      justifyContent="center"
    >
      <Stat label="Total Bet Count" value={stats.betsCount} />
      <Stat type="money" label="Total Value Bet" value={stats.betsValue} />
      <Stat label="Resolved Propositions" value={stats.propositionsComplete} />
      <Stat type="money" label="Total Rake" value={stats.rakeValue} />
    </Pane>
  );
};

export default Home;
