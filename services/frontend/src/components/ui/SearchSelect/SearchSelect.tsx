// components/SearchSelect.tsx

import React, { useEffect, useState } from 'react';
import styles from './SearchSelect.module.css';

interface Option {
  value: string;
  label: string;
}

interface SearchSelectProps {
  options: Option[];
  onSearch: (query: string) => void;
  onSelect: (option: Option) => void;
}

const SearchSelect: React.FC<SearchSelectProps> = ({
  options,
  onSearch,
  onSelect,
}) => {
  const [query, setQuery] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);

  useEffect(() => {
    // Update the filtered options when options or the query change
    const filtered = options.filter(option =>
      option.label.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredOptions(filtered);
  }, [options, query]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  const handleSelectOption = (option: Option) => {
    setQuery(option.label);
    onSelect(option);
  };

  return (
    <div className={styles.searchSelect}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />
      <div className={styles.options}>
        {filteredOptions.map(option => (
          <div
            key={option.value}
            className={styles.option}
            onClick={() => handleSelectOption(option)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchSelect;
