import React from 'react'
import Link from 'next/link'

type Props = {
    route : any
    item : any
    isOpen : any
}
export default function NavItem({route, item, isOpen} : Props) {
  const isActive = route === item.to;
   const isHome  = route === "/"
  return (
    <Link  href={item.to}
    className={` dark:hover:bg-gray-800 hover:bg-gray-300 ${isActive && "dark:bg-gray-800 bg-gray-300 dark:text-blue-500 text-blue-600"} ${isHome && item.link === "/" ? "bg-gray-800 text-blue-500" : ""} flex  ${isOpen && "space-x-2"} items-center my-4  ${! isOpen && "justify-center flex-col"} py-2 px-2 rounded-md`}
    >
 
      <item.icon className={`w-4 h-4 ${isOpen  && "w-3.5 h-3.5"}`} />
        <p className={`${! isOpen && "text-xs"} text-sm`}>{item.title}</p>
   
     </Link>
  )
}