import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/usersService'
import { unstable_routeRSCServerRequest } from 'react-router-dom'

export const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setUsers: (state,action) => {
            return action.payload
        },
        newUser: (state,action) => {
            return state.concat(action.payload)
        },
        deleteUser: (state,action) => {
            return state.filter(user => user.id !== action.payload)
        },
    }
})

export const { setUsers, newUser, deleteUser } = usersSlice.actions

export const initializeUsers = () => {
    return async dispatch => {
        let users = null
        try{
            users = await userService.getUsers()
        } catch (e){
            console.log("error",e.message)
        }
        dispatch(setUsers(users))
    }
}

export default usersSlice.reducer

