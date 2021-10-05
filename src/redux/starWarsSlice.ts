import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PeopleState, FilmsState } from '../types';
import { RootState } from './store';
import { getStarWarsPeople } from '../services/getStarWarsPeople';

type initialStateType = {
  loading: boolean;
  error: boolean;
  people: PeopleState[];
  films: FilmsState[];
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

export const fetchAllCharacters = createAsyncThunk(
  'starWars/fetchAllCharacters',
  async () => {
    const starwarsPeople = await getStarWarsPeople();
    return starwarsPeople;
  }
);

export const starWarsSlice = createSlice({
  name: 'starWars',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCharacters.fulfilled, (state, action) => {
      state.people = action.payload;
    });
  },
});

export const selectPeople = (state: RootState) => state.starWars.people;
