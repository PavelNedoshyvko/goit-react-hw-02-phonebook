import { Component } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { nanoid } from 'nanoid';
import { AppWrap, TitleApp, TitleContactList } from "./App.styled";
// import toast, { Toaster } from 'react-hot-toast';

export class App extends Component {

	state = {
		contacts: [],
		filter: '',
	};

	addContact = values => {
		const contactInput = { id: nanoid(), ...values }
		this.setState(prevState => {
			prevState.contacts.filter((contact) => {
				if (contact.firstName === contactInput.firstName) {
					return alert(`${contactInput.firstName} is already in contacts.`);
					// return false;
					// toast.success('Successfully toasted!')
				}
				return false;
			});
			return { contacts: [...prevState.contacts, contactInput], };
		});
	};

	deleteContact = contactId => {
		this.setState(prevState => (
			{
				contacts: prevState.contacts.filter(contact =>
					contact.id !== contactId),
			}
		));
	};

	changeFilter = value => {
		this.setState({filter: value,});
	};
	
	render() {
		const { contacts, filter } = this.state;

		const visibleContacts = contacts.filter((contact) =>
			contact.firstName.toLowerCase().includes(filter.toLowerCase()));
		
		return (
			<AppWrap>
				<TitleApp>Phonebook</TitleApp>
				<ContactForm onAddContact={this.addContact} />
				<TitleContactList>Contacts</TitleContactList>
				<Filter filter={filter}
					onChangeFilter={this.changeFilter} />
				<ContactList contacts={visibleContacts}
					onDeleteContact={this.deleteContact} />
				{/* <Toaster /> */}
			</AppWrap>
		);
	};
};
