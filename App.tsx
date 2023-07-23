import React from "react";
import HomeScreen from "./screens/HomeScreen";
import ViewExpensesScreen from "./screens/ViewExpensesScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Despesas" component={ViewExpensesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
