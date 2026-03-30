import { View, Text,  StyleSheet, FlatList, useColorScheme } from 'react-native';
import { Colors, Fonts } from '../../constants/theme'; 
import { Message } from '..';


type Props = {
    messages : Message[];
    ref: React.Ref<FlatList>;
}

const Messages = ({messages, ref} : Props) => {

  return(
    <FlatList
        ref={ref}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (<MessageItem item={item} />)}
    />
  );
}

const MessageItem = ({item} : {item : Message}) => {
  const colorScheme = useColorScheme(); 
  const theme = Colors[colorScheme || 'light'];

  return(
    <View
      style={[
        styles.message,
        {
          backgroundColor: item.isUser ? theme.tint : theme.background,
          alignSelf: item.isUser ? 'flex-end' : 'flex-start',
        },
      ]}
    >
      <Text
        style={{
          color: item.isUser ? '#fff' : theme.text,
          fontSize: 16,
          fontFamily: Fonts.sans,
        }}
      >
        {item.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    message: {
        padding: 12,
        marginVertical: 6,
        borderRadius: 16,
        maxWidth: '75%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
});

export default Messages;