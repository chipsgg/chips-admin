import React, { useState, useEffect } from "react";

import { Pane, Text, Heading, TextInputField } from "evergreen-ui";
import Stat from "../components/Stat.js";

const DateRange = ({ onChange }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    onChange({
      start: isNaN(Date.parse(startDate)) ? 1 : Date.parse(startDate),
      end: isNaN(Date.parse(endDate)) ? Date.now() : Date.parse(endDate)
    });
  }, [startDate, endDate]);

  return (
    <Pane display="flex">
      <TextInputField
        type="date"
        label="Start Date"
        value={startDate}
        onChange={e => {
          setStartDate(e.target.value);
        }}
      />
      <Pane marginLeft={4} marginRight={4} />
      <TextInputField
        type="date"
        label="End Date"
        value={endDate}
        onChange={e => {
          setEndDate(e.target.value);
        }}
      />
    </Pane>
  );
};

const Home = ({ actions }) => {
  const [stats, setStats] = useState({});

  const LoadStats = timerange => {
    // timerange = {
    //   start: 1,
    //   end: Date.now()
    // }

    return actions
      .getStats(timerange)
      .then(timeSeries => {
        const results = timeSeries.reduce((memo, stats, idx) => {
          console.log(idx, stats);

          // for each stat in the time series, we add them together
          const keys = Object.keys(stats);
          keys.forEach(key => {
            if (key == "id" || key == "created" || key == "updated") return;
            memo[key] = 0;
            memo[key] += stats[key];
          });

          return memo;
        }, {});

        console.log(results);

        return setStats(results);
      })
      .catch(console.error);
  };

  return (
    <Pane width={"100%"} display="flex" flexDirection="column">
      <Pane
        width={"100%"}
        borderBottom
        display="flex"
        padding={16}
        background="tint1"
        alignItems="center"
      >
        <DateRange onChange={LoadStats} />
      </Pane>{" "}
      <Stats {...stats} />
    </Pane>
  );
};

const Stats = stats => {
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
      <Stat type="money" label="Total Deposited" value={stats.depositvalue} />
      <Stat type="money" label="Total Withdrawn" value={stats.withdrawValue} />
      <Stat label="New Users" value={stats.newUsers} />
    </Pane>
  );
};

export default Home;
