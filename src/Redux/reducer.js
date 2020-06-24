const initialState = {
  formData: [],
};

//Reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NEW_FORM":
      const { name, age, gender, phone, email } = action.form;
      return {
        ...state,
        formData: state.formData.concat({
          key: Math.random().toString(),
          name: name,
          age: age,
          gender: gender,
          phone: phone,
          email: email,
        }),
      };
    case "DELETE_FORM":
      return {
        ...state,
        formData: state.formData.filter((item) => item.key !== action.key),
      };
    default:
      return state;
  }
};

export default rootReducer;
