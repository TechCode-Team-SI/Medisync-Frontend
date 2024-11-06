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
  currentPage: number;
  totalPages: number;
  goToPreviousPage: (page: number) => void;
  goToNextPage: (page: number) => void;
}

const PaginationController = (props: PaginationControllerProps) => {
  const [currentPage, setCurrentPage] = useState(props.currentPage);

  const goToPreviousPage = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
    if (props.goToPreviousPage) {
      props.goToPreviousPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage === props.totalPages) return;
    setCurrentPage(currentPage + 1);
    if (props.goToNextPage) {
      props.goToNextPage(currentPage + 1);
    }
  };

  return (
    <Pagination className='mt-4 space-x-1'>
      <PaginationPrevious
        onClick={goToPreviousPage}
        className={props.currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
      />
      <PaginationContent>
        {Array.from({ length: props.totalPages }, (_, index) => (
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
