import React, { useEffect } from 'react';
import {
  fetchAllFilms,
  fetchAllPeople,
  getFilmPeople,
} from './redux/starWarsSlice';
import { useAppDispatch, useAppSelector } from './hooks';
import Table from './Table';
import { PeopleState, ReactTableColums } from './types';
import './styles/styles.scss';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Fetch Star Wars Character
    dispatch(fetchAllPeople());

    // Fetch Star Wars Films
    dispatch(fetchAllFilms());
  }, []);

  // Selectors for people, films and peopleToDIsplay
  const people = useAppSelector((state) => state.starWars.people);
  const films = useAppSelector((state) => state.starWars.films);
  const filteredPeopleUrl = useAppSelector(
    (state) => state.starWars.filteredPeopleUrl
  );

  let tableColumns: ReactTableColums[];
  let tableData: PeopleState[];

  const filteredPeople = people.filter((element) =>
    filteredPeopleUrl?.includes(element.url)
  );

  // Set tableColumns
  tableColumns = [
    {
      Header: 'Character Name',
      accessor: 'name',
    },
    {
      Header: 'Eye Color',
      accessor: 'eye_color',
    },
    {
      Header: 'Hair Color',
      accessor: 'hair_color',
    },
    {
      Header: 'Skin Color',
      accessor: 'skin_color',
    },
    {
      Header: 'Gender',
      accessor: 'gender',
    },
    {
      Header: 'Url',
      accessor: 'url',
    },
  ];

  // Set tableData
  if (filteredPeople.length) {
    tableData = filteredPeople;
  } else {
    tableData = people;
  }

  const data = React.useMemo(() => tableData, [tableData]);
  const columns = React.useMemo(() => tableColumns, []);

  return (
    <div className="App">
      {people.length && films.length ? (
        <>
          <select onChange={(e) => dispatch(getFilmPeople(e.target.value))}>
            {films.map((film) => (
              <option key={film.url} value={film.url}>
                {film.title}
              </option>
            ))}
          </select>
          <Table columns={columns} data={data} />
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default App;
