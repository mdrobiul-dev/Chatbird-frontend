import React from 'react'

const MenuElement = ({icon: Icon, text}) => {
  return (
    <div className="flex gap-2 rounded items-center ml-1.5 py-1  mr-8 hover:text-white duration-100 hover:bg-[#32375C] cursor-pointer">
        <span className="text-[22px] pl-1.5 text-center "><Icon /></span>
        <h2 className="font-semibold text-[18px] ">{text}</h2>
      </div>
  )
}

export default MenuElement