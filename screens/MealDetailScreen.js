import { useLayoutEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/IconButton";

export default function MealDetailScreen({ route, navigation }) {
  const mealId = route.params.mealId;
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  const { duration, complexity, affordability } = selectedMeal;

  function headerButtonPressHandler() {
    console.log("Button clicked");
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            onPress={headerButtonPressHandler}
            icon="star"
            color="white"
          />
        );
      },
    });
  }, [navigation, headerButtonPressHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={duration}
        complexity={complexity}
        affordability={affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});
