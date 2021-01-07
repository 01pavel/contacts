import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, TextField, Button, Paper } from '@material-ui/core';
import { useFetch, fetchStatuses } from '../../hooks/useFetch';
import styles from './LoginPage.module.css';
import authService from '../../services/authService';
import FetchError from '../common/FetchError/FetchError';
import usersService from '../../services/usersService';

const Login = () => {
  const isDirtyFields = useRef({
    username: false,
    password: false,
  });
  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });
  const [loginError, setLoginError] = useState('');

  const history = useHistory();

  const {
    execute: executeLogin,
    status: loginStatus,
    data: loginData,
    error: postLoginError,
  } = useFetch(usersService.getUsers);

  const validate = useCallback(() => {
    let newErrors = {};
    for (let prop in values) {
      newErrors[prop] =
        values[prop].length < 3 && isDirtyFields.current[prop]
          ? `${prop} should be at least 3 characters long`
          : '';
    }
    setErrors(newErrors);
  }, [values]);

  useEffect(() => {
    validate();
  }, [values, validate]);

  useEffect(() => {
    const saveUser = () => {
      if (!postLoginError && !loginData) {
        return;
      }

      if (postLoginError || !(loginData && loginData.length)) {
        setLoginError(
          postLoginError
            ? postLoginError.message
            : 'incorrect username or password',
        );
        return;
      }

      const user = loginData && loginData[0];

      authService.login(user, () => history.push('/'));
    };
    saveUser();
  }, [postLoginError, loginData, history]);

  const loginHandler = async (e) => {
    e.preventDefault();
    const { username, password } = values;

    await executeLogin({ username, password });
  };

  const isLoginDisabled = useMemo(() => {
    const { username, password } = errors;

    return Boolean(
      Object.values(isDirtyFields.current).some((item) => !item) ||
        loginStatus === fetchStatuses.pending ||
        username ||
        password,
    );
  }, [loginStatus, errors]);

  const changeHandler = (name, value) => {
    // setting the form as dirty
    if (!isDirtyFields.current[name]) {
      isDirtyFields.current[name] = true;
    }

    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <Grid container justify="center" className={styles.loginContainer}>
      <Grid item xs={12} md={6} lg={3}>
        <Paper className={styles.loginFormContainer}>
          <form onSubmit={loginHandler} className={styles.form}>
            <TextField
              required
              variant="outlined"
              className={styles.field}
              label="username"
              helperText={errors.username}
              error={Boolean(errors.username)}
              value={values.username}
              onChange={(e) => changeHandler('username', e.target.value)}
              onFocus={() => setLoginError(null)}
            />
            <TextField
              required
              type="password"
              variant="outlined"
              autoComplete="new-password"
              className={styles.field}
              label="password"
              helperText={errors.password}
              error={Boolean(errors.password)}
              value={values.password}
              onChange={(e) => changeHandler('password', e.target.value)}
              onFocus={() => setLoginError(null)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoginDisabled}
            >
              {`Login${loginStatus === fetchStatuses.pending ? 'ning...' : ''}`}
            </Button>
            {loginError && (
              <FetchError error={loginError} cssClass={styles.loginError} />
            )}
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
