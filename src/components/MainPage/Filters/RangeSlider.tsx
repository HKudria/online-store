import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value: number) {
  return `${value}`;
}

export function RangeSlider(min: number, max: number, onChange: (number: number[])=>void, initMax: number) {
  const [value, setValue] = useState<number[]>([min, max]);

    useEffect(() => {
        setValue([min, max] as number[]);
    },[max]);


  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    onChange(newValue as number[])
  };

  return (
    <Box sx={{ width: 250 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={0}
        max={initMax}
      />
    </Box>
  );
}