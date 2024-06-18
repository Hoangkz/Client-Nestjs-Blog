import { Box, Flex, Input, Button, Select, Tag, InputGroup } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Todo from '../Todo';
import todoListSlice from './todosSlice' ;
import { v4 as uuidv4 } from 'uuid';
import { todosRemainingSelector } from '../../redux/selectors';
export default function TodoList() {

  const [todoName, setTodoName] = useState("");
  const [priority, setPriority] = useState("Medium");
  const todoList = useSelector(todosRemainingSelector);

  const handleInputChange = (e)=>{
    setTodoName(e.target.value)
  }
  const handleInputPriorityChange = (e)=>{
    setPriority(e)
  }
  const dispatch = useDispatch();

  const handleAddButtonClick = ()=>{
    dispatch(todoListSlice.actions.addTodo({
      id:uuidv4(),
      name:todoName,
      priority:priority,
      completed:false
    }))
    setTodoName("");
    setPriority("Medium");
  }
  return (
    <Flex style={{ height: 'calc(100% - 40px)' }}>
      <Box span={24} style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
        {/* <Todo name='Learn React' prioriry='High' />
        <Todo name='Learn Redux' prioriry='Medium' />
        <Todo name='Learn JavaScript' prioriry='Low' /> */}
        {todoList.map((todo)=><Todo key={todo.id} id={todo.id} name={todo.name} prioriry={todo.priority} completed={todo.completed} />
        )}
      </Box>
      <Box span={24}>
        <InputGroup style={{ display: 'flex' }} compact>
          <Input value={todoName} onChange={handleInputChange} />
          <Select defaultValue="Medium" value={priority} onChange={handleInputPriorityChange}>
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
          <Button onClick={handleAddButtonClick} type='primary'>
            Add
          </Button>
        </InputGroup>
      </Box>
    </Flex>
  );
}
