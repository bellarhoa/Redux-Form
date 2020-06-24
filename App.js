import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ListPage from "./src/listPage";
import DetailsPage from "./src/detailsPage";
import NewFormPage from "./src/newFormPage";
import editFormPage from "./src/editFormPage";
import { Provider } from "react-redux";
import store from "./src/Redux/store";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Beranda">
          <Stack.Screen name="Beranda" component={ListPage} />
          <Stack.Screen name="Detail" component={DetailsPage} />
          <Stack.Screen name="Formulir Baru" component={NewFormPage} />
          <Stack.Screen name="Edit Formulir" component={editFormPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
