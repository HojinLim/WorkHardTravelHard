import React from "react";
import { Text, View, TextInput } from "react-native";
import { globalStyles } from "./style/globalStyle";

const EditText = ({ title }) => {
  return (
    <View>
      <Text style={globalStyles.todoText}>{title}</Text>
    </View>
  );
};

export default EditText;
