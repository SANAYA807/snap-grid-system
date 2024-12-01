import NavigationDrawer from './NavigationDrawer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';;
import FlexContainer from './Layout';

export const AdminView = () => {
  
  
    return (
      <DndProvider backend={HTML5Backend}>
        <div style={{ display: "flex" }}>
        <NavigationDrawer />
        <FlexContainer/>
        </div>        
      </DndProvider>
    );
  };
  
