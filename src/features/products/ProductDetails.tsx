import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchProductById, updateProduct } from "./productSlice";
import { Box, CircularProgress } from "@mui/material";
import type { Product } from "./productSlice";
import ProductCard from "../../components/ProductCard";
import ConfirmationDialog from "../../components/ConfirmationDialog";


const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { selectedProduct, status } = useAppSelector((s) => s.products);
  const [local, setLocal] = useState<Product | null>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);

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

  const handleSaveClick = () => {
    setConfirmOpen(true);
  }
const handleConfirmSave = async () => {
  setConfirmOpen(false);
  await dispatch(updateProduct({ id: local.id, changes: local })).unwrap();
}


  return (
    <Box sx={{
        padding:"1rem"
    }}> 
    <ProductCard
    product={local}
    editable
    onChange={(updated) => setLocal(updated)}
    onSave={handleSaveClick}
     />
     <ConfirmationDialog
     open={confirmOpen}
     onClose={()=> setConfirmOpen(false)}
     onConfirm={handleConfirmSave}
     title="Save Product"
     children="Are you sure you want to save thse changes?"
     />
     
    </Box>
   
  );
};
export default ProductDetails;
