import { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Button, Typography, Paper } from '@material-ui/core';
import { useFetch, fetchStatuses } from '../../../hooks/useFetch';
import ContactsList from '../ContactsList/ContactsList';
import ContactsSearch from '../ContactsSearch/ContactsSearch';
import styles from './ContactsPage.module.css';
import AddContactSection from '../AddContactSection/AddContactSection';
import authService from '../../../services/authService';
import contactsService from '../../../services/contactsService';
import FetchError from '../../common/FetchError/FetchError';

const HomePage = () => {
  const history = useHistory();

  const {
    execute: getContacts,
    status,
    data: contactsList,
    error,
    setData: setContactsList,
  } = useFetch(contactsService.getContacts);

  useEffect(() => {
    if (getContacts) {
      const user = authService.getUser();
      getContacts({ ownerId: user.id });
    }
  }, [getContacts]);

  const logout = () => {
    authService.logout(() => history.push('/login'));
  };

  const updateContact = useCallback(
    (updatedContact) => {
      setContactsList((prevList) =>
        prevList.map((item) => {
          if (item.id !== updatedContact.id) {
            return item;
          }

          return updatedContact;
        }),
      );
    },
    [setContactsList],
  );

  return (
    <Grid container justify="center" className={styles.contactsPage}>
      <Grid item xs={12} md={6} className={styles.contactsContainer}>
        <Button
          onClick={logout}
          variant="contained"
          color="primary"
          className={styles.logoutBtn}
        >
          Logout
        </Button>
        <Paper className={styles.contactsPaper}>
          <ContactsSearch setContactsList={setContactsList} />
          {status === fetchStatuses.pending && (
            <Typography align="center">contacts loading...</Typography>
          )}
          {status === fetchStatuses.success && (
            <ContactsList
              contactsList={contactsList}
              setContactsList={setContactsList}
              onUpdateContact={updateContact}
            />
          )}
          {error && <FetchError error={error} />}
          <AddContactSection setContactsList={setContactsList} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default HomePage;
