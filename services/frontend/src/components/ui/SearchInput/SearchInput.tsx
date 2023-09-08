export default function SearchInput({
  handleQuery,
  handleSearch,
  placeholder,
  query,
}) {
  return (
    <div className="search-bar">
      <form onSubmit={handleQuery}>
        <label id="search-label">
          <input
            className="f6 pa1 mr3 ml1 w4 mv1"
            id="input-style"
            name="query"
            onChange={handleSearch}
            placeholder={placeholder}
            type="search"
            value={query}
          />
        </label>
      </form>
    </div>
  );
}
