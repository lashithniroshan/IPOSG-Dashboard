import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ProductList from "./features/products/ProductList";
import ProductDetails from "./features/products/ProductDetails";
import OrderList from "./features/orders/OrderList";
import { darkTheme, lightTheme } from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";

const drawerWidth = 240;

export default function App(props: { window?: () => Window }) {
  const { window } = props;

  const [mode, setMode] = useState<"light" | "dark">("light");
  const theme = mode === "light" ? lightTheme : darkTheme

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  /** Sidebar Items */
  const drawer = (
    <div>

      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemIcon><DashboardIcon/></ListItemIcon>
            <ListItemText primary="Products" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/orders">
            <ListItemIcon><ListAltIcon/></ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />
    </div>
  );

  /** Required for mobile drawer container */
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
<ThemeProvider theme={theme}>
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* APP BAR */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          {/* Mobile Menu Toggle */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div">
            IPOSG Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

          <IconButton onClick={()=> setMode(mode === "light" ? "dark" : "light")}>{mode === "light" ? <LightModeIcon />: <DarkModeIcon />}</IconButton>
        </Toolbar>
      </AppBar>

      {/* DRAWER */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* MOBILE DRAWER */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerClose}
          onTransitionEnd={handleDrawerTransitionEnd}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          slotProps={{
            root: {
              keepMounted: true,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* DESKTOP DRAWER */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* MAIN CONTENT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        {/* ROUTES */}
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/orders" element={<OrderList />} />
        </Routes>
      </Box>
    </Box>
</ThemeProvider>
  );
}
