# SSE React Practical Assessment

This is a complete scaffold for the SSE Product Inventory & Order Management Dashboard.

## Stack
- Vite + React + TypeScript
- Redux Toolkit (slices + createAsyncThunk)
- Material UI (MUI) + MUI DataGrid
- Axios
- json-server (mock API)

## Run locally
1. `npm install`
2. `npm run start:all`  
   - `json-server` runs at `http://localhost:5001`  
   - Dev app runs at `http://localhost:5173` (can be change)

APIs:
- `GET /products`
- `GET /products/:id`
- `PATCH /products/:id`
- `GET /orders`

## Project structure
- `src/features` - feature folders (products, orders)
- `src/components` - reusable components
- `src/app/store.ts` - redux store
- `mock/db.json` - json-server data

## Assessment checklist
- Product List (MUI DataGrid) with search/category/price filters
- Product Details with stock update and active toggle (PATCH)
- Orders list with status badges
- Redux Toolkit (slices + async thunks)
- Mock API (json-server)
- README + architecture notes

## Notes
- Client-side pagination is used by default (json-server supports `_page` & `_limit`).
- For production or larger datasets, switch to server-side pagination.