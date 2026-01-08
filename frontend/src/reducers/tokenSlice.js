import { createSlice } from '@reduxjs/toolkit'

export const tokenSlice = createSlice({
    name: 'token',
    initialState: null,
    reducers: {
        setToken: (state,action) => {
            return `Bearer ${action.payload}`
        },
        clearToken: (state,action) => {
            return null
        }
    }
})

export const { setToken, clearToken } = tokenSlice.actions

export default tokenSlice.reducer