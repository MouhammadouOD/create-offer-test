import React, { ReactElement } from 'react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

interface List extends IPagination {
  datas: any[] | []
}

interface Props {
  list?: List
  handlePage: (page: number) => void
}

const Pagination = ({ list, handlePage }: Props): ReactElement => {
  return (
    <>
      {list && list.totalPages > 1 && (
        <section className='w-full mx-auto flex flex-wrap py-8'>
          <div className='w-full flex items-center justify-center py-2'>
            <span
              className={
                'h-10 w-10 flex items-center justify-center mr-3 cursor-pointer hover:bg-orange-700  hover:text-white ' +
                (list.currentPage ? 'block' : 'hidden')
              }
              onClick={() => handlePage(list.currentPage - 1)}
            >
              <BiChevronLeft className='h-6 w-6 text-gray-800 hover:text-white dark:text-gray-200' />
            </span>
            <span
              className={
                'h-10 w-10 font-semibold text-gray-800 dark:text-gray-200 hover:bg-orange-700 hover:text-white text-base flex items-center justify-center cursor-pointer ' +
                (list.currentPage - 1 === 0 ? 'block' : 'hidden')
              }
              onClick={() => handlePage(list.currentPage - 1)}
            >
              {list.currentPage === 1 ? 1 : list.currentPage - 1}
            </span>
            <span className='h-10 w-10 bg-omedema hover:bg-orange-700 font-semibold text-white text-base flex items-center justify-center cursor-pointer'>
              {!!list.currentPage ? list.currentPage + 1 : 1}
            </span>
            <span
              className={
                'h-10 w-10 font-semibold text-gray-800 dark:text-gray-200 hover:bg-orange-700 hover:text-white text-base flex items-center justify-center cursor-pointer ' +
                (list.currentPage + 1 === list.totalPages ? 'hidden' : 'block')
              }
              onClick={() => handlePage(list.currentPage + 1)}
            >
              {list.currentPage + 2}
            </span>
            <span
              className={
                'h-10 w-10 flex items-center justify-center ml-3 cursor-pointer hover:bg-orange-700 hover:text-white ' +
                (list.currentPage + 1 === list.totalPages ? 'hidden' : 'block')
              }
              onClick={() => handlePage(list.currentPage + 1)}
            >
              <BiChevronRight className='h-6 w-6 text-gray-800 hover:text-white dark:text-gray-200' />
            </span>
          </div>
        </section>
      )}
    </>
  )
}

export default Pagination
