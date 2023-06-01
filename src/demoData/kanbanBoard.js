const kanbanData = {
    tasks: {
      task1: {
        id: 'task1',
        title: 'File Manager Design'
      },
      task2: {
        id: 'task2',
        title: 'CRM Dashboard',
       
      },
      task3: {
        id: 'task3',
        title: 'Knowledgebase',
      
      },
      task4: {
        id: 'task4',
        title: 'Job Search',
       
      },
      task5: {
        id: 'task5',
        title: 'Drag & Drop',
       
      },
      task6: {
        id: 'task6',
        title: 'Sales Dashboard ',
       
      },
      task7: {
        id: 'task7',
        title: 'Timeline Page',
      
      },
      task8: {
        id: 'task8',
        title: 'Import & Export',

      },
      task9: {
        id: 'task9',
        title: 'Coming Soon Page',
      },
      task10: {
        id: 'task10',
        title: 'Changelog'
      },
      task11: {
        id: 'task11',
        title: 'Learning Dashboard',
      },
    },
    
    boardData: {
      board1: {
        id: 'board1',
        title: 'To do',
        taskIds: ['task1', 'task2', 'task3'],
      },
      board2: {
        id: 'board2',
        title: 'In progress',
        taskIds: ['task4', 'task5'],
      },
      board3: {
        id: 'board3',
        title: 'Review',
        taskIds: ['task6', 'task7', 'task8'],
      },
      board4: {
        id: 'board4',
        title: 'Done',
        taskIds: ['task9', 'task10'],
      },
    },
    boardOrder: ['board1', 'board2', 'board3', 'board4'],
  };
  export default kanbanData;



 /*  task10: {
    id: 'task10',
    title: 'Changelog',
    checklist: [
      {
        id: 'cl-1',
        label: 'Research',
        checkListTask: [
          {
            id: '1',
            label: 'Design Idea',
            checked: true,
          },
          {
            id: '2',
            label: 'Wireframe for design',
            checked: false,
          },
          {
            id: '3',
            label: 'Make prototypes',
            checked: true,
          },
          {
            id: '4',
            label: 'Add images to the product gallery',
            checked: true,
          },
        ],
      },
      {
        id: 'cl-2',
        label: 'Design',
        checkListTask: [
          {
            id: '1',
            label: 'Design Idea',
            checked: true,
          },
          {
            id: '2',
            label: 'Wireframe for design',
            checked: true,
          },
          {
            id: '3',
            label: 'Make prototypes',
            checked: true,
          },
          {
            id: '4',
            label: 'Add images to the product gallery',
            checked: true,
          },
        ],
      },
    ],
  }, */