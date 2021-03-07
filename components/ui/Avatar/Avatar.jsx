import MuiAvatar from '@material-ui/core/Avatar';

export default function Avatar({ url, name, ...rest }) {
  return (
    <MuiAvatar src={url} {...rest}>
      {extractAvatar(name)}
    </MuiAvatar>
  );
}

const extractAvatar = (username) => {
  const splittedName = username.split(' ');
  return (splittedName[0][0] + (splittedName[1] ? splittedName[1][0] : '')).toUpperCase();
};
