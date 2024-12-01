import { BoxMappings } from "~/interfaces";

export const mockData: BoxMappings = [
  { item: { id: 'progress-bar', label: 'Progress Bar', defaultColumns: 3 }, boxId: 3 },
  {
    item: {
      id: 'question-text',
      label: 'Question Text',
      defaultColumns: 3,
      data: 'What is the capital of france?',
    },
    boxId: 5,
  },
  {
    item: {
      id: 'option',
      label: 'Option',
      defaultColumns: 3,
      data: [
        { text: 'Berlin', isCorrect: false },
        { text: 'Madrid', isCorrect: false },
        { text: 'Paris', isCorrect: true },
        { text: 'Rome', isCorrect: false },
      ],
    },
    boxId: 7,
  },
  { item: { id: 'button', label: 'Button', defaultColumns: 3, data: 'Submit' }, boxId: 8 },
  { item: { id: 'pagination', label: 'Pagination', defaultColumns: 3, data: '1/10' }, boxId: 17 },
  { item: { id: 'timer', label: 'Timer', defaultColumns: 1, data: 1 }, boxId: 2 },
  { item: { id: 'arrows', label: 'Arrows', defaultColumns: 1, data: 1 }, boxId: 1 },
  { item: { id: 'image', label: 'Image', defaultColumns: 3, data:'https://tse1.mm.bing.net/th?id=OIP.GPFEY6kfgxbsja6gmrW6rwHaE7&pid=Api' }, boxId: 4 },
];