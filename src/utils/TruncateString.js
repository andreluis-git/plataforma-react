// eslint-disable-next-line no-unused-vars
function Truncate(str, length) {
  if (str && str.length > length) {
    return str.slice(0, length) + "...";
  } else return str;
}

export default Truncate;
