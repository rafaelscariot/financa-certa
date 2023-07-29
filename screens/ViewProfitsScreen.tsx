import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Transaction from "../interfaces/transaction.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

const ViewProfitsScreen = () => {
  const [profits, setProfits] = useState([]);

  useEffect(() => {
    const getProfits = async () => {
      const keys = (await AsyncStorage.getAllKeys()) as unknown as string[];

      let dbProfits: Transaction[] = [];

      keys.forEach(async (key) => {
        const profit = JSON.parse((await AsyncStorage.getItem(key)) as string);

        if (profit?.type === "Ganho") {
          dbProfits.push({ ...profit, key });

          dbProfits = dbProfits.sort(
            (a: Transaction, b: Transaction) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          );

          //@ts-ignore
          setProfits(dbProfits);
        }
      });
    };

    getProfits();
  }, []);

  const onDeleteItem = async (item: Transaction) => {
    await AsyncStorage.removeItem(item.key as string);
    const newProfits = profits.filter((e: Transaction) => e.key !== item.key);
    setProfits(newProfits);
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
      {profits.length > 1 ? (
        <FlatList
          data={profits}
          renderItem={renderItem}
          keyExtractor={(item) => item.date}
        />
      ) : (
        <Text style={styles.emptyMessage}>Sem ganhos por enquanto</Text>
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
});

export default ViewProfitsScreen;
