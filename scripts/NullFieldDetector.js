export function NullFieldDetector(fieldName, field) {
  if (field === "" || field === null) {
    alert(`O campo ${fieldName} não foi preenchido corretamente.`);
    return true;
  } else {
    return false;
  }
}
