import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useQuery, useQueryClient } from 'react-query';
import { getCategories } from '../libs/helper';
import { FaSpinner } from 'react-icons/fa';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { LuAlertTriangle } from 'react-icons/lu';
  


export default function MenuDropdown({ onSelectCategory }) {
  const queryClient = useQueryClient()

  const { isLoading, isError, data, error } = useQuery("Categories", getCategories);


  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div className='inline-flex items-center justify-center px-3 py-1 text-base font-medium  text-black whitespace-no-wrap  border-gray-300 hover:bg-red-50 rounded-md bg-red-100 border bg-opacity-80  hover:bg-opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 w-fit'>aucune catégorie disponible<LuAlertTriangle className='ml-2'/></div>;
  }



  const value = (v) => {
    onSelectCategory(v);
  };
  return (
    <div className=" top-16 w-fit text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex items-center justify-center px-3 py-1 text-base font-medium  text-black whitespace-no-wrap  border-gray-300 hover:bg-gray-50 w-full rounded-md bg-white border bg-opacity-80  hover:bg-opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          Categories
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
            {data.map((e,i) => (
              <Menu.Item>
              <button
              key={i}
              onClick={()=>value(e)}
              className={` text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm`}
            >
              {e}
            </button>
              </Menu.Item>
              ))
            }
                  
                  <Menu.Item>
              <button
              onClick={()=>value("all")}
              className={` text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm`}
            >
              Tous les évènements
            </button>
              </Menu.Item>

            </div>

          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
