import React, { useState } from 'react'
import { CssBaseline, AppBar, IconButton, Toolbar, Typography,Drawer,List ,ListItemButton,ListItemText, Box } from '@mui/material'
import { Routes, Route, Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import './App.css'
import ProductList from './features/products/ProductList'
import ProductDetails from './features/products/ProductDetails'

function App() {
const [open, setOpen] = useState(true);

  return (
     <Box sx={{ flexGrow: 1 }}>
    <CssBaseline />
    <AppBar position='sticky'>
      <Toolbar>
        <IconButton color='inherit' edge='start' onClick={()=> setOpen((v)=>!v)} sx={{ mr:2}}>
<MenuIcon />
        </IconButton>
        <Typography>Dashboard</Typography>
      </Toolbar>
    </AppBar>
    <Box display="flex" height="calc(100vh - 64px)">
<Drawer variant='persistent' open={open}>
<List sx={{ width: 220}}>
  <ListItemButton component={Link} to="/" className='listitem'>
<ListItemText primary="Products" />
  </ListItemButton>
</List>
</Drawer>

<Box component="main" flexGrow={1} p={3} marginLeft={open ? "240px" : "0"} sx={{transition: "margin 0.2s"}}>
<Routes>
  <Route path="/" element={<ProductList />} />
  <Route path="/product/:id" element={<ProductDetails />} />
</Routes>
</Box>
    </Box>
    </Box>
  )
}

export default App
