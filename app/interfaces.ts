export interface DragItem {
    id: string
    type: string
    left: number
    top: number
    label:string
  }
  // Represents an individual option for items like "Option"
export interface Option {
  text: string; // The text of the option
  isCorrect: boolean; // Indicates if this option is the correct one
}

// Represents a generic item that can be placed in a box
export interface Item {
  id: string; // Unique identifier for the item
  label: string; // Display label of the item
  defaultColumns: number; // Number of columns the item spans
  data?: string | number | Option[]; // Optional data associated with the item
}

// Represents a mapping of an item to a box
export interface BoxMapping {
  item: Item; // The item contained in the box
  boxId: number; // Identifier for the box
}
export type BoxMappings = BoxMapping[];

