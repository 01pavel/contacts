import { memo, useEffect } from 'react';
import { ListItem, IconButton, Box, Typography } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { useFetch, fetchStatuses } from '../../../hooks/useFetch';
import contactsService from '../../../services/contactsService';
import styles from './ContactItem.module.css';
import FetchError from '../../common/FetchError/FetchError';

const ContactItem = ({ contact, setContactsList, setEditingContactIds }) => {
  const {
    execute: deleteContact,
    status,
    data: deleteContactData,
    error,
  } = useFetch(contactsService.deleteContact);

  useEffect(() => {
    if (deleteContactData) {
      setContactsList((prevContacts) =>
        prevContacts.filter((item) => item.id !== contact.id),
      );
    }
  }, [deleteContactData, setContactsList, contact.id]);

  const deleteContactHandler = async () => {
    await deleteContact(contact.id);
  };

  return (
    <ListItem button disableRipple divider className={styles.contactItem}>
      <Typography>{contact.name}</Typography>
      <Typography>{contact.email}</Typography>
      <Box className={styles.action}>
        {status === fetchStatuses.pending ? (
          <Typography className={styles.status}>deleting...</Typography>
        ) : (
          <>
            <IconButton
              aria-label="edit"
              onClick={() =>
                setEditingContactIds((prevEditingIds) => [
                  ...prevEditingIds,
                  contact.id,
                ])
              }
            >
              <Edit />
            </IconButton>
            <IconButton aria-label="delete" onClick={deleteContactHandler}>
              <Delete />
            </IconButton>
          </>
        )}
      </Box>
      {error && <FetchError error={error} cssClass={styles.errorMessage} />}
    </ListItem>
  );
};

export default memo(ContactItem);
