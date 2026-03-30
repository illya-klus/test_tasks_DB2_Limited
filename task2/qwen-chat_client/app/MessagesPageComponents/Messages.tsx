import { View, FlatList, StyleSheet, useColorScheme, Text } from 'react-native';
import { Colors, Fonts } from '../../constants/theme';
import { Message, Typings } from '..';
import { forwardRef } from 'react';
import { formatMessageText } from '../../utils/formatMessage';

type Props = {
  messages: Message[];
  isTyping?: Typings;
};

const Messages = forwardRef<FlatList, Props>(({ messages, isTyping }, ref) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || 'light'];

  return (
    <FlatList
      ref={ref}
      data={messages}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={{ padding: 12 }}
      renderItem={({ item }) => <MessageItem item={item} />}
      ListFooterComponent={
        isTyping === 'type' ? (
          <View style={[styles.message, { alignSelf: 'flex-start', backgroundColor: '#eee' }]}>
            <Text style={{ fontStyle: 'italic', fontFamily: Fonts.sans, color: theme.icon }}>
              Бот друкує...
            </Text>
          </View>
        ) : null
      }
    />
  );
});

const MessageItem = ({ item }: { item: Message }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || 'light'];

  return (
    <View
      style={[
        styles.message,
        {
          backgroundColor: item.isUser ? theme.tint : theme.background,
          alignSelf: item.isUser ? 'flex-end' : 'flex-start',
        },
      ]}
    >
      <Text style={{ fontSize: 16, fontFamily: Fonts.sans, color: item.isUser ? '#fff' : theme.text }}>
        {item.isUser ? item.text : formatMessageText(item.text)}
      </Text>
    </View>
  );
};

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