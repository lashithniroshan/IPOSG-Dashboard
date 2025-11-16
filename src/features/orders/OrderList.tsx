import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchOrders } from "./orderSlice";
import type {  GridColDef } from "@mui/x-data-grid";
import { Box, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import OrderStatusBadge from "../../components/OrderStatusBadge";

interface Order {
    id:number;
    customer: string;
    date: string;
    quantity:number;
    status:string;
    total: number;
}

const OrderList: React.FC = () =>{
    const dispatch = useAppDispatch();
    const { list, status } = useAppSelector((s) => s.orders);

    useEffect(()=>{
dispatch(fetchOrders());
    },[dispatch]);

    const columns: GridColDef<Order>[] = [
           {field:"id", headerName:"Order ID", width:110 },
           {field:"customer", headerName:"Customer", width:180 },
             {field:"quantity", headerName:"Quantity", width:80 },
               {field:"status", headerName:"Status", width:140,renderCell:(params)=> <OrderStatusBadge status={params.value as string} /> },
           {field:"date", headerName:"Date", width:130 },
           {field:"total", headerName:"Total", width:130, type:"number",}  
       ];
   

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Orders
            </Typography>
            <Paper sx={{p:2}}>
               <div style={{height:560, width:"100%"}}>
                <DataGrid<Order>
                rows={list}
                columns={columns}
                loading={status === 'loading'} 
                getRowId={(r) => r.id}
                />
                </div> 
            </Paper>
        </Box>
    )
}
export default OrderList;