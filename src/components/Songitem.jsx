import React from "react";

const Songitem = ({name, image, desc,}) => {
    return (
        <div className="min-w[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
            <img className="rounded" src={image} alt="" />
            <p className="font-bold mt-2 mb-1">{name}</p>
            <p className="text-slate200 text-sm">{desc}</p>
        </div>
    )
}

export default Songitem