import React, { Component } from "react";
import { nanoid } from 'nanoid'
import Box from "./Box";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";

 
export class App extends Component {
  state = {
    contacts: [],
    filter: ''
  }
  componentDidMount() {
    const contacts = localStorage.getItem(`contacts`);
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(`contacts`, JSON.stringify(this.state.contacts));
    }
  }

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }))
  }

  addContact = ({name, number}) => {
    const contact = {
      id: nanoid(),
      name,
      number
    }

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts]
    }))
  };
 
  handleChangeFilter = e => {
    this.setState({ filter: e.target.value });
  }

  

  render() {
    const { filter } = this.state
    
    const normalizedFilter = this.state.filter.toLowerCase();
    
    const filterContacts = this.state.contacts.filter(contact => {
     return contact.name.toLowerCase().includes(normalizedFilter)
    });

    return <Box
      height='100vh'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      fontSize='40'
      color='#010101'
    >
      <h1>Phonebook</h1>
      <ContactForm onSubmit={this.addContact} />
      <h2>Contact</h2>
      <Filter value={filter} onChange={this.handleChangeFilter} />
      <ContactList contacts={filterContacts} onDeleteContact={this.handleDeleteContact} />
    </Box>
  };
};
