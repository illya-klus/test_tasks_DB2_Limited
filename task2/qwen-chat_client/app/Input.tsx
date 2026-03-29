import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, useColorScheme } from "react-native";
import { Colors, Fonts } from '../constants/theme'; 
import sendIcon from '../assets/send-white-icon.png';

type Props = {
    input: string;
    setInput : (text: string) => void;
    sendMessage: () => void;
};


const Input = ({input, setInput, sendMessage} : Props) => {
    const colorScheme = useColorScheme(); 
    const theme = Colors[colorScheme || 'dark'];

    return (
      <View style={[styles.inputContainer, { borderTopColor: theme.icon, backgroundColor: theme.background }]}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Напиши повідомлення..."
          placeholderTextColor={theme.icon}
          style={[
            styles.input,
            {
              fontFamily: Fonts.sans,
              color: theme.text,
            },
          ]}
        />
        <TouchableOpacity onPress={sendMessage} style={[styles.sendButton, { backgroundColor: theme.tint }]}>
          <Text style={styles.sendText}>
            <Image source={sendIcon} style={{ width: 16, height: 16 }} />
          </Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    marginBottom:25,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 8,
    fontSize: 18,
  },
  sendButton: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 20 },
  sendText: { color: '#fff', fontWeight: 'bold', padding: 2 },
});

export default Input;