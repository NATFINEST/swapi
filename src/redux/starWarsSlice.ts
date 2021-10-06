import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { PeopleState, FilmsState } from '../types';
import { RootState } from './store';
import { getStarWarsData } from '../services/getStarWarsPeople';

type initialStateType = {
  loading: boolean;
  error: boolean;
  people: PeopleState[];
  films: FilmsState[];
  currentFilm?: FilmsState;
  filteredPeopleUrl?: string[];
};

export type peopleResponse = {
  count: number;
  results: PeopleState[];
  next: string;
  previous: string;
};

const peopleList: PeopleState[] = [];
const filmsList: FilmsState[] = [];

const initialState: initialStateType = {
  loading: false,
  error: false,
  people: peopleList,
  films: filmsList,
};

export const fetchAllPeople = createAsyncThunk(
  'starWars/fetchAllPeople',
  async () => {
    const starWarsPeople = await getStarWarsData(
      `https://swapi.dev/api/people`
    );
    return starWarsPeople;
  }
);

export const fetchAllFilms = createAsyncThunk(
  'starWars/fetchAllFilms',
  async () => {
    const starWarsFilms = await getStarWarsData('https://swapi.dev/api/films');
    return starWarsFilms;
  }
);

export const starWarsSlice = createSlice({
  name: 'starWars',
  initialState,
  reducers: {
    getFilmPeople: (state, action: PayloadAction<string>) => {
      state.currentFilm = state.films.find(
        (film) => film.url === action.payload
      );
      state.filteredPeopleUrl = state.currentFilm?.characters;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllPeople.fulfilled, (state, action) => {
      state.people = action.payload;
    });
    builder.addCase(fetchAllFilms.fulfilled, (state, action) => {
      state.films = action.payload;
    });
  },
});

export const { getFilmPeople } = starWarsSlice.actions;

// export const selectPeople = (state: RootState, param:any) => {
//   console.log(param);
// };
