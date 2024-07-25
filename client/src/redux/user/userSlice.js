import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  error: null,
  loading: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SignInStart: (state) => {
        state.loading = true
    },
    SignInSuccess: (state, action) => {
        state.currentUser = action.payload,
        state.error = null,
        state.loading = false
    },
    SignInFail: (state, action) => {
        state.error = action.payload,
        state.loading = false
    },
    updateUserStart: (state) => {
      state.loading = true
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload,
      state.error = null,
      state.loading = false
    },
    updateUserFail: (state, action) => {
      state.error = action.payload,
      state.loading = false
    },
    deleteUserStart: (state) => {
      state.loading = true
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null,
      state.error = null,
      state.loading = false
    },
    deleteUserFail: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    signOutUserStart: (state) => {
      state.loading = true
    },
    signOutUserSuccess: (state) => {
      state.currentUser = null,
      state.error = null,
      state.loading = false
    },
    signOutUserFail: (state, action) => {
      state.error = action.payload
      state.loading = false
    }
  },
})

export const {
    SignInStart, SignInSuccess, SignInFail,
    updateUserStart, updateUserSuccess, updateUserFail,
    deleteUserStart, deleteUserSuccess, deleteUserFail,
    signOutUserStart, signOutUserSuccess, signOutUserFail
  } = userSlice.actions

export default userSlice.reducer