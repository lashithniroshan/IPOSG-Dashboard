import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from '../../api/axiosInstance';

export type Product = {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    rating: number;
    active: boolean;
    image: string;
    description?: string;
};

type productsState = {
    list: Product[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    total: number;
};

const initialState: productsState = {
    list: [],
    status: "idle",
    error: null,
    total:0,
};

export const fetchProducts = createAsyncThunk(
"products/fetchProducts",
async(params:{q?: string; category?: string; _page?: number; _limit?: number; minPrice?: number; maxPrice?: number}={}) => {
    const {q, category, _page = 1, _limit = 10, minPrice, maxPrice} = params || {};
    const searchParams = new URLSearchParams();
    if (q) searchParams.set("q", q);
    if (category) searchParams.set("category", category);
    searchParams.set("_page", String(_page));
    searchParams.set("_limit", String(_limit));
    if( minPrice != null) searchParams.set("price_gte", String(minPrice));
    if( maxPrice != null) searchParams.set("price_lte", String(maxPrice));

    const res = await axios.get(`/products?${searchParams.toString()}`);
    return { data:res.data as Product[], total: Number(res.headers["x-total-count"] || res.data.length) };
}
);

export const fetchProductById = createAsyncThunk("products/fetchById", async(id: number)=>{
    const res = await axios.get(`/products/${id}`);
    return res.data as Product;
});

export const updateProduct = createAsyncThunk(
"products/updateProduct",
async ({id, changes }: {id: number; changes:Partial<Product>}) =>{
const res = await axios.patch(`/products/${id}`, changes);
return res.data as Product;
}
);

const productsSlice = createSlice({
name: "products",
initialState,
reducers:{},
extraReducers:(builder)=>{
builder
.addCase(fetchProducts.pending, (state) => {
    state.status = "loading";
})
.addCase(fetchProducts.fulfilled, (state, action)=>{
state.status = "succeeded";
state.list = action.payload.data;
state.total = action.payload.total;
})
.addCase(fetchProducts.rejected, (state, action)=>{
state.status = "failed";
state.error = action.error.message ?? "Failed to load products";
})
.addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>)=>{
const idx = state.list.findIndex((p) => p.id === action.payload.id);
if(idx >= 0) state.list[idx] = action.payload;
});
},
});

export default productsSlice.reducer;