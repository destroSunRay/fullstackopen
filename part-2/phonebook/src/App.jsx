import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchText, setSearchText] = useState("");

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
    }
  };

  const handleNumberChange = (e) => {
    e.preventDefault();
    setNewNumber(e.target.value);
  };

  const handleSearchTextChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchText={searchText}
        handleSearchTextChange={handleSearchTextChange}
      />
      <h3>Add a new</h3>
      <PersonForm
        handleFormSubmit={handleFormSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons searchText={searchText} persons={persons} />
    </div>
  );
};

export default App;
