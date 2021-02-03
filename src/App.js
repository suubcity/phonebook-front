import React, { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/persons";

const Search = ({ handleChange, value }) => {
  return (
    <div>
      filter <input onChange={handleChange} value={value} />
    </div>
  );
};

const Form = ({
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
  handleAddClick,
}) => {
  return (
    <form>
      <div>
        name: <input onChange={handleNameChange} value={newName} />
      </div>
      <div>
        number: <input onChange={handleNumberChange} value={newNumber} />
      </div>
      <div>
        <button type="submit" onClick={handleAddClick}>
          add
        </button>
      </div>
    </form>
  );
};

const Entry = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  );
};

const Numbers = () => {
  return <h2>Numbers</h2>;
};

const App = () => {
  //States
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  //Functions
  useEffect(() => {
    personService.getAll().then((res) => {
      setPersons(res.data);
    });
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const nameIsAlreadyInPhonebook = () => {
    return persons.find((person) => person.name === newName);
  };

  const addPersonToPhoneBook = () => {
    const newEntry = {
      name: newName,
      number: newNumber,
    };

    personService.create(newEntry).then((res) => {
      setPersons(persons.concat(res.data));
    });
  };

  const handleAddClick = (e) => {
    e.preventDefault();
    if (nameIsAlreadyInPhonebook()) {
      alert(`${newName} is already in phonebook.`);
    } else {
      addPersonToPhoneBook();
    }
    setNewName("");
    setNewNumber("");
  };

  const filterByName = () => {
    return persons.filter((person) => {
      return (
        person.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
      );
    });
  };

  const renderPersons = (arrayOfPersons) => {
    return arrayOfPersons.map((person) => {
      return <Entry key={person.name} person={person} />;
    });
  };

  const filterAndRenderPersons = () => {
    return renderPersons(filterByName());
  };

  //JSX
  return (
    <div>
      <h2>Phonebook</h2>
      <Search handleChange={handleFilterChange} value={searchQuery} />
      <Form
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleAddClick={handleAddClick}
      />

      <Numbers />

      {filterAndRenderPersons()}
    </div>
  );
};

export default App;
