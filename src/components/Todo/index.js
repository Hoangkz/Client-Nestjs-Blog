import { Flex, Tag, Checkbox } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import todoListSlice from '../TodoList/todosSlice';
const priorityColorMapping = {
  High: 'red',
  Medium: 'blue',
  Low: 'gray',
};

export default function Todo({ name, prioriry, completed, id }) {
  const [checked, setChecked] = useState(completed);
  const dispatch = useDispatch()
  const toggleCheckbox = () => {
    setChecked(!checked);
    dispatch(todoListSlice.actions.toggleTodoStatus(id))
  };

  return (
    <Flex
      justify='space-between'
      style={{
        marginBottom: 3,
        ...(checked ? { opacity: 0.5, textDecoration: 'line-through' } : {}),
      }}
    >
      <Checkbox checked={checked} onChange={toggleCheckbox}>
        {name}
      </Checkbox>
      <Tag color={priorityColorMapping[prioriry]} style={{ margin: 0 }}>
        {prioriry}
      </Tag>
    </Flex>
  );
}