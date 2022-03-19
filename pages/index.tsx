import Head from "next/head"
import React, {useState} from "react"
import {DropResult} from "react-beautiful-dnd"
import toast, {Toaster} from "react-hot-toast"
import Button from "../components/mini-components/Button"
import {IItem, IItemStyle} from "../vendors/game.vendors"
import Title from "../components/mini-components/Title"
import GameBoard from "../components/GameBoard"


function Home() {
  let initialValue = [
    {id: 1, color: "#4d4c4c"},
    {id: 2, color: "black"},
    {id: 3, color: "#4d4c4c"},
    {id: 4, color: "black"},
  ];

  const [items, setItems] = useState<IItem[]>(initialValue);

  const [lighterList, setLighterList] = useState<IItem[]>([]);
  const [darkerList, setDarkerList] = useState<IItem[]>([]);

  const handleDragAndDrop = (result: DropResult) => {
    const {source, destination} = result;
    if (
        !destination ||
        source.droppableId === destination?.droppableId ||
        destination?.droppableId === "items"
    )
      return;
    let reorderedItem;

    if (source.droppableId === "darkerList") {
      const _darkerList = [...darkerList];
      setDarkerList(_darkerList);
      [reorderedItem] = _darkerList.splice(result.source.index, 1);
    } else if (source.droppableId === "lighterList") {
      const _lighterList = [...lighterList];
      setLighterList(_lighterList);
      [reorderedItem] = _lighterList.splice(result.source.index, 1);
    } else {
      const _items = [...items];
      setItems(_items);
      [reorderedItem] = _items.splice(result.source.index, 1);
    }

    if (destination?.droppableId === "lighterList") {
      setLighterList([...lighterList, reorderedItem]);
    } else if (destination?.droppableId === "darkerList") {
      setDarkerList([...darkerList, reorderedItem]);
    }
  };

  const submitButton = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (items.length > 0) {
      toast.error("the game is not finished yet!");
    } else {
      let dark_in_lighterList = lighterList.some((item) => item.color === "black");
      let light_in_darkerList = darkerList.some((item) => item.color === "#4d4c4c");
      if (!light_in_darkerList && !dark_in_lighterList) {
        toast.success("you won");
      } else {
        toast.error("you lost");
      }
    }
  };

  const resetButton = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    setItems(initialValue);
    setLighterList([]);
    setDarkerList([]);
  };

  const grid = 1;

  const getItemStyle = ({draggableStyle}: IItemStyle) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 ${grid}px 0 0`,
    ...draggableStyle,
  });
  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "lightgray" : "transparent",
    display: "flex",
    padding: grid,
    overflow: "auto",
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 font-mono">
      <Head>
        <title>Clever Pilot</title>
        <link rel="icon" href="../public/favicon.ico" />
        <meta name="viewport" content="width=1024"/>
      </Head>

      <Title text="Clever Pilot"/>
      <GameBoard handleDragAndDrop={handleDragAndDrop} lighterList={lighterList}
                 darkerList={darkerList}
                 items={items}
                 getItemStyle={getItemStyle}
                 getListStyle={getListStyle}
      />
      <div className="flex flex-row">
        <Button text="Submit" handler={submitButton}/>
        <Button text="Try again" handler={resetButton}/>
      </div>

      <Toaster />
    </div>
  );
}

export default Home;