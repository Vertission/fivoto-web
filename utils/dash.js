export const extractAvatar = (username) => {
  const splittedName = username.split(' ');
  return (splittedName[0][0] + (splittedName[1] ? splittedName[1][0] : '')).toUpperCase();
};
