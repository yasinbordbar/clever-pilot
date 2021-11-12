import Head from "next/head";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Home() {
  const [items, setItems] = useState([
    { id: 1, color: "white" },
    { id: 2, color: "black" },
    { id: 3, color: "white" },
    { id: 4, color: "black" },
  ]);

  const [lighters, setLighters] = useState([]);
  const [darkers, setDarkers] = useState([]);

  const handleDragAndDrop = (result) => {
    const { source, destination } = result;
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
    // dropped outside the list
    // if (!destination) {
    //   return;
    // }
    // const sInd = +source.droppableId;
    // const dInd = +destination.droppableId;

    // if (sInd === dInd) {
    //   const items = reorder(state[sInd], source.index, destination.index);
    //   const newState = [...state];
    //   newState[sInd] = items;
    //   setState(newState);
    // } else {
    //   const result = move(state[sInd], state[dInd], source, destination);
    //   const newState = [...state];
    //   newState[sInd] = result[sInd];
    //   newState[dInd] = result[dInd];

    //   setState(newState.filter((group) => group.length));
    // }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-blue-100	">
      <Head>
        <title>Clever Pilot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="font-bold text-3xl">Clever Pilot</h1>

      <DragDropContext onDragEnd={handleDragAndDrop}>
        <div className="flex flex-row m-24">
          <div className="mx-32">
            <p className="text-center pb-3 font-bold">Lighter</p>
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
                          <div className="flex flex-row">
                            {" "}
                            <div
                              style={{ background: item_light.color }}
                              className="border-gray-100 border-4 rounded-full h-16 w-16 my-2 mx-8"
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
            <p className="text-center pb-3 font-bold">Darker</p>
            <div className="border-4 border-dashed h-56 w-56">
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
                          <li
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            key={item_dark.id}
                            className={
                              snapshot.isDragging ? "selected" : "not-selected"
                            }
                          >
                            <div className="flex flex-row">
                              {" "}
                              <div
                                style={{ background: item_dark.color }}
                                className="border-gray-100 border-4 rounded-full h-16 w-16 my-2 mx-8"
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
          </div>
        </div>

        <div className="flex flex-row">
          <Droppable droppableId="items">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {items.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <li
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        key={item.id}
                        className={
                          snapshot.isDragging ? "selected" : "not-selected"
                        }
                      >
                        <div
                          style={{ background: item.color }}
                          className="border-gray-100 border-4 rounded-full h-24 w-24 my-2 mx-8"
                        ></div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
      </DragDropContext>

      <button className="bg-gray-100 p-4 rounded-md mt-8 text-black-300">
        Submit
      </button>
    </div>
  );
}
