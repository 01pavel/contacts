import { Grid } from '@material-ui/core';
import Routes from './Routes';
import styles from './App.module.css';

const App = () => (
  <Grid container className={styles.mainContainer}>
    <Routes />
  </Grid>
);

export default App;
