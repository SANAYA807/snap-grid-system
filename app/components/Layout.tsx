import { useEffect, useState } from "react";
import { DroppableBox } from "./DroppableBox";
import { useFetcher } from "@remix-run/react";
import Modal from "./Modal";
import { droppableConfig } from "~/components/gridConfig";

interface DroppedItem {
  item: any;
  boxId: number;
}

interface FetcherResponse {
  message: string;
  // add any other properties that your API might return
}

function FlexContainer() {
  const [data, setData] = useState<DroppedItem[]>([]);
  const [resetKey, setResetKey] = useState(0);
  const fetcher = useFetcher<FetcherResponse>(); // Specify the type for fetcher
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const reset = () => {
    setData([]);
    setResetKey((prevKey) => prevKey + 1);
  };

  const onDrop = (item: any, boxId: number) => {
    setData((prev) => {
      const updatedData = prev.filter((droppedItem) => droppedItem.boxId !== boxId);
      return [...updatedData, { item, boxId }];
    });
  };

  const handleSave = () => {
    // Send the current state to the backend when the save button is clicked
    const formData = new FormData();
    formData.append("data", JSON.stringify(data)); // Add the data as a string

    fetcher.submit(formData, { method: "post" });
  };

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      setMessage(fetcher.data?.message || ""); // Access message safely
      setIsModalOpen(true); // Show the modal with success message
    }
  }, [fetcher.state, fetcher.data]);

  console.log(droppableConfig);
  
  return (
    <div className="w-full my-auto flex flex-col items-center mx-auto m-2">
      <div className="grid bg-white grid-cols-5 p-3 gap-1 grid-rows-15 h-[90vh] overflow-hidden w-96 m-2 rounded-lg">
        {droppableConfig.map(({ id, rowStart, colStart, colSpan }) => (
          <div
            key={id}
            className={`col-start-${colStart} row-start-${rowStart} col-span-${colSpan}`}
          >
            <DroppableBox
              key={`${id}-${resetKey}`}
              onDrop={onDrop}
              id={id}
              reset={reset}
              colSpan={colSpan}
            />
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-4">
        <button
          className="bg-green-500 px-6 py-2 rounded-md"
          onClick={handleSave} // Trigger save when clicked
        >
          Save Quiz
        </button>
        <button className="bg-red-500 px-6 py-2 rounded-md" onClick={reset}>
          Reset All
        </button>
      </div>

      {/* Modal for showing the success message */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>{message}</p>
      </Modal>
    </div>
  );
}

export default FlexContainer;
