import Head from "next/head";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  var initialValue = [
    { id: 1, color: "#4d4c4c" },
    { id: 2, color: "black" },
    { id: 3, color: "#4d4c4c" },
    { id: 4, color: "black" },
  ];
  const [items, setItems] = useState(initialValue);

  const [lighters, setLighters] = useState([]);
  const [darkers, setDarkers] = useState([]);

  const handleDragAndDrop = (result) => {
    const { source, destination } = result;
    if (
      !destination ||
      source.droppableId === destination?.droppableId ||
      destination?.droppableId === "items"
    )
      return;
    const reorderedItem = [];

    if (source.droppableId === "darkers") {
      const _darkers = [...darkers];
      setDarkers(_darkers);
      [reorderedItem] = _darkers.splice(result.source.index, 1);
    } else if (source.droppableId === "lighters") {
      const _lighters = [...lighters];
      setLighters(_lighters);
      [reorderedItem] = _lighters.splice(result.source.index, 1);
    } else {
      const _items = [...items];
      setItems(_items);
      [reorderedItem] = _items.splice(result.source.index, 1);
    }

    if (destination?.droppableId === "lighters") {
      setLighters([...lighters, reorderedItem]);
    } else if (destination?.droppableId === "darkers") {
      setDarkers([...darkers, reorderedItem]);
    }
  };

  const submitButton = (e) => {
    e.preventDefault();
    if (items.length > 0) {
      toast.error("the game is not finished yet!");
    } else {
      var dark_in_lighters = lighters.some((item) => item.color === "black");
      var light_in_darkers = darkers.some((item) => item.color === "#4d4c4c");
      if (!light_in_darkers && !dark_in_lighters) {
        toast.success("you won");
      } else {
        toast.error("you lost");
      }
    }
  };

  const resetButton = (e) => {
    e.preventDefault();
    setItems(initialValue);
    setLighters([]);
    setDarkers([]);
  };

  const grid = 1;

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 ${grid}px 0 0`,

    // change background colour if dragging
    // background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
  });
  const getListStyle = (isDraggingOver) => ({
    // background: isDraggingOver ? "lightblue" : "lightgrey",
    display: "flex",
    padding: grid,
    overflow: "auto",
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 	bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 font-mono">
      <Head>
        <title>Clever Pilot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="font-bold text-4xl">Clever Pilot</h1>

      <DragDropContext onDragEnd={handleDragAndDrop}>
        <div className="flex flex-row m-24">
          <div className="mx-32">
            <p className="text-center pb-3 font-bold text-xl">Lighter</p>
            <Droppable droppableId="lighters">
              {(provided, snapshot) => (
                <ul
                  ref={provided.innerRef}
                  className="border-4 border-dashed h-56 w-56"
                  style={{
                    backgroundColor: snapshot.isDraggingOver
                      ? "#d9d9d9"
                      : "white",
                  }}
                  {...provided.droppableProps}
                >
                  {lighters?.map((item_light, index) => (
                    <Draggable
                      key={item_light.id}
                      draggableId={item_light.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <li
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          key={item_light.id}
                          className={
                            snapshot.isDragging ? "selected" : "not-selected"
                          }
                        >
                          <div className="flex flex-row items-center justify-center mt-2">
                            {" "}
                            <div
                              style={{ background: item_light.color }}
                              className="border-gray-100 border-4 rounded-full h-20 w-20 my-2 mx-8"
                            ></div>{" "}
                          </div>
                        </li>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
          <div className="mx-32">
            <p className="text-center pb-3 font-bold text-xl">Darker</p>
            <Droppable droppableId="darkers">
              {(provided, snapshot) => (
                <ul
                  ref={provided.innerRef}
                  className="border-4 border-dashed h-56 w-56"
                  style={{
                    backgroundColor: snapshot.isDraggingOver
                      ? "#d9d9d9"
                      : "white",
                  }}
                  {...provided.droppableProps}
                >
                  {darkers?.map((item_dark, index) => (
                    <Draggable
                      key={item_dark.id}
                      draggableId={item_dark.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          key={item_dark.id}
                          className={
                            snapshot.isDragging ? "selected" : "not-selected"
                          }
                        >
                          <div className="flex flex-row items-center justify-center mt-2">
                            {" "}
                            <div
                              style={{ background: item_dark.color }}
                              className="border-gray-100 border-4 rounded-full h-20 w-20 my-2 mx-8"
                            ></div>{" "}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
        </div>

        <div className="flex flex-row">
          <Droppable droppableId="items" direction="horizontal">
            {(provided, snapshot) => (
              <div
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {items.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        key={item.id}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                        className={
                          snapshot.isDragging ? "selected" : "not-selected"
                        }
                      >
                        <div
                          style={{ background: item.color }}
                          className="border-gray-100 border-4 rounded-full h-24 w-24 my-2 mx-8"
                        ></div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>

      <div className="flex flex-row">
        <button
          onClick={submitButton}
          className="bg-gray-100 p-4 rounded-md mt-8 text-black-300 m-5 text-xl"
        >
          Submit
        </button>
        <button
          onClick={resetButton}
          className="bg-gray-100 p-4 rounded-md mt-8 text-black-300 m-5 text-xl"
        >
          Reset
        </button>
      </div>

      <Toaster />
    </div>
  );
}
