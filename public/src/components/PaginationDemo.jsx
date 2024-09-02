import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../components/ui/pagination';
import { Button } from './ui/button';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons';

export default function PaginationDemo({
  totalPage,
  currentPage,
  onPageChange,
}) {
  const renderPageNumber = () => {
    const pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <PaginationLink
          key={i}
          onClick={() => onPageChange(i)}
          disabled={i === currentPage}
          className={`${i === currentPage ? 'bg-white' : ''}`}
        >
          {i}
        </PaginationLink>,
      );
    }

    return pages;
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="cursor-pointer"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            <span>Previous</span>
          </Button>
        </PaginationItem>
        <PaginationItem>{renderPageNumber()}</PaginationItem>

        <PaginationItem>
          <Button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPage}
            className="cursor-pointer"
          >
            <span>Next</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
