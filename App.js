import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "./theme";
import { useState } from "react";

export default function App() {
  const [isWork, setWork] = useState(true);
  const work = () => setWork(true);
  const travel = () => setWork(false);
  const [toDos, setToDos] = useState({});
  const [inputText, setInputText] = useState("");
  const onChangeText = (payload) => {
    setInputText(payload);
  };
  const onSubmit = () => {
    if (inputText === "") {
      alert("빈 값이 있습니다");
      return;
    }

    // 다른 방법
    // const newToDos = Object.assign({}, toDos, {
    //   [Date.now()]: { title: inputText, work: isWork },
    // });
    const newToDos = {
      ...toDos,
      [Date.now()]: { title: inputText, isWork },
    };
    setToDos(newToDos);

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
          toDos[key].isWork=== isWork ? (
            <View style={styles.todo} key={key}>
              <Text style={styles.todoText}>{toDos[key].title}</Text>
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
  },
  todoText: {
    fontSize: 20,
    fontWeight: "500",
  },
});
