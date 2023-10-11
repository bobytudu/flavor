import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Typography,
  SelectChangeEvent,
} from "@mui/material";

interface AgeSelectProps {
  label: String;
  value: Number;
  onChange:
    | ((event: SelectChangeEvent<any>, child: React.ReactNode) => void)
    | undefined;
}

const ageArray = Array.from({ length: 53 }, (_, i) => i + 13);

const AgeSelect = ({ value, onChange, label }: AgeSelectProps) => {
  return (
    <FormControl fullWidth variant="outlined" size="small">
      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
        {label}
      </Typography>
      <Select
        labelId="age-label"
        id="age-select"
        value={value}
        onChange={onChange}
      >
        {ageArray.map((age, i) => (
          <MenuItem key={age} value={age}>
            {ageArray.length - 1 === i ? `${age}+` : age}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default AgeSelect;
