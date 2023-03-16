import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cartItems:[],
    amount:0,
    total:0,
    isLoading:true
}
const url = 'https://course-api.com/react-useReducer-cart-project'

export const getCartItems = createAsyncThunk(
    'cart/getCartItems',async (_,thunkAPI)=>{
        //  console.log(thunkAPI.getState())
        try {
            const res = await axios(url)
            return res.data
        } catch (err) {
           return thunkAPI.rejectWithValue('something went wrong')
        }

    
    }
)

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        clearCart: (state)=>{
            state.cartItems=[]
        },
        removeItem:(state,{payload})=>{
            state.cartItems= state.cartItems.filter((item)=>item.id !== payload)
        },
        increase:(state,{payload})=>{
            const cartItem = state.cartItems.find((item)=>item.id===payload) 
            cartItem.amount = cartItem.amount + 1
        },
        decrease:(state,{payload})=>{
            const cartItem = state.cartItems.find((item)=>item.id===payload) 
            cartItem.amount = cartItem.amount - 1
        },
        calculateTotals:(state)=>{
             let amount = 0
             let total = 0
            state.cartItems.forEach((item)=>{
                amount += item.amount
                total += item.amount * item.price
            })
            state.amount = amount
            state.total = total
        }
    },
    extraReducers:{
        [getCartItems.pending]:(state)=>{
         state.isLoading = true
        },
        [getCartItems.fulfilled]:(state,action)=>{
            state.isLoading = false
            state.cartItems = action.payload
        },
        [getCartItems.rejected]:(state,action)=>{
            console.log(action)
            state.isLoading = false
        }

    }
})
// console.log(cartSlice)
export const {clearCart,removeItem,increase,decrease,calculateTotals} = cartSlice.actions
export default cartSlice.reducer
