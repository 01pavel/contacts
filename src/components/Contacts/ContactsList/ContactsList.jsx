import { useState } from 'react';
import { List, Typography } from '@material-ui/core';
import ContactItem from '../ContactItem/ContactItem';
import NewContact from '../AddContactSection/NewContact/NewContact';

const ContactsList = ({ contactsList, setContactsList, onUpdateContact }) => {
  const [editingContactIds, setEditingContactIds] = useState([]);

  if (!contactsList.length) {
    return <Typography align="center">no contacts found</Typography>;
  }

  return (
    <List aria-label="contacts list">
      {contactsList.map((contact) => {
        if (editingContactIds.includes(contact.id)) {
          return (
            <NewContact
              editMode
              key={contact.id}
              editingContact={contact}
              setContactsList={setContactsList}
              setEditingContactIds={setEditingContactIds}
              onUpdateContact={onUpdateContact}
            />
          );
        } else {
          return (
            <ContactItem
              key={contact.id}
              contact={contact}
              setContactsList={setContactsList}
              setEditingContactIds={setEditingContactIds}
            />
          );
        }
      })}
    </List>
  );
};

export default ContactsList;
