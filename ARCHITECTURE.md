# Architecture

## Overview
This application demonstrates a mid-scale React app for product inventory and order management.
Key goals: clear folder structure, separation of concerns, Redux for app state, MUI for consistent UI.

## State Management
- Redux Toolkit slices:
  - `products` slice: handles product list & updates (createAsyncThunk for fetch/update)
  - `orders` slice: handles orders fetch
- Why Redux Toolkit: predictable state, built-in immutability helpers, easy to test and observe.

## API Integration
- `axiosInstance` centralizes base URL and common config.
- `json-server` used as a mock backend for quick demonstration (`mock/db.json`).
- Thunks (`createAsyncThunk`) used for async API calls, allowing lifecycle handling for loading/errors.

## Component Architecture
- Feature-based structure:
  - `src/features/products/*` handles product pages and business logic.
  - `src/features/orders/*` handles orders.
- `src/components` contains reusable UI components (FilterPanel, ProductCard, OrderStatusBadge, ConfirmationDialog).

## UI / UX
- Material UI (MUI) for consistent design, AppBar + Drawer layout, MUI DataGrid for tables.
- Filters include search, category select, and price slider.
- Product Details demonstrates form handling + PATCH API integration.

## Extensibility
- Add `uiSlice` to centralize snackbar/toast notifications.
- Replace json-server with a real API by changing `VITE_API_BASE`.
- Add authentication middleware if needed.
