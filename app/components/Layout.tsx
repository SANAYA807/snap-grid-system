import { useEffect, useState } from "react";
import { DroppableBox } from "./DroppableBox";
import { useFetcher } from "@remix-run/react";
import Modal from "./Modal";
import { droppableConfig } from "~/gridConfig";
import { Item } from "~/interfaces";

interface DroppedItem {
  item: Item;
  boxId: number;
}

interface FetcherResponse {
  message: string;
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


  return (
    <div className="w-full sm:my-auto flex flex-col items-center mx-auto mt-10 m-2">
      <div className="grid bg-white grid-cols-5 p-3 gap-1 grid-rows-15 h-[90vh] overflow-hidden w-96 m-2 sm:rounded-lg">
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
          onClick={handleSave}
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
