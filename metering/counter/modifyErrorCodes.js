module.exports = (outcome, status, errorCodes) => {
  const statusString = String(status);
  if (outcome === 'failed' && !errorCodes.includes(statusString)) {
    if (statusString.startsWith('4')) {
      return '4XX';
    }
    return statusString.startsWith('5') ? '5XX' : 'error';
  }
  return statusString;
};
