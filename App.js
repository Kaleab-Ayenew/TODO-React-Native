import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";

//Component Imports

import Task from "./components/Task";

export default function App() {
  const [task, setTask] = React.useState();
  const [taskItems, setTaskItems] = React.useState([]);
  function handleAddTask() {
    if (!task) {
      return null;
    }
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask("");
  }

  function completeTask(index) {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }
  const renderedTasks = taskItems.map((item, i) => (
    <TouchableOpacity key={i} onPress={() => completeTask(i)}>
      <Task text={item} />
    </TouchableOpacity>
  ));
  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <View style={styles.items}>{renderedTasks}</View>
      </View>

      <KeyboardAvoidingView behavior="height" style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder={"Write a Task"}
          onChangeText={(text) => setTask(text)}
          value={task}
        />
        <TouchableNativeFeedback onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableNativeFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {},
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
});
