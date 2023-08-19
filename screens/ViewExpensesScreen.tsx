import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Transaction from "../interfaces/transaction.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const ViewExpensesScreen = () => {
  const [expenses, setExpenses] = useState([]);
  const [hasExpenses, setHasExpenses] = useState(false);
  const [month, setMonth] = useState("");

  useEffect(() => {
    const getExpenses = async () => {
      const keys = (await AsyncStorage.getAllKeys()) as unknown as string[];

      let dbExpenses: Transaction[] = [];

      keys.forEach(async (key) => {
        const expense = JSON.parse((await AsyncStorage.getItem(key)) as string);

        if (expense?.type === "Despesa") {
          dbExpenses.push({ ...expense, key });

          dbExpenses = dbExpenses.sort(
            (a: Transaction, b: Transaction) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          );

          //@ts-ignore
          setExpenses(dbExpenses);
          setHasExpenses(true);
        }
      });
    };

    getExpenses();
  }, []);

  const onDeleteItem = async (item: Transaction) => {
    await AsyncStorage.removeItem(item.key as string);
    const newExpenses = expenses.filter((e: Transaction) => e.key !== item.key);
    setExpenses(newExpenses);
  };

  //@ts-ignore
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemTitles}>R$ {item.value}</Text>
      <Text style={styles.itemTitles}>{item.description}</Text>
      <Text style={styles.itemSubtitle}>Categoria: {item.category}</Text>
      <Text style={styles.itemSubtitle}>
        {new Date(item.date).toLocaleString()}
      </Text>
      <TouchableOpacity
        style={styles.deleteIcon}
        onPress={() => onDeleteItem(item)}
      >
        <Icon name="trash" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={"Setembro"}
        style={styles.picker}
        // TODO continuar daque
        onValueChange={(itemValue) => setMonth(itemValue)}
      >
        <Picker.Item label="Agosto" value="Agosto" />
        <Picker.Item label="Setembro" value="Setembro" />
      </Picker>

      {hasExpenses ? (
        <FlatList
          data={expenses}
          renderItem={renderItem}
          keyExtractor={(item) => item.date}
        />
      ) : (
        <Text style={styles.emptyMessage}>Nada por aqui :)</Text>
      )}
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
  item: {
    backgroundColor: "#D3D3D3",
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
    width: 300,
  },
  itemTitles: {
    fontSize: 18,
  },
  itemSubtitle: {
    fontSize: 15,
    color: "#444",
  },
  deleteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  emptyMessage: {
    fontSize: 22,
  },
  picker: {
    width: "100%",
    height: 40,
  },
});

export default ViewExpensesScreen;
