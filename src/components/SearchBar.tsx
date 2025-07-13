import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { FormEvent, ChangeEvent } from "react";
import { useState } from "react";
import { Button } from "./Button";
import { IconButton } from "./IconButton";

type SearchBarProps = {
  placeholder?: string;
  onSearch: (value: string) => void;
  onClear?: () => void;
  className?: string;
};

const SearchBar = ({
  placeholder = "Search...",
  onSearch,
  onClear,
  className,
}: SearchBarProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  const handleClear = () => {
    setInputValue("");
    onSearch("");
    onClear?.();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div
      className={`w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg ${className}`}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex items-stretch border-2 border-searchbar-border rounded-lg overflow-hidden focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-800">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="flex-1 outline-none bg-transparent text-sm px-3 py-2 min-w-0"
          />
          {inputValue && (
            <IconButton
              icon={<XMarkIcon className="h-5 w-5" data-testid="x-mark-icon" />}
              onClick={handleClear}
              data-testid="clear-button"
            />
          )}
          <Button
            type="submit"
            className="w-auto flex-shrink-0 px-3 py-2 bg-gradient-to-r from-gradient-start to-gradient-end text-white hover:opacity-90 transition-all duration-200 text-sm font-medium rounded-l-md flex items-center gap-1"
            data-testid="search-button"
          >
            <MagnifyingGlassIcon
              className="h-5 w-5 my-1 mx-2"
              data-testid="magnifying-glass-icon"
            />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
