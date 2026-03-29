import { KeyboardAvoidingView, Platform, StyleSheet, useColorScheme } from 'react-native';
import { useState } from 'react';
import { Colors, Fonts } from '../constants/theme'; 
import Messages from './Messages';
import Input from './Input';

export type Message = {
  text: string; 
  isUser: boolean
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const colorScheme = useColorScheme(); 
  const theme = Colors[colorScheme || 'light'];

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, isUser: true }]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [...prev, { text: `Бот відповідає: ${input}`, isUser: false }]);
    }, 500);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >

      <Messages messages={messages}/>
      <Input sendMessage={sendMessage} input={input} setInput={setInput}/>
      
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});