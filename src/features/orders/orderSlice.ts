import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axiosInstance';

export interface Order {
    id: number;
    productId: number;
    quantity: number;
    total: number;
    status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
    customer: string;
    date: string;
};

type OrderState = {
    list: Order[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
};

const initialState: OrderState = {
    list: [],
    status: "idle",
    error: null,
};

export const fetchOrders = createAsyncThunk(
"orders/fetchOrders",
async() => {
    const res = await axios.get("/orders")
    return res.data as Order[];
}
);

const orderSlice = createSlice({
name: "orders",
initialState,
reducers:{},
extraReducers:(builder)=>{
builder
.addCase(fetchOrders.pending, (state) => {
    state.status = "loading";
})
.addCase(fetchOrders.fulfilled, (state, action)=>{
state.status = "succeeded";
state.list = action.payload;
})
.addCase(fetchOrders.rejected, (state, action)=>{
state.status = "failed";
state.error = action.error.message ?? null;
});
},
});

export default orderSlice.reducer;