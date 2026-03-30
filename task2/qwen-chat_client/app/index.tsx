import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, useColorScheme } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Colors } from '../constants/theme'; 
import Messages from './MessagesPageComponents/Messages';
import Input from './MessagesPageComponents/Input';
import { sendToGemini } from './MessagesPageAPI/QwenApi';


export type Message = {
  text: string; 
  isUser: boolean
}

export type Typings = 'type' | 'none';

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const colorScheme = useColorScheme(); 
  const theme = Colors[colorScheme || 'light'];
  const flatListRef = useRef<FlatList>(null);
  const [isTyping, setTyping] = useState<Typings>('none');

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages([...messages, { text: input, isUser: true }]);
    setInput('');

    setTyping('type');
    let ans = await sendToGemini(input);
    setMessages(prev => [...prev, { text: ans, isUser: false }]);
    setTyping('none');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >

      <Messages messages={messages} ref={flatListRef} isTyping={isTyping} />
      <Input sendMessage={sendMessage} input={input} setInput={setInput}/>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});