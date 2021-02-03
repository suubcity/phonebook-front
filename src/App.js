import React, { useState } from "react";

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
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  //Functions
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

    setPersons(persons.concat(newEntry));
  };

  const handleAddClick = (e) => {
    e.preventDefault();
    if (nameIsAlreadyInPhonebook()) {
      alert(`${newName} is already in phonebook.`);
    } else {
      addPersonToPhoneBook();
    }
    setNewName("");
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
      return <Entry person={person} />;
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
