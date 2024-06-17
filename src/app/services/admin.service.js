export function updateData(data, dataId, editedDataDictionary) {
  let currentData = data.find((data) => data.id === dataId);
  editedDataDictionary.map((editedData) => {
    const keys = editedData.id.split(".");
    let nestedObject = currentData.content;

    for (let i = 0; i < keys.length - 1; i++) {
      nestedObject = nestedObject[keys[i]];
    }
    nestedObject[keys[keys.length - 1]] = editedData.value;
  });
  return currentData;
}
