import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  contributor_access_token :string;
  quotaposter_access_token: string;
  company: string;
  email: string;
  contributorusername:string;
}

const initialState: IAuthState = {
  contributor_access_token :"",
  quotaposter_access_token: "",
  company: "",
  email: "",
  contributorusername:""
};

export const tokenSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setContributorAccessToken: (state, action: PayloadAction<string>) => {
      state.contributor_access_token = action.payload;
    },
    setQuotaPosterAccessToken: (state, action: PayloadAction<string>) => {
      state.quotaposter_access_token = action.payload;
    },
    setReduxCompany: (state, action: PayloadAction<string>) => {
      state.company = action.payload;
    },
    setReduxEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },setReduxContributorUsername: (state, action: PayloadAction<string>) => {
      state.contributorusername = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setContributorAccessToken, setQuotaPosterAccessToken,setReduxCompany,setReduxEmail,setReduxContributorUsername } = tokenSlice.actions

export const tokensReducer = tokenSlice.reducer;