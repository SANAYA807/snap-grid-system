import React from 'react';
import { DndProvider } from 'react-dnd';
import { MultiBackend } from 'react-dnd-multi-backend';
import NavigationDrawer from './NavigationDrawer';
import FlexContainer from './Layout';
import CustomPreview from './CustomPreview';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';

export const AdminView = () => {
  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <div style={{ display: 'flex' }}>
        <NavigationDrawer />
        <FlexContainer />
        <CustomPreview />
      </div>
    </DndProvider>
  );
};
