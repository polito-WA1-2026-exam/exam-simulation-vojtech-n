export function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export function validateName(name) {
  if (!name) {
    return false;
  } else if (!/^[a-zA-Z]+$/.test(name)) {
    return false;
  } else {
    return true;
  }
};

export function validateString(inputString) {
  if (typeof inputString === 'string' || inputString instanceof String) {
    return true;
  } else {
    return false;
  }
};