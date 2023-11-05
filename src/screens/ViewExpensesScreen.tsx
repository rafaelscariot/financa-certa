import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/FontAwesome";
import Transaction from "../interfaces/transaction.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ViewExpensesScreen = () => {
  const [expenses, setExpenses] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const [hasExpenses, setHasExpenses] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("Filtrar por mês");

  const getExpenses = async () => {
    const keys = (await AsyncStorage.getAllKeys()) as string[];

    let dbExpenses: Transaction[] = [];

    keys.forEach(async (key) => {
      const expense = JSON.parse((await AsyncStorage.getItem(key)) as string);

      if (expense?.type === "Despesa") {
        dbExpenses.push({ ...expense, key });

        dbExpenses = dbExpenses.sort(
          (a: Transaction, b: Transaction) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setHasExpenses(true);
        setExpenses(dbExpenses);
        setAllExpenses(dbExpenses);
      }
    });
  };

  useEffect(() => {
    getExpenses();
  }, []);

  const onExpensesFilter = (month: string) => {
    if (month === "Filtrar por mês") {
      setExpenses(allExpenses);
      setHasExpenses(true);
      return;
    }

    const months = {
      Janeiro: 0,
      Fevereiro: 1,
      Março: 2,
      Abril: 3,
      Maio: 4,
      Junho: 5,
      Julho: 6,
      Agosto: 7,
      Setembro: 8,
      Outubro: 9,
      Novembro: 10,
      Dezembro: 11,
    };

    const numericMonth = months[month];

    const filteredExpenses = allExpenses.filter((expense: Transaction) => {
      const date = new Date(expense.date);
      return date.getMonth() === numericMonth;
    });

    if (!filteredExpenses.length) {
      setHasExpenses(false);
    } else {
      setHasExpenses(true);
    }

    setExpenses(filteredExpenses);
  };

  const onDeleteItem = async (item: Transaction) => {
    await AsyncStorage.removeItem(item.key as string);
    const newExpenses = expenses.filter((e: Transaction) => e.key !== item.key);
    setExpenses(newExpenses);
    setAllExpenses(newExpenses);
  };

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
        selectedValue={selectedMonth}
        style={styles.picker}
        onValueChange={(itemValue) => {
          setSelectedMonth(itemValue);
          onExpensesFilter(itemValue);
        }}
      >
        <Picker.Item label="Filtrar por mês" value="Filtrar por mês" />
        <Picker.Item label="Janeiro" value="Janeiro" />
        <Picker.Item label="Fevereiro" value="Fevereiro" />
        <Picker.Item label="Março" value="Março" />
        <Picker.Item label="Abril" value="Abril" />
        <Picker.Item label="Maio" value="Maio" />
        <Picker.Item label="Junho" value="Junho" />
        <Picker.Item label="Julho" value="Julho" />
        <Picker.Item label="Agosto" value="Agosto" />
        <Picker.Item label="Setembro" value="Setembro" />
        <Picker.Item label="Outubro" value="Outubro" />
        <Picker.Item label="Novembro" value="Novembro" />
        <Picker.Item label="Dezembro" value="Dezembro" />
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
