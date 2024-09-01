import { configureStore } from '@reduxjs/toolkit'

const moviesSlice = configureStore({
    name: "movies",
    initialState: {
        movies: [],
        loading: false,
        error: false
    },
    reducers: {
        
    }
})