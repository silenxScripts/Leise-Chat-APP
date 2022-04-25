export default function getOtherEmail(list, user) {
  const check = (item) => {
    if (item == user) {
      return false;
    } else {
      return true;
    }
  };

  const result = list?.filter(check)[0]
  return result
}
