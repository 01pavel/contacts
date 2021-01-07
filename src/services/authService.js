class AuthService {
  constructor() {
    this.user = localStorage.getItem('user');
  }

  login = (user, cb) => {
    this.user = JSON.stringify(user);
    localStorage.setItem('user', this.user);
    cb();
  };

  logout = (cb) => {
    localStorage.clear();
    cb();
  };

  getUser = () => {
    return JSON.parse(this.user);
  };

  isAuthenticated = () => {
    return Boolean(localStorage.getItem('user'));
  };
}

export default new AuthService();
