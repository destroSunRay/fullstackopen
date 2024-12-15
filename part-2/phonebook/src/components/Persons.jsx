const Persons = ({ persons, searchText, handlePersonDelete }) => {
  return (
    <>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(searchText.toLowerCase())
        )
        .map((person) => (
          <div key={person.id}>
            {person.name} {person.number}{" "}
            <button onClick={() => handlePersonDelete(person)}>delete</button>
          </div>
        ))}
    </>
  );
};

export default Persons;
