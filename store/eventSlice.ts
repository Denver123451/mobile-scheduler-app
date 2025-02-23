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
    },
    removeEvent(state, action: PayloadAction<string>) {
      state.events = state.events.filter(
        (event) => event.id !== action.payload,
      );
    },
    updateEvent(state, action: PayloadAction<IEvent>) {
      const index = state.events.findIndex((ev) => ev.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
  },
});

export const { addEvent, removeEvent, updateEvent } = eventSlice.actions;
export default eventSlice.reducer;
