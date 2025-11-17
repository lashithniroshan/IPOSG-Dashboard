import React from "react";
import type { Product } from "../features/products/productSlice";
import { Box, Button, Card, CardActions, CardContent, CardMedia, FormControlLabel, Paper, Rating, Switch, TextField, Typography } from "@mui/material";

interface ProductCardProps {
product:Product;
onChange?: (updated: Product)=> void;
onSave?: () => void;
editable?: boolean;
}

export default function ProductCard({product, onChange, onSave, editable = false,}:ProductCardProps){
    const handleChange =<K extends keyof Product>(field: K, value: Product[K])=>{
        if(onChange){
            onChange({...product, [field]: value});
        }
    };

    return (
        <Card sx={{ width:"100%"}}>
         
        <Paper sx={{ p: 4 }}>
      <Box display="flex" gap={4} flexDirection={{ xs: "column", md: "column" }}>
        <CardMedia
        component="img"
        height="260"
        image={product.image}
        alt={product.name}
        sx={{ width:300, borderRadius:2}}  
        />
<Box flex={1} textAlign={"left"}>
<CardContent sx={{ p: 0}}>
 <Typography variant="h4" sx={{mb: 1}}>{product.name}</Typography>
 <Typography variant="subtitle1" sx={{mb: 2}}>{product.description}</Typography>
  <Rating
        name="product-rating"
        value={product.rating ?? 0}
        onChange={(_, newValue) => 
         handleChange("rating", newValue ?? 0)
        }
        readOnly
     />
      <Typography variant="h6" sx={{mt: 2}}>Price: ${product.price}</Typography>
  <Box mt={2} display="flex" gap={2} alignItems="center">
 <TextField
              label="Stock"
              type="number"
              value={product.stock}
              onChange={(e) =>
                editable && 
                handleChange("stock", Number(e.target.value))
              }
              disabled={!editable}
            />
             <FormControlLabel
              control={
                <Switch
                  checked={product.active}
                  onChange={(e) =>
                    editable &&
                    handleChange("active", e.target.checked)
                  }
                  disabled={!editable}
                />
              }
              label="Active"
            />
  </Box>
</CardContent>
{editable && (
    <CardActions sx={{mt: 2}}>

<Button variant="contained" onClick={onSave}>Save Change</Button>
    </CardActions>
)}
</Box>
       
      </Box>
    </Paper>
        </Card>
    )
}