import { View, Text, StyleSheet, Pressable } from "react-native";
import GlobalStyle from "../utils/GlobalStyle";

interface ListEmptyProps {
    onPress: () => void;
}

const ListEmpty = ({onPress} : ListEmptyProps) => {

    const handleClick = () => {
        onPress();
    };

    return (
        <View>
        <Pressable onPress={handleClick}>
          <Text style={{ fontSize: 16, paddingHorizontal: 12,  marginTop:10 }} >
            Odświez
          </Text>
        </Pressable>
        <Text>Brak danych </Text>
      </View>
    )
};

const styles = StyleSheet.create({
    
  });

export default ListEmpty;