import { Typography } from '@material-ui/core';

const FetchError = ({ error, cssClass }) => (
  <Typography className={cssClass || ''}>
    {(typeof error === 'string' ? error : error.message) ||
      'something went wrong'}
  </Typography>
);

export default FetchError;
