const Persons = ({ persons, searchText }) => {
  return (
    <>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(searchText.toLowerCase())
        )
        .map((person) => (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        ))}
    </>
  );
};

export default Persons;
