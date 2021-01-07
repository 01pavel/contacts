class UsersService {
  getUsers = (payload) =>
    fetch(`/users?${new URLSearchParams(payload).toString()}`);
}

export default new UsersService();
