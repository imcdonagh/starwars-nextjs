import { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';

export interface SearchBarProps {
  value?: string
  minlength?: number
  onChange?: (value: string) => void
}

export default function SearchBar(props: SearchBarProps) {

  const [searchTimeout,setSearchTimeout] = useState(0)
  const value = useRef(props.value || '')

  const onSearchInput = (e: any) => {
    const v = e.target?.value.toLowerCase() || ''
    value.current = v
    if (searchTimeout)
      window.clearTimeout(searchTimeout)
    if (value.current) {
      const timeout = window.setTimeout(updateSearch, 400)
      setSearchTimeout(timeout)
    } else {
      updateSearch()
    }
  }

  const updateSearch = () => {
    setSearchTimeout(0)
    if (props.onChange) props.onChange(value.current)
  }

  return (
    <TextField 
      id="search" 
      label="Search"
      variant="outlined"
      type="search"
      autoComplete="off"
      value={value.current}
      onChange={onSearchInput}
    ></TextField>
  )
}