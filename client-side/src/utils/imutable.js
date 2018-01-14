export default function updateObjectInArray(array, newValue) {
  const position = array.findIndex(e => e.id === newValue.id);
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
