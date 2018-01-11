export default function updateObjectInArray(array, newValue) {
  const position = array.findIndex(e => e._id === newValue._id);
  return array.map((item, index) => {
    if (index !== position) {
      return item;
    }

    return {
      ...item,
      ...newValue,
    };
  });
}
