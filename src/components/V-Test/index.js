import { Text, Divider } from '@chakra-ui/react';
import TodoList from '../TodoList';
import Filters from '../Filters';


function App() {
  return (
    <div
      style={{
        width: 500,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 20,
        boxShadow: '0 0 10px 4px #bfbfbf',
        borderRadius: 5,
        height: '90vh',
      }}
    >
      <Text style={{ textAlign: 'center' }}>TODO APP with REDUX</Text>
      <Filters />
      <Divider />
      <TodoList />
    </div>
  );
}

export default App;
