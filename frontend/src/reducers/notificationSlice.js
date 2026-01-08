import { createSlice } from '@reduxjs/toolkit'

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notificationType: '',
    notificationMessage: ''
  },
  reducers: {
    setNotification: (state, action) => {
      state.notificationType = action.payload.notificationType,
        state.notificationMessage = action.payload.notificationMessage
    }

  }
})

export const { setNotification } = notificationSlice.actions

export const setNotificationAndTimeout = (type, msg, timing) => {
  console.log('returning notification method')
  return async function setNotificationAndTimeoutThunk(dispatch) {
    console.log('entering notification method')
    dispatch(setNotification({ notificationType: type, notificationMessage: msg }))
    setTimeout(() => {
      dispatch(setNotification({ notificationType: '', notificationMessage: '' }))
    }, timing)

  }
}

export default notificationSlice.reducer
