import React from 'react'
import {ITitleProps} from "../../vendors/game.vendors"

const Title = ({text}: ITitleProps) => {
    return (
        <h1 className="font-bold text-4xl">{text}</h1>

    )
}

export default Title