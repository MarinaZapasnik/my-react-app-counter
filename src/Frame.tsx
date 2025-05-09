import React from "react";

type FrameProps = {
    width: string
    height: string
    children?: React.ReactNode;
}

export const Frame = ({width, height, children}: FrameProps) => {
    return (
        <div className="frame" style={{width, height}}>
            {children}
        </div>
    )
}