import {
  Badge,
  Box,
  Heading,
  IconButton,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { ColumnType } from '../utils/enums';
import { AddIcon } from '@chakra-ui/icons';
import { TaskModel } from '../utils/models';
import Task from './Task';
import useColumnTasks from '../hooks/useColumnTask';
import useColumnDrop from '../hooks/useColumnDrop';

const ColumnColorScheme: Record<ColumnType, string> = {
  Todo: 'gray',
  'In Progress': 'blue',
  Blocked: 'red',
  Completed: 'green',
};

// const mockTasks: TaskModel[] = [
//   {
//     id: '1',
//     title: 'Task 1',
//     column: ColumnType.TO_DO,
//     color: 'red.300',
//   },
//   {
//     id: '1',
//     title: 'Task 2',
//     column: ColumnType.IN_PROGRESS,
//     color: 'green.300',
//   },
//   {
//     id: '1',
//     title: 'Task 3',
//     column: ColumnType.COMPLETED,
//     color: 'blue.300',
//   },
// ];

function Column({ column }: { column: ColumnType }) {
  const {
    tasks,
    addEmptyTask,
    deleteTask,
    updateTask,
    dropTaskFrom,
    swapTasks,
  } = useColumnTasks(column);

  const { dropRef, isOver } = useColumnDrop(column, dropTaskFrom);

  const ColumnTask = tasks.map((task, index) => (
    <Task
      key={task.id}
      task={task}
      index={index}
      onDelete={deleteTask}
      onUpdate={updateTask}
      onDropHover={swapTasks}
    />
  ));

  return (
    <Box>
      <Heading fontSize="md" mb={4} letterSpacing="wide">
        <Badge
          px={2}
          py={1}
          rounded="lg"
          colorScheme={ColumnColorScheme[column]}
        >
          {column}
        </Badge>
      </Heading>
      <IconButton
        size="xs"
        w="full"
        color={useColorModeValue('gray.500', 'gray.400')}
        bgColor={useColorModeValue('gray.100', 'gray.700')}
        _hover={{ bgColor: useColorModeValue('gray.200', 'gray.600') }}
        py={2}
        variant="solid"
        colorScheme="black"
        aria-label="add-task"
        icon={<AddIcon />}
        onClick={addEmptyTask}
      />
      <Stack
        ref={dropRef}
        direction={{ base: 'row', md: 'column' }}
        h={{ base: 300, md: 600 }}
        p={4}
        mt={2}
        spacing={4}
        bgColor={useColorModeValue('gray.50', 'gray.900')}
        rounded="lg"
        boxShadow="md"
        overflow="auto"
        alignItems="start"
        opacity={isOver ? 0.85 : 1}
      >
        {ColumnTask}
      </Stack>
    </Box>
  );
}

export default Column;
