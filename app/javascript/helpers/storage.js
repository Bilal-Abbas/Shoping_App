export default {
  set: (key, value) => {
    return localStorage.setItem(key, value);
  },
  get: (key) => {
    let json = localStorage.getItem(key);
    return json ? JSON.parse(json) : null;
  },
  remove: (key) => {
    return localStorage.setItem(key, null);
  },
};
