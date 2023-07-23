import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

interface ViewExpensesScreenProps {
  navigation: any;
}

const ViewExpensesScreen: React.FC<ViewExpensesScreenProps> = ({
  navigation,
}) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Visualizar Despesas</Text>
      {/* Aqui você pode adicionar o conteúdo da tela para exibir as despesas */}
      <Pressable style={styles.goBackButton} onPress={handleGoBack}>
        <Text style={styles.goBackButtonText}>Voltar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  goBackButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 8,
  },
  goBackButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
});

export default ViewExpensesScreen;
