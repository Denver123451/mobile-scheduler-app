import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEvent, IEventState } from '@/types/types';

const initialState: IEventState = {
  events: [],
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent(state, action: PayloadAction<IEvent>) {
      state.events.push(action.payload);
      console.log(state.events);
    },
    removeEvent(state, action: PayloadAction<string>) {
      state.events = state.events.filter(
        (event) => event.id !== action.payload,
      );
    },
  },
});

export const { addEvent, removeEvent } = eventSlice.actions;
export default eventSlice.reducer;
