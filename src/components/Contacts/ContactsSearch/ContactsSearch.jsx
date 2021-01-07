import { useEffect, useState, useRef } from 'react';
import { Typography, TextField, Box } from '@material-ui/core';
import { useFetch, fetchStatuses } from '../../../hooks/useFetch';
import authService from '../../../services/authService';
import contactsService from '../../../services/contactsService';
import { useDebounce } from '../../../hooks/useDebounce';
import styles from './ContactsSearch.module.css';
import FetchError from '../../common/FetchError/FetchError';

const ContactsSearch = ({ setContactsList }) => {
  const [searchString, setSearchString] = useState('');
  const isSearchChanged = useRef(false);
  const {
    execute: searchForContacts,
    status,
    data: contactsList,
    error,
  } = useFetch(contactsService.getContacts);

  const debouncedSearchString = useDebounce(searchString, 500);

  useEffect(() => {
    if (!isSearchChanged.current) {
      return;
    }
    const user = authService.getUser();
    searchForContacts({ ownerId: user.id, q: debouncedSearchString });
  }, [debouncedSearchString, searchForContacts]);

  useEffect(() => {
    if (contactsList) {
      setContactsList(contactsList);
    }
  }, [contactsList, setContactsList]);

  const changeHandler = (value) => {
    if (!isSearchChanged.current) {
      isSearchChanged.current = true;
    }

    setSearchString(value);
  };

  return (
    <Box display="flex" alignItems="center">
      <TextField
        className={styles.searchField}
        variant="outlined"
        label="search for contacts"
        value={searchString}
        onChange={(e) => changeHandler(e.target.value)}
      />
      {status === fetchStatuses.pending && (
        <Typography className={styles.status}>searching...</Typography>
      )}
      {error && <FetchError error={error} cssClass={styles.status} />}
    </Box>
  );
};

export default ContactsSearch;
