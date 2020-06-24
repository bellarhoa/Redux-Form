export const addForm = (name, age, gender, phone, email) => ({
  type: "ADD_NEW_FORM",
  form: {
    name,
    age,
    gender,
    phone,
    email,
  },
});

export const delForm = (key) => ({
  type: "DELETE_FORM",
  key: key,
});
