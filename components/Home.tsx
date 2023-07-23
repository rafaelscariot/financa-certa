import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, TextInput, StyleSheet, Text, Pressable } from "react-native";

interface ViewExpensesScreenProps {
  navigation: any;
}

const Home: React.FC<ViewExpensesScreenProps> = ({ navigation }) => {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Importante");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSave = async () => {
    if (!value || !description || !category) {
      setError("Preencha todos os campos antes de salvar");
      setTimeout(() => setError(""), 3000);
      return;
    }

    const newExpense = JSON.stringify({
      date: new Date().toLocaleDateString("pt-BR"),
      value,
      description,
      category,
    });

    console.log(`New expense to be saved: ${newExpense}`);

    try {
      const keys = (await AsyncStorage.getAllKeys()) as unknown as string[];

      if (keys.length === 0) {
        keys.push("0");
      }

      const lastKey = Number(keys[keys.length - 1]);
      const newKey = lastKey + 1;

      await AsyncStorage.setItem(String(newKey), newExpense);

      setValue("");
      setDescription("");
      setCategory("importante");
      setError("");

      setSuccessMessage("Despesa salva com sucesso");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error(`Error saving expense: ${JSON.stringify(error)}`);
      setError(`Erro ao salvar despesa: ${JSON.stringify(error)}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Finança Certa 💸</Text>

      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>
          Registre seus gastos diários, análise suas despesas e tenha a finança
          certa!
        </Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Informe o valor"
        value={value}
        onChangeText={setValue}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Informe a descrição"
        value={description}
        onChangeText={setDescription}
      />

      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Importante" value="Importante" />
        <Picker.Item label="Essencial" value="Essencial" />
        <Picker.Item label="Supérfluo" value="Supérfluo" />
      </Picker>

      {successMessage ? (
        <View style={styles.successMessageContainer}>
          <Text style={styles.successMessageText}>{successMessage}</Text>
        </View>
      ) : null}

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </Pressable>

      <Pressable
        style={styles.viewExpensesButton}
        onPress={() => navigation.navigate("Despesas")}
      >
        <Text style={styles.viewExpensesButtonText}>Visualizar despesas</Text>
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
    marginBottom: 8,
  },
  subtitleContainer: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  picker: {
    width: "100%",
    height: 40,
  },
  successMessageContainer: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  successMessageText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  errorContainer: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  errorText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  saveButton: {
    width: "100%",
    backgroundColor: "black",
    padding: 10,
    borderRadius: 8,
  },
  saveButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
  viewExpensesButton: {
    width: "100%",
    backgroundColor: "black",
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  viewExpensesButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
});

export default Home;
