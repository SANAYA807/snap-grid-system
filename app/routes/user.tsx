import React from 'react';
import { LoaderFunction } from '@remix-run/node';
import UserView from '~/components/UserView';
import { mockData } from '~/mocks/backend';

export let loader: LoaderFunction = async () => {
  return mockData;
};

const User: React.FC = () => {

  return (
    <UserView />
  )
};

export default User;

