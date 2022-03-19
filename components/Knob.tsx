import React from 'react'
import {Draggable} from "react-beautiful-dnd"
import {IKnobProps} from "../vendors/game.vendors"

const Knob = ({itemColor, index}: IKnobProps) => {
    return (
        <Draggable
            key={itemColor.id}
            draggableId={itemColor.id.toString()}
            index={index}
        >
            {(provided, snapshot) => (
                <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    key={itemColor.id}
                    className={
                        snapshot.isDragging ? "selected" : "not-selected"
                    }
                >
                    <div className="flex flex-row items-center justify-center mt-2">
                        {" "}
                        <div
                            style={{background: itemColor.color}}
                            className="border-gray-100 border-4 rounded-full h-20 w-20 my-2 mx-8"
                        />{" "}
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default Knob