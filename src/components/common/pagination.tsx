import { useState } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';

interface PaginationControllerProps {
  totalPages?: number;
  setPage: (page: number) => void;
}

const PaginationController = (props: PaginationControllerProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const goToPreviousPage = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
    if (props.setPage) {
      props.setPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage === props.totalPages) return;
    setCurrentPage(currentPage + 1);
    if (props.setPage) {
      props.setPage(currentPage + 1);
    }
  };

  return (
    <Pagination className='mt-4 space-x-1'>
      <PaginationPrevious
        onClick={goToPreviousPage}
        className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
      />
      <PaginationContent>
        {Array.from({ length: props.totalPages || 0 }, (_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              className='border-green-400 font-montserrat'
              isActive={currentPage === index + 1}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
      <PaginationNext
        onClick={goToNextPage}
        className={currentPage === props.totalPages ? 'pointer-events-none opacity-50' : ''}
      />
    </Pagination>
  );
};

export default PaginationController;
