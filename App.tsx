import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Picker } from "@react-native-picker/picker";
import CurrencyInput from "react-native-currency-input";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  const [value, setValue] = useState();
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Supérfluo");

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.title}>Finança Certa 💸💰</Text>

      <Text style={styles.caption}>
        Registre suas despesas e não perca o controle de seus gastos mensais!
      </Text>

      <CurrencyInput
        style={styles.currencyInput}
        /* @ts-ignore */
        value={value}
        /* @ts-ignore */
        onChangeValue={setValue}
        placeholder="Valor"
      />

      <TextInput
        style={styles.descriptionInput}
        onChangeText={setDescription}
        value={description}
        placeholder="Descrição"
      />

      <Picker
        selectedValue={type}
        style={styles.picker}
        onValueChange={(pickerType) => setType(pickerType)}
      >
        <Picker.Item label="Supérfluo" value="Supérfluo" />
        <Picker.Item label="Essencial" value="Essencial" />
        <Picker.Item label="Importante" value="Importante" />
      </Picker>

      <Pressable
        onPress={() => console.log(value, description, type)}
        style={styles.button}
      >
        <Text style={styles.textButton}>Salvar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "50%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "black",
  },
  button: {
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: "black",
    width: 200,
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  picker: {
    width: 160,
  },
  descriptionInput: {
    height: 20,
    width: 180,
    margin: 10,
    textAlign: "center",
  },
  currencyInput: {
    height: 50,
  },
  caption: { textAlign: "center", marginTop: 10 },
});
