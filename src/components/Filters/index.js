import { Box, Input as Search, Radio, Select, Tag, Flex, Text, RadioGroup } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import filtersSlice from './filtersSlice';

export default function Filters() {

  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriorities, setFilterPriorities] = useState([]);
  const handleSearchTextChange = (e)=>{
    setSearchText(e.target.value);
    dispatch(filtersSlice.actions.searchFilterChange(e.target.value))
  }
  const handleStatusChange = (e)=>{
    setFilterStatus(e.target.value);
    dispatch(filtersSlice.actions.statusFilterChange(e.target.value))
  }
  const handlePriorityChange = (e)=>{
    setFilterPriorities(e);
    dispatch(filtersSlice.actions.prioritiesFilterChange(e))
  }
  return (
    <Flex justify='center'>
      <Box span={24}>
        <Text
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Search
        </Text>
        <Search placeholder='input search text'value={searchText} onChange={handleSearchTextChange} />
      </Box>
      <Box sm={24}>
        <Text
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Filter By Status
        </Text>
        <RadioGroup value={filterStatus} onChange={handleStatusChange}>
          <Radio value='All'>All</Radio>
          <Radio value='Completed'>Completed</Radio>
          <Radio value='Todo'>To do</Radio>
        </RadioGroup>
      </Box>
      <Box sm={24}>
        <Text
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Filter By Priority
        </Text>
        <Select
          placeholder='Please select'
          style={{ width: '100%' }}
          value={filterPriorities}
          onChange={handlePriorityChange}
        >
          <option value='High' label='High'>
            <Tag Boxor='red'>High</Tag>
          </option>
          <option value='Medium' label='Medium'>
            <Tag Boxor='blue'>Medium</Tag>
          </option>
          <option value='Low' label='Low'>
            <Tag Boxor='gray'>Low</Tag>
          </option>
        </Select>
      </Box>
    </Flex>
  );
}
