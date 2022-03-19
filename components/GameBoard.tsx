import React from 'react'
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd"
import {IGameBoardProps, IItem} from "../vendors/game.vendors"
import Knob from "./Knob"

const GameBoard = ({handleDragAndDrop, lighterList, darkerList, items, getItemStyle, getListStyle}: IGameBoardProps) => {
    return (
        <DragDropContext onDragEnd={handleDragAndDrop}>
            <div className="flex flex-row m-24">
                <div className="mx-32">
                    <p className="text-center pb-3 font-bold text-xl">Lighter</p>
                    <Droppable droppableId="lighterList">
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
                                {lighterList?.map((item_light: IItem, index: number) => (
                                    <Knob itemColor={item_light} index={index} />
                                ))}

                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </div>
                <div className="mx-32">
                    <p className="text-center pb-3 font-bold text-xl">Darker</p>
                    <Droppable droppableId="darkerList">
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
                                {darkerList?.map((item_dark: IItem, index: number) => (
                                    <Knob itemColor={item_dark} index={index} />
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
                            {items.map((item: IItem, index: number) => (
                                <Knob itemColor={item} index={index} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>

    )
}

export default GameBoard