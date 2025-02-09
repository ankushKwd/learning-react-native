import { View, Text } from "react-native";
import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../utils/database";

export default function AddPlace({ navigation }) {
  async function createPlaceHandler(place) {
    try {
      await insertPlace(place);
    } catch (error) {
      console.log(error);
    }
    navigation.navigate("AllPlaces");
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}
