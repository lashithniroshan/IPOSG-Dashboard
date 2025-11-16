import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchProductById, updateProduct } from "./productSlice";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  Rating,
} from "@mui/material";
import type { Product } from "./productSlice";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { selectedProduct, status } = useAppSelector((s) => s.products);
  const [local, setLocal] = useState<Product | null>(null);

  useEffect(() => {
    if (id) dispatch(fetchProductById(Number(id)));
  }, [id, dispatch]);

  if (selectedProduct && (!local || local.id !== selectedProduct.id)) {
    setLocal(selectedProduct);
  }

  if (status === "loading" || !local) {
    return (
      <Box p={4} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  const handleSave = async () => {
    await dispatch(updateProduct({ id: local.id, changes: local })).unwrap();
    alert("saved!");
  };

  return (
    <Box sx={{
        padding:"1rem 10rem"
    }}> 
        <Paper sx={{ p: 4 }}>
      <Box display="flex" gap={4} flexDirection={{ xs: "column", md: "row" }}>
        <img src={local.image} alt={local.name} width={300} />
        <Box flex={1} textAlign={'left'}>
          <Typography variant="h4">{local.name}</Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            {local.description}
          </Typography>
            <Rating
        name="product-rating"
        value={local.rating ?? 0}
        onChange={(_, newValue) => {
          setLocal({
            ...local,
            rating: newValue ?? 0,
          });
        }}
        readOnly
      />
          <Typography variant="h6">Price: ${local.price}</Typography>
          <Box mt={2} display="flex" gap={2} alignItems="center">
            <TextField
              label="Stock"
              type="number"
              value={local.stock}
              onChange={(e) =>
                setLocal({ ...local, stock: Number(e.target.value) })
              }
            />
            <FormControlLabel
              control={
                <Switch
                  checked={local.active}
                  onChange={(e) =>
                    setLocal({ ...local, active: e.target.checked })
                  }
                />
              }
              label="Active"
            />
          </Box>
          <Box mt={3}>
            <Button variant="contained" onClick={handleSave}>
              Save Changes
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
    </Box>
   
  );
};
export default ProductDetails;
