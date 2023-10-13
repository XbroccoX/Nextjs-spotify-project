import { BackwardIcon, ForwardIcon } from "@heroicons/react/24/outline";

const Pagination = ({ nextPage, prevPage, currentPage }) => {
  const pageNumber = currentPage / 10 + 1;
  return (
    <div className="hidden justify-center items-center sm:flex sm:flex-row space-y-2 sm:space-x-3 sm:space-y-0">
      <button
        onClick={prevPage}
        className="bg-gray-700 text-white rounded-full px-2 py-1 md:px-4 md:py-2 font-bold  cursor-pointer"
      >
        <BackwardIcon className="w-5 h-5 text-white button" />
      </button>
      <span>{pageNumber}</span>
      <button
        onClick={nextPage}
        className="bg-gray-700 text-white rounded-full px-2 py-1 md:px-4 md:py-2 font-bold "
      >
        <ForwardIcon className="w-5 h-5 text-white button" />
      </button>
    </div>
  );
};

export default Pagination;
