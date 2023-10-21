import React, { Component } from 'react'
import Notiflix from 'notiflix';
import { nanoid } from 'nanoid'
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Container, Title, ContactsTitle } from './App.styled';

export class App extends Component {

state = {
  contacts: [],
  filter: ''
}
  
  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      const parsedContacts = JSON.parse(savedContacts);
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

   //   Filter contacts
  filterContacts = value  => {
    this.setState({
      filter: value,
    });
  };
  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

   //   Submit form
  handleSubmit = data => {
    const isInContacts = this.state.contacts.find(
      ({ name }) => name.toLowerCase() === data.name.toLowerCase()
    );

    if (isInContacts) {
      Notiflix.Notify.failure(`${data.name} is already in contacts!`, {
        position: 'left-top',
        distance: '10px',
      });
      return;
    }
    this.setState(prevState => {
      return {
          contacts: [...prevState.contacts,{
          id: nanoid(),
          name: data.name,
          number: data.number,
        },
      ],
      };
    });
  }; 

  //   Delete contacts
  deleteContact = idOfContact => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== idOfContact),
      };
    });
  };

  render() {
    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={this.handleSubmit} />

        <ContactsTitle>Contacts</ContactsTitle>
        <Filter value={this.state.filter} onChange={this.filterContacts} />
        {this.state.contacts.length !== 0 && (
          <ContactList
            onClick={this.deleteContact}
            contacts={this.getFilteredContacts()}
          />
        )}
      </Container>
    );
  }
}
