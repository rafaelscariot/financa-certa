import React from "react";
import Home from "./components/Home";
import ViewExpensesScreen from "./components/ViewExpensesScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Despesas" component={ViewExpensesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
