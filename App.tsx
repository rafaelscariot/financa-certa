import React from "react";
import HomeScreen from "./src/screens/HomeScreen";
import ViewProfitsScreen from "./src/screens/ViewProfitsScreen";
import ViewExpensesScreen from "./src/screens/ViewExpensesScreen";
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
        <Stack.Screen name="Ganhos" component={ViewProfitsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
