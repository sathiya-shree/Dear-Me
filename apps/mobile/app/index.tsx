import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState<{ date: string; text: string }[]>([]);

  const handleUnlock = () => {
    if (password.toLowerCase() === 'calm' || password.toLowerCase() === 'joy') {
      setUnlocked(true);
    } else {
      alert('Wrong password or mood');
    }
  };

  const handleSave = () => {
    const date = new Date().toLocaleString();
    setEntries([{ date, text: entry }, ...entries]);
    setEntry('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌈 Dear Me</Text>

      {!unlocked ? (
        <>
          <Text style={styles.label}>Enter mood to unlock (e.g., calm, joy):</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter mood..."
            style={styles.input}
          />
          <Button title="Unlock" onPress={handleUnlock} />
        </>
      ) : (
        <>
          <Text style={styles.label}>Write your journal:</Text>
          <TextInput
            value={entry}
            onChangeText={setEntry}
            placeholder="Start writing..."
            multiline
            style={[styles.input, { height: 100 }]}
          />
          <Button title="Save Entry" onPress={handleSave} />

          <Text style={styles.label}>📖 Past Entries:</Text>
          {entries.map((e, index) => (
            <View key={index} style={styles.entry}>
              <Text style={styles.date}>{e.date}</Text>
              <Text>{e.text}</Text>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 50 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, color: '#8e44ad' },
  label: { marginBottom: 8, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  entry: {
    backgroundColor: '#f6f6f6',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
});
