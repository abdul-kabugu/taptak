/*import { categories, sidebarNav } from '@/assets/constant'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import React, {useState} from 'react'

 type sidebarprops  = {
     isShowFull? : boolean
      toggleSidebar? : any
 }
export default function Sidebar({isShowFull, toggleSidebar} : sidebarprops) {
  const [active, setactive] = useState(0)
  return (
    <div className={`${! isShowFull && "xs:hidden md:block"}  md:w-14   bg-inherit z-10 text-text `} onClick={() => toggleSidebar()}>
    <div className={`${isShowFull && "w-screen h-screen bg-gray-800/60 fixed top-[60px]"}`}>
        <div className={`${isShowFull ? "w-52 bg-sky-100 dark:bg-gray-800 p-2 " : "items-center dark:bg-gray-800 bg-sky-100 w-14"} h-screen fixed top-[60px] flex flex-col  `}>
          {sidebarNav.map((item, i) => (
            <Link key={i} href={item.to}>
            <div className={`${isShowFull ? "flex-row  w-48 items-center py-2 px-4 rounded-xl gap-3" : "flex-col items-center py-1"} flex  my-1 dark:hover:bg-background-lightest px-4 hover:bg-gray-300/80  py-3 `} >  
              <item.icon className={`${isShowFull ? "w-3.5 h-3.5" : "w-5 h-5"}`}  />
              <p className={`text-xs ${! isShowFull && "hidden"}`}>{item.title}</p>
              </div>
              </Link>
             
          ))}
          
  <div className='h-[0.6px] w-full bg-gray-300 dark:bg-gray-900 my-1'> </div>
  {categories.map((item, i) => (
            <Link key={i} href={item.to}>
            <div className={`${isShowFull ? "flex-row  w-48 items-center py-2 px-4 rounded-xl gap-3" : "flex-col items-center"} flex  my-1 dark:hover:bg-gray-700 px-4 hover:bg-gray-300/80  py-3 `} >  
              <item.icon className={`${isShowFull ? "w-3.5 h-4.5" : "w-5 h-5"}`}  />
              <p className={`text-xs ${! isShowFull && "hidden"}`}>{item.title}</p>
              </div>
              </Link>
             
          ))}
        </div>

    </div>
    
    </div>
  )
}*/




import { sidebarNav } from '@/assets/constant';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, {useState} from 'react'
import { BsChevronDoubleRight, BsChevronDoubleLeft } from "react-icons/bs";
import NavItem from './Item';

 type sidebarProps =  {
      isOpen? : any
      toggleOpen? : any 
 }
export default function Sidebar({toggleOpen, isOpen } : sidebarProps) {
  //const [isOpen, setisOpen] = useState(false)

 /* const handleToggleIsOpen = () =>  {
    setisOpen(! isOpen)
   }*/

   const pathName = usePathname()
   console.log("the path name ", pathName)
  return (
<div className={`hidden md:flex   sticky top-0 ${isOpen ? "flex w-[200px] bg-white text-gray-950 dark:bg-neutral-900 border-r dark:border-gray-900 border-gray-200 animate-slideInFromLeft" : ! isOpen ? "w-[65px] bg-gray-50 dark:bg-neutral-900 border-r  border-gray-300 dark:border-gray-700 animate-slideOutToLeft " : ""}  top-[60px]  h-[calc(100vh-60px)]  xl:mr-3 `}>
 
 <div className=' h-full w-full relative'>


   <div className={`text-white  absolute ${isOpen ? "left-[93%]" : "left-[85%]"}   my-2 bg-gray-400 hover:bg-gray-600 dark:bg-gray-800 w-7 h-7 rounded-full flex items-center justify-center dark:hover:bg-gray-700 cursor-pointer`}>
     {isOpen  ? (
   <BsChevronDoubleLeft onClick={toggleOpen} />
     ) : (
         <BsChevronDoubleRight onClick={toggleOpen} />
     )}
   </div>

     <div className={`mt-14 px-1 text-gray-950 dark:text-gray-300`}>
     {sidebarNav.map((item, i) =>  (
     <NavItem  route={pathName}  item={item} isOpen={isOpen} key={i}  />
     ))}
     </div>
   </div>
</div>
  )
}
