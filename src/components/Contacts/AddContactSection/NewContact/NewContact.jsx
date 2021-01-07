import { memo, useState, useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  ListItem,
  Typography,
} from '@material-ui/core';
import { Check, Close } from '@material-ui/icons';
import styles from './NewContact.module.css';
import { fetchStatuses, useFetch } from '../../../../hooks/useFetch';
import contactsService from '../../../../services/contactsService';
import FetchError from '../../../common/FetchError/FetchError';

const NewContact = ({
  setShowNewContact,
  setContactsList,
  editMode = false,
  editingContact,
  setEditingContactIds,
  onUpdateContact,
}) => {
  const [contact, setContact] = useState(
    editMode ? editingContact : { name: '', email: '' },
  );

  const { execute, status, data, error } = useFetch(
    editMode ? contactsService.updateContact : contactsService.createContact,
  );

  useEffect(() => {
    if (editMode || !data) {
      return;
    }

    setShowNewContact(false);
    setContactsList((prevList) => [...prevList, data]);
  }, [data, setShowNewContact, setContactsList, editMode]);

  useEffect(() => {
    if (!editMode || !data) {
      return;
    }
    setEditingContactIds((prevEditingIds) =>
      prevEditingIds.filter((item) => item !== data.id),
    );
    onUpdateContact(data);
  }, [data, setEditingContactIds, editMode, onUpdateContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setContact((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  };

  const saveContact = async () => {
    if (editMode) {
      await execute(contact);
    } else {
      await execute({ ...contact, id: Date.now() });
    }
  };

  const cancel = () => {
    if (editMode) {
      setEditingContactIds((prevEditingIds) =>
        prevEditingIds.filter((item) => item !== editingContact.id),
      );
    } else {
      setShowNewContact(false);
    }
  };

  return (
    <ListItem button disableRipple divider className={styles.contactItem}>
      <TextField
        label="name"
        name="name"
        value={contact.name}
        variant="outlined"
        onChange={(e) => handleChange(e)}
      />
      <TextField
        label="email"
        name="email"
        value={contact.email}
        variant="outlined"
        onChange={(e) => handleChange(e)}
      />
      <Box className={styles.actionsContainer}>
        {status === fetchStatuses.pending ? (
          <Typography>{editMode ? 'updating...' : 'creating...'}</Typography>
        ) : (
          <>
            <IconButton title="save" onClick={saveContact}>
              <Check />
            </IconButton>
            <IconButton title="cancel" onClick={cancel}>
              <Close />
            </IconButton>
          </>
        )}
      </Box>
      {error && <FetchError error={error} cssClass={styles.errorMessage} />}
    </ListItem>
  );
};

export default memo(NewContact);
