import React from 'react';
import { LoaderFunction } from '@remix-run/node';
import {  BoxMappings } from '~/interfaces';
import UserView from '~/components/UserView';

export let loader: LoaderFunction = async () => {
  
  const mockData: BoxMappings = [
    { item: { id: 'progress-bar', label: 'Progress Bar', defaultColumns: 3 }, boxId: 3 },
    {
      item: {
        id: 'question-text',
        label: 'Question Text',
        defaultColumns: 3,
        data: 'What is your name?',
      },
      boxId: 5,
    },
    {
      item: {
        id: 'option',
        label: 'Option',
        defaultColumns: 3,
        data: [
          { text: 'nskd', isCorrect: false },
          { text: 'nsd', isCorrect: true },
          { text: 'nskd', isCorrect: false },
          { text: 'nsd', isCorrect: false },
        ],
      },
      boxId: 7,
    },
    { item: { id: 'button', label: 'Button', defaultColumns: 3, data: 'Submit' }, boxId: 8 },
    { item: { id: 'timer', label: 'Timer', defaultColumns: 1, data: 1 }, boxId: 1 },
    { item: { id: 'image', label: 'Image', defaultColumns: 3, data:'https://tse1.mm.bing.net/th?id=OIP.GPFEY6kfgxbsja6gmrW6rwHaE7&pid=Api' }, boxId: 4 },
  ];
  

  return mockData;
};


const User: React.FC = () => {
  const [clientOnly, setClientOnly] = React.useState(false);
  
  React.useEffect(() => {
    setClientOnly(true);
  }, []);
  
  if (!clientOnly) return null;
return(
  <UserView/>
)
};

export default User;

