class ContactsService {
  getContacts = (payload) =>
    fetch(`/contacts?${new URLSearchParams(payload).toString()}`);

  createContact = (payload) =>
    fetch('/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

  updateContact = (payload) => {
    return fetch(`/contacts/${payload.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  };

  deleteContact = (contactId) =>
    fetch(`/contacts/${contactId}`, {
      method: 'DELETE',
    });
}

export default new ContactsService();
