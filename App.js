import { StatusBar } from "expo-status-bar";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "./theme";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EvilIcons } from "@expo/vector-icons";

const STORAGE_KEY = "@toDos";

export default function App() {
  const [isWork, setWork] = useState(true);
  const work = () => setWork(true);
  const travel = () => setWork(false);
  const [toDos, setToDos] = useState({});
  const loadTodos = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      const obj = JSON.parse(value);
      setToDos(obj);
    } catch (e) {
      console("에러가 발생하였습니다.");
    }
  };
  const [inputText, setInputText] = useState("");
  const onChangeText = (payload) => {
    setInputText(payload);
  };

  const saveToDos = async (todos) => {
    try {
      const jsonValue = JSON.stringify(todos);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
      console("에러가 발생하였습니다.");
    }
  };
  const deleteToDo = (key) => {
    Alert.alert("Delete Todo", "Are you sure to delete Todo?", [
      {
        text: "delete",
        onPress: () => {
          const newToDos = { ...toDos };
          delete newToDos[key];
          setToDos(newToDos);
          saveToDos(newToDos);
        },
      },
      {
        text: "No",
        onPress: () => {
          return;
        },
      },
    ]);
  };

  useEffect(() => {
    // 마운트 될 때 실행
    loadTodos();
  }, []);

  const onSubmit = async () => {
    if (inputText === "") {
      alert("빈 값이 있습니다");
      return;
    }

    const newToDos = {
      ...toDos,
      [Date.now()]: { title: inputText, isWork },
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setInputText("");
  };
  // console.log(toDos);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{ ...styles.btnText, color: isWork ? "white" : theme.gray }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{ ...styles.btnText, color: !isWork ? "white" : theme.gray }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          onSubmitEditing={onSubmit}
          onChangeText={onChangeText}
          value={inputText}
          placeholder={
            isWork ? "Please write what to do" : "Let's write some plan"
          }
          style={styles.textInput}
        ></TextInput>
      </View>
      <ScrollView>
        {Object.keys(toDos).map((key) =>
          toDos[key].isWork === isWork ? (
            <View style={styles.todo} key={key}>
              <Text style={styles.todoText}>{toDos[key].title}</Text>
              <TouchableOpacity onPress={() => deleteToDo(key)}>
                <EvilIcons name="trash" size={24} color={theme.gray} />
              </TouchableOpacity>
            </View>
          ) : null
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
    color: "white",
  },
  textInput: {
    marginVertical: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 15,
  },
  todo: {
    backgroundColor: "gray",
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  todoText: {
    fontSize: 20,
    fontWeight: "500",
  },
});
