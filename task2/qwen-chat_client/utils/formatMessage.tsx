// utils/formatMessage.ts
import { Text, View } from 'react-native';
import { Fonts } from '../constants/theme';
import React from 'react';

/**
 * Прості markdown-позначки:
 * ### - заголовок
 * **bold** - жирний
 * *italic* - курсив
 */

export function formatMessageText(text: string) {
  // Розбиваємо по рядках
  const lines = text.split('\n');

  return lines.map((line, index) => {
    // Заголовок
    if (line.startsWith('### ')) {
      return (
        <Text key={index} style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 2 }}>
          {'\n\n' + line.replace('### ', '') + "\n"}
        </Text>
      );
    }

    // Жирний
    if (/\*\*(.*?)\*\*/.test(line)) {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <Text key={index}>
          {"\n"}
          {parts.map((part, i) =>
            /\*\*(.*?)\*\*/.test(part) ? (
              <Text key={i} style={{ fontWeight: 'bold' }}>
                {part.replace(/\*\*/g, '')}
              </Text>
            ) : (
              <Text key={i}>{part}</Text>
            )
          )}
        </Text>
      );
    }

    // Курсив
    if (/\*(.*?)\*/.test(line)) {
      const parts = line.split(/(\*.*?\*)/g);
      return (
        <Text key={index}>
          {parts.map((part, i) =>
            /\*(.*?)\*/.test(part) ? (
              <Text key={i} style={{ fontStyle: 'italic' }}>
                {part.replace(/\*/g, '')}
              </Text>
            ) : (
              <Text key={i}>{part}</Text>
            )
          )}
        </Text>
      );
    }

    // Просто рядок
    return (
      <Text key={index} style={{ marginVertical: 1 }}>
        {line}
      </Text>
    );
  });
}