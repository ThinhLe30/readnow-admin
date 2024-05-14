import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"

import { userApi } from "@/redux/services/user/user.service"
import { authApi } from "@/redux/services/auth/auth.service"
import { roomApi } from "./services/room/room.service"
import { helpApi } from "./services/help/help.service"
import { roomBlockApi } from "./services/block/block.service"

import authSlice from "@/redux/features/auth/auth.slice"
import searchSlice from "@/redux/features/search/search.slice"
import searchMapSlice from "./features/search-map/search-map.slice"
import modalSlice from "./features/modal/modal.slice"
import generateRoomSlice from "./features/generateRoom/generateRoom.slice"
import contractSlice from "./features/contract/contract.slice"
import { findingRoomApi } from "./services/findingRoom/findingRoom.service"
import { roomDetailApi } from "./services/room-detail/room-detail.service"
import { rentalApi } from "./services/rental/rental.service"
import { getChecklistApi } from "./services/checklist/checklist.service"
import { utilityApi } from "./services/utilities/utilities.service"
import { rentalsApi } from "./services/rentals/rentals.service"
import { myProfileApi } from "./services/myProfile/my-profile.service"
import { becomeHostApi } from "./services/becomeHost/become-host.service"
import { paymentsApi } from "./services/payments/payments.service"
import { transactionApi } from "./services/transactions/transaction.service"
import { statisticsApi } from "./services/statistics/statistics.service"

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [helpApi.reducerPath]: helpApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
    [findingRoomApi.reducerPath]: findingRoomApi.reducer,
    [getChecklistApi.reducerPath]: getChecklistApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [roomBlockApi.reducerPath]: roomBlockApi.reducer,
    [roomDetailApi.reducerPath]: roomDetailApi.reducer,
    [rentalApi.reducerPath]: rentalApi.reducer,
    [utilityApi.reducerPath]: utilityApi.reducer,
    [myProfileApi.reducerPath]: myProfileApi.reducer,
    [becomeHostApi.reducerPath]: becomeHostApi.reducer,
    [rentalsApi.reducerPath]: rentalsApi.reducer,
    [paymentsApi.reducerPath]: paymentsApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [statisticsApi.reducerPath]: statisticsApi.reducer,
    auth: authSlice.reducer,
    search: searchSlice,
    searchMap: searchMapSlice,
    contract: contractSlice,
    modal: modalSlice,
    generateRoom: generateRoomSlice
})

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: customizedMiddleware.concat(
        userApi.middleware,
        roomApi.middleware,
        authApi.middleware,
        helpApi.middleware,
        roomBlockApi.middleware,
        findingRoomApi.middleware,
        getChecklistApi.middleware,
        transactionApi.middleware,
        roomDetailApi.middleware,
        rentalApi.middleware,
        utilityApi.middleware,
        rentalsApi.middleware,
        paymentsApi.middleware,
        myProfileApi.middleware,
        becomeHostApi.middleware,
        statisticsApi.middleware
    )
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
