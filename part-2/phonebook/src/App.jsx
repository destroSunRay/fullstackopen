import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

import personService from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchText, setSearchText] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleAPIError = (error, oldPerson) => {
    // console.log("error", error);
    console.log(error.response.data.error);
    if (error.status === 400) {
      setNotification({
        message: error.response.data.error,
        type: "error",
      });
      setTimeout(() => setNotification({ message: null, type: null }), 3000);
    } else {
      setNotification({
        message: `Information of ${newName} has already been removed from server.`,
        type: "error",
      });
      setTimeout(() => setNotification({ message: null, type: null }), 3000);
      setPersons(persons.filter((person) => person.id !== oldPerson.id));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const oldPerson = persons.find((person) => person.name === newName);
    if (oldPerson) {
      // alert(`${newName} is already added to the phonebook`);
      personService
        .update({ ...oldPerson, number: newNumber }, oldPerson.id)
        .then((updatedPerson) => {
          setPersons(
            persons.map((person) => {
              return person.id === oldPerson.id
                ? { ...oldPerson, number: updatedPerson.number }
                : person;
            })
          );
          setNotification({
            message: `Updated the phone number of ${newName}`,
            type: "success",
          });
          setTimeout(
            () => setNotification({ message: null, type: null }),
            3000
          );
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => handleAPIError(error, oldPerson));
    } else {
      const newPerson = { name: newName, number: newNumber };
      personService
        .create(newPerson)
        .then((addedPerson) => {
          setPersons(persons.concat(addedPerson));
          setNotification({
            message: `Added ${newName}`,
            type: "success",
          });
          setTimeout(
            () => setNotification({ message: null, type: null }),
            3000
          );
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => handleAPIError(error));
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

  const handlePersonDelete = (deletedPerson) => {
    if (window.confirm(`Delete ${deletedPerson.name}?`)) {
      personService
        .remove(deletedPerson.id)
        .then(() =>
          setPersons(persons.filter((person) => person.id !== deletedPerson.id))
        );
    }
  };

  useEffect(() => {
    personService.getAll().then((intitalPersons) => setPersons(intitalPersons));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
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
      <Persons
        searchText={searchText}
        persons={persons}
        handlePersonDelete={handlePersonDelete}
      />
    </div>
  );
};

export default App;
