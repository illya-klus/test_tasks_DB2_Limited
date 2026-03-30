import { FlatList, KeyboardAvoidingView, Platform, Role, StyleSheet, useColorScheme } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Colors } from '../constants/theme'; 
import Messages from './MessagesPageComponents/Messages';
import Input from './MessagesPageComponents/Input';
import { sendToGeminiWithContext } from './MessagesPageAPI/QwenApi';


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
  
    // Додаємо повідомлення користувача
    setMessages(prev => [...prev, { text: input, isUser: true }]);
    setInput('');
    setTyping('type');
  
    // Формуємо масив для API
    const geminiMessages = messages.map(msg => ({
      role: msg.isUser ? "user" as const : "assistant" as const, // <-- привід до Role
      content: msg.text
    }));
  
    // Додаємо нове повідомлення користувача
    geminiMessages.push({ role: "user" as const, content: input });
  
    // Викликаємо API
    const ans = await sendToGeminiWithContext(geminiMessages);
  
    // Додаємо відповідь бота
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