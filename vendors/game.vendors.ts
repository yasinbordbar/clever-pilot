import {CSSProperties} from "react"
import {DropResult} from "react-beautiful-dnd"

export interface IGameBoardProps{
    handleDragAndDrop: (result: DropResult) => void;
    lighterList: IItem[];
    darkerList: IItem[];
    items: IItem[];
    getItemStyle: any;
    getListStyle: any;
}

export interface IItem {
    id: number;
    color: string;
}

export interface IItemStyle{
    isDragging?: boolean;
    draggableStyle: CSSProperties;
}

export interface IDragAndDrop {
    source: any;
    destination: any;
}

export interface IKnobProps{
    itemColor: IItem;
    index: number;
}

export interface ITitleProps{
    text: string;
}

