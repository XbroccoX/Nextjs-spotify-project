const SearchBar = ({ handleSearchClick, isSearching, handleOnChangeInput }) => {
  return (
    <section className="fixed py-2 px-8 w-full sm:w-[45%] lg:w-3/5 ">
      <form className="relative" onSubmit={handleSearchClick}>
        <input
          value={isSearching}
          onChange={handleOnChangeInput}
          type="search"
          id="default-search"
          className="block w-full p-1 sm:p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-[#18d860] focus:border-[#18d860] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#18d860] dark:focus:border-[#18d860]"
          placeholder="Search Songs, Albums, Artists..."
        />
      </form>
    </section>
  );
};

export default SearchBar;
