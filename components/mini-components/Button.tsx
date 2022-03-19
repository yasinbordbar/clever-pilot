import React from "react"

interface IButtonProps {
    text: string;
    handler: (e: any) => void;
}

const Button = ({text, handler}: IButtonProps) => {
    return (
        <button
            onClick={handler}
            className="bg-gray-100 p-4 rounded-md mt-8 text-black-300 m-5 text-xl"
        >
            {text}
        </button>
    )
}

export default Button