import React, { useEffect, useState } from 'react';
import { fetchAllCharacters } from './redux/starWarsSlice';
import { useAppDispatch, useAppSelector } from './hooks';
import axios from 'axios';
// import { peopleResponse, useGetPeopleQuery } from './services/starWars';
import Table from './Table';

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllCharacters());
  }, []);

  const people = useAppSelector((state) => state.starWars.people);

  let keys: {
    Header: string;
    accessor: string;
  }[];

  if (people.length) {
    keys = Object.keys(people[0]).map((key) => ({
      Header: key,
      accessor: key,
    }));
  }

  const data = React.useMemo(() => people, [people]);
  const columns = React.useMemo(() => keys, [people]);
  console.log(data);

  return (
    <div className="App">
      {people.length ? <Table columns={columns} data={data} /> : <p>Loading</p>}
    </div>
  );
};

export default App;
