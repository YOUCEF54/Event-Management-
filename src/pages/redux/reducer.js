import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    client : {
        deleteId : null,
        formId:undefined,
        isLogOut : false,
        isRegd : false,
        isChanged : false
    }
}

export const ReducerSlice = createSlice(
    {
        name:"crud",
        initialState,
        reducers:{
            deleteEventRed : (state , action)=>{
                state.client.deleteId = action.payload
            },
            updateAction : (state , action)=>{
                state.client.formId = action.payload
            },
            isAdmin : (state , action)=>{
                state.client.fullName = action.payload
            },
            logOutAction : (state , action)=>{
                state.client.isLogOut = action.payload
            },
            registerAction : (state , action)=>{
                state.client.isRegd = action.payload
            },
            statusAction : (state , action)=>{
                state.client.isChanged = action.payload
            },
            
        }
    }
)

export const {deleteEventRed, updateAction , isAdmin , logOutAction ,registerAction, statusAction} = ReducerSlice.actions
export default ReducerSlice.reducer