import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import api from '@/api/axiosInstance'

const projectsAdapter = createEntityAdapter({
  selectId: (p) => p.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

const initialState = projectsAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchProjects = createAsyncThunk('projects/fetchAll', async () => {
  const { data } = await api.get('/projects')
  return data // array
})

export const addProject = createAsyncThunk('projects/add', async (payload) => {
  const { data } = await api.post('/projects', payload)
  return data // created project
})

export const updateProject = createAsyncThunk(
  'projects/update',
  async (payload) => {
    const { data } = await api.put(`/projects/${payload.id}`, payload)
    return data
  },
)

export const deleteProject = createAsyncThunk('projects/delete', async (id) => {
  await api.delete(`/projects/${id}`)
  return id
})

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchProjects.pending, (s) => {
      s.status = 'loading'
      s.error = null
    })
      .addCase(fetchProjects.fulfilled, (s, a) => {
        s.status = 'succeeded'
        projectsAdapter.setAll(s, a.payload)
      })
      .addCase(fetchProjects.rejected, (s, a) => {
        s.status = 'failed'
        s.error = a.error.message
      })

      .addCase(addProject.fulfilled, (s, a) => {
        projectsAdapter.addOne(s, a.payload)
      })
      .addCase(updateProject.fulfilled, (s, a) => {
        projectsAdapter.upsertOne(s, a.payload)
      })
      .addCase(deleteProject.fulfilled, (s, a) => {
        projectsAdapter.removeOne(s, a.payload)
      })
  },
})

export default projectSlice.reducer
export const projectsSelectors = projectsAdapter.getSelectors(
  (state) => state.projects,
)
