export const getListOfUsers = (values) => {
    let list = [];
    values?.forEach((element) => {
      list.push(element.name);
    });
    return list;
  };