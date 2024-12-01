// Mock Backend for Grid Configuration
import { GridComponent } from "~/types";
  
  let mockGridConfig: GridComponent[] = [
    {
      id: "1",
      type: "progress-bar",
      position: { x: 0, y: 0 },
    },
    {
      id: "2",
      type: "question-text",
      position: { x: 1, y: 1 },
    },
  ];
  
  // Fetch Grid Configuration (Admin or User View)
  export const fetchGridConfig = async (): Promise<GridComponent[]> => {
    // Simulate a delay to mimic real-world backend latency
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockGridConfig;
  };
  
  // Save Updated Grid Configuration (Admin View)
  export const saveGridConfig = async (newConfig: GridComponent[]): Promise<void> => {
    // Simulate a delay to mimic real-world backend latency
    await new Promise((resolve) => setTimeout(resolve, 500));
    mockGridConfig = newConfig;
  };
  