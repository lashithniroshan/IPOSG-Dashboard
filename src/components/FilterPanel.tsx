import React, { useState } from "react";
import {Box, Stack, TextField, Slider, Button, MenuItem, Typography} from "@mui/material"

const categories = ["All", "Gadgets", "Toys", "Supplies"];

type Props = {
    onSearch:(q: string) => void;
    onCategory:(c: string | undefined) => void;
    onPriceRange:(r?: [number, number]) => void;
}

const FilterPanel: React.FC<Props> = ({onSearch, onCategory, onPriceRange})=>{
const [q, setQ] = useState("");
const [cat, setCat] = useState("All");
const [range, setRange] = useState<number[]>([0, 200]);

return (
    <Stack direction="row" spacing={2} alignItems="center">
<TextField label="Search" value={q} onChange={(e)=> setQ(e.target.value)} onKeyDown={(e)=>e.key === "Enter" && onSearch(q)} />
<TextField select style={{"width":"100px"}} label="Category" value={cat} onChange={(e)=> { setCat(e.target.value); onCategory(e.target.value === "All" ? undefined : e.target.value);}}>
{categories.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
</TextField>
<Box width={250}>
     <Typography id="input-slider" gutterBottom>
        Price Range
      </Typography>
<Slider
getAriaLabel={()=> "Price range"}
value={range}
onChange={(_, v)=>setRange(v as number[])}
onChangeCommitted={(_, v)=> onPriceRange(v as [number, number])}
valueLabelDisplay="auto"
min={0}
max={1000}
/>
</Box>
<Button onClick={()=> onSearch(q)} variant="outlined">Search</Button>
<Button onClick={()=> {setQ("");setCat("All");setRange([0, 1000]); onSearch("")}} variant="outlined">Reset</Button>
    </Stack>
)
}

export default FilterPanel;