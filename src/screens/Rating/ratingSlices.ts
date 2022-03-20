import {createSlice} from '@reduxjs/toolkit';

type Rate = {
  userId: number;
  userName: string;
  rate: number;
  desc: string;
};

const intialState = {
  rates: [] as Rate[],
};

const ratingSlices = createSlice({
  name: 'rating',
  initialState: intialState,
  reducers: {
    setRate(state, action) {
      const {userId, rate, desc} = action.payload;
      const hasData = state.rates.find(r => r.userId === userId);
      if (hasData) {
        hasData.rate = rate;
        hasData.desc = desc;
      } else {
        state.rates.push(action.payload);
      }
    },
    resetRates: () => intialState,
  },
});
export const {setRate, resetRates} = ratingSlices.actions;
export const selectRateByUserId = (state: any, userId: number) =>
  state.rating.rates.find((rate: Rate) => rate.userId === userId);

export default ratingSlices.reducer;
