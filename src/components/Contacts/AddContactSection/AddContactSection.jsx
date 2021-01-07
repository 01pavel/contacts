import { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import styles from './AddContentSection.module.css';
import NewContact from './NewContact/NewContact';

const AddContactSection = ({ setContactsList }) => {
  const [showNewContact, setShowNewContact] = useState(false);

  return showNewContact ? (
    <NewContact
      setShowNewContact={setShowNewContact}
      setContactsList={setContactsList}
    />
  ) : (
    <IconButton
      title="create new contact"
      variant="contained"
      color="primary"
      className={styles.addBtn}
      onClick={() => setShowNewContact(true)}
    >
      <Add />
    </IconButton>
  );
};

export default AddContactSection;
