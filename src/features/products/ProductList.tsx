import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchProducts, type Product } from "./productSlice";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Box, Typography, Paper } from '@mui/material'
import FilterPanel from "../../components/FilterPanel";
import { useNavigate } from "react-router-dom";

const ProductList: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { list, status, total } = useAppSelector((s)=> s.products);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState<string | undefined>(undefined);
    const [priceRange, setPriceRange] = useState<[number, number] | undefined>(undefined);


    useEffect(()=>{
       dispatch(fetchProducts({q: query, category, _page: page, _limit: pageSize, minPrice:priceRange?.[0], maxPrice:priceRange?.[1]})); 
    },[dispatch, page, pageSize, query, category, priceRange]);

    const columns: GridColDef[] = [
        {field:"id", headerName:"ID", width:70 },
        {field:"name", headerName:"Name", width:250 },
        {field:"category", headerName:"Category", width:70 },
        {field:"price", headerName:"Price", width:100, type:"number" },
        {field:"stock", headerName:"Stock", width:100,type:"number" },
        {field:"rating", headerName:"Rating", width:100, type:"number" },
    ];

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Products
            </Typography>
            <Paper sx={{p: 2, mb: 2}}>
<FilterPanel
onSearch={(q) => {setQuery(q); setPage(1);}}
onCategory={(c) => {setCategory(c); setPage(1);}}
onPriceRange={(r) => {setPriceRange(r); setPage(1)}}
/>
            </Paper>
            <div style={{height:620, width:'100%'}}>
               <DataGrid
               rows={list as Product[]}
               columns={columns}
               loading={status === 'loading'}
               pagination
               paginationMode="server"
               paginationModel={{ page: page - 1, pageSize }}
               onPaginationModelChange={(model) => {
                   if (model.pageSize !== pageSize) setPageSize(model.pageSize);
                   if (model.page !== page - 1) setPage(model.page + 1);
               }}
               pageSizeOptions={[5, 10, 15]}
               getRowId={(r)=> r.id}
               rowCount={total}
               onRowClick={(params)=>navigate(`/product/${params.id}`)}
               /> 
            </div>
        </Box>
    )

};
export default ProductList;