const Filter = ({ searchText, handleSearchTextChange }) => {
  return (
    <div>
      filter shown with&nbsp;
      <input type="text" value={searchText} onChange={handleSearchTextChange} />
      <br />
    </div>
  );
};

export default Filter;
