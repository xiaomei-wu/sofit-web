import styles from './SearchInput.module.css';

export default function SearchInput({
  onSubmit,
  onChange,
  placeholder,
  query,
}) {
  return (
    <div className={styles.searchbar}>
      <form onSubmit={onSubmit}>
        <label id="search-label">
          <input
            className={styles.searchInput}
            name="query"
            onChange={onChange}
            placeholder={placeholder}
            type="search"
            value={query}
          />
        </label>
      </form>
    </div>
  );
}
