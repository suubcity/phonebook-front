import React, { useState, useEffect } from 'react';
import personService from './services/persons';
import './App.css';

//Components
const Search = ({ handleChange, value }) => {
	return (
		<div>
			filter <input onChange={handleChange} value={value} />
		</div>
	);
};

const Form = ({ newName, handleNameChange, newNumber, handleNumberChange, handleAddClick }) => {
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

const Entry = ({ person, handleRemovePerson }) => {
	return (
		<div>
			{person.name} {person.number}{' '}
			<button data-id={person.id} data-name={person.name} onClick={handleRemovePerson}>
				delete
			</button>
		</div>
	);
};

const Notification = ({ message }) => {
	if (message === '') {
		return null;
	} else {
		return <div className="notification">{message}</div>;
	}
};

const Error = ({ message }) => {
	if (message === '') {
		return null;
	} else {
		return <div className="error">{message}</div>;
	}
};

const Numbers = () => {
	return <h2>Numbers</h2>;
};

//App
const App = () => {
	//States
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [notification, setNotification] = useState('');
	const [error, setError] = useState('');

	//Functions
	useEffect(() => {
		personService.getAll().then((res) => {
			setPersons(res.data);
		});
	}, []);

	const handleRemovePerson = (e) => {
		if (confirmRemoveOfPerson(e.target.dataset.name)) {
			personService.remove(e.target.dataset.id).then((res) => {
				setPersons(
					persons.filter((person) => {
						return person.id !== e.target.dataset.id;
					})
				);
				displayNotification(`${e.target.dataset.name} has been removed from phonebook.`);
			});
		}
	};

	const confirmRemoveOfPerson = (name) => {
		return window.confirm(`Delete ${name}`);
	};

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
		return persons.find((person) => person.name.toLowerCase() === newName.toLowerCase());
	};

	const addPersonToPhonebook = () => {
		const newEntry = createPersonFromState();

		personService.create(newEntry).then((res) => {
			setPersons(persons.concat(res.data));
			displayNotification(`${newName} added to phonebook`);
		});
	};

	const createPersonFromState = () => {
		return {
			name: newName,
			number: newNumber,
		};
	};

	const updatePersonInPhonebook = () => {
		const newEntry = createPersonFromState();

		//todo make this code a sperate function
		const foundPerson = persons.find((person) => {
			return person.name.toLowerCase() === newName.toLowerCase();
		});

		const id = foundPerson.id;

		personService
			.update(id, newEntry)
			.then((res) => {
				setPersons(
					persons.map((person) => {
						return person.id !== id ? person : res.data;
					})
				);
				displayNotification(`Number for ${newName} updated to ${newNumber}`);
			})
			.catch((error) => {
				//logging error.response.data
				console.log(
					'######',
					'VARIABLE NAME:',
					'error.response.data',
					'TYPEOF:',
					typeof error.response.data,
					'VALUE:',
					error.response.data,
					'######'
				);
				//end of logging

				//logging error.message
				console.log(
					'######',
					'VARIABLE NAME:',
					'error.message',
					'TYPEOF:',
					typeof error.message,
					'VALUE:',
					error.message,
					'######'
				);
				//end of logging

				console.log(error.message);

				displayError(JSON.stringify(error.response.data));
			});
	};

	const handleAddClick = (e) => {
		e.preventDefault();
		if (nameIsAlreadyInPhonebook()) {
			if (window.confirm(`${newName} is already in phonebook. Replace old number with new one?`)) {
				updatePersonInPhonebook();
			}
		} else {
			addPersonToPhonebook();
		}
		setNewName('');
		setNewNumber('');
	};

	const filterByName = () => {
		return persons.filter((person) => {
			return person.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;
		});
	};

	const renderPersons = (arrayOfPersons) => {
		return arrayOfPersons.map((person) => {
			return <Entry key={person.name} person={person} handleRemovePerson={handleRemovePerson} />;
		});
	};

	const filterAndRenderPersons = () => {
		return renderPersons(filterByName());
	};

	const displayNotification = (message) => {
		setNotification(message);
		setTimeout(() => setNotification(''), 5000);
	};

	const displayError = (message) => {
		setError(message);
		setTimeout(() => setError(''), 15000);
	};

	//JSX
	return (
		<div>
			<Notification message={notification} />
			<Error message={error} />
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
