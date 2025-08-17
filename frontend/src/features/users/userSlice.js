import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import api from '@/api/axiosInstance'

const usersAdapter = createEntityAdapter({
  selectId: (u) => u.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

const initialState = usersAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchUsers = createAsyncThunk('users/fetchAll', async () => {
  const { data } = await api.get('/users')
  return data
})
export const addUser = createAsyncThunk('users/add', async (payload) => {
  const { data } = await api.post('/users', payload)
  return data
})
export const updateUser = createAsyncThunk('users/update', async (payload) => {
  const { data } = await api.put(`/users/${payload.id}`, payload)
  return data
})
export const deleteUser = createAsyncThunk('users/delete', async (id) => {
  await api.delete(`/users/${id}`)
  return id
})

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchUsers.pending, (s) => {
      s.status = 'loading'
      s.error = null
    })
      .addCase(fetchUsers.fulfilled, (s, a) => {
        s.status = 'succeeded'
        usersAdapter.setAll(s, a.payload)
      })
      .addCase(fetchUsers.rejected, (s, a) => {
        s.status = 'failed'
        s.error = a.error.message
      })

      .addCase(addUser.fulfilled, (s, a) => {
        usersAdapter.addOne(s, a.payload)
      })
      .addCase(updateUser.fulfilled, (s, a) => {
        usersAdapter.upsertOne(s, a.payload)
      })
      .addCase(deleteUser.fulfilled, (s, a) => {
        usersAdapter.removeOne(s, a.payload)
      })
  },
})

export default userSlice.reducer
export const usersSelectors = usersAdapter.getSelectors((state) => state.users)
