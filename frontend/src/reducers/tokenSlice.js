import { createSlice } from '@reduxjs/toolkit'

export const tokenSlice = createSlice({
    name: 'token',
    initialState: null,
    reducers: {
        setToken: (_state, action) => {
            return `Bearer ${action.payload}`
        },
        clearToken: () => {
            return null
        }
    }
})

export const { setToken, clearToken } = tokenSlice.actions

export default tokenSlice.reducer