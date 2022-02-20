import React from 'react'
import {Select, MenuItem} from '@mui/material'

const SelectField = ({selectProps, menuProps}) => {
    return (
        <Select
        id="demo-mutiple-name-label"
        {...selectProps}
      >
          {menuProps.menuItem.map((item) => {
              return (<MenuItem value={item.value} key={item.value}>{item.label}</MenuItem>)
          })}
      </Select>
    )
}

export default SelectField