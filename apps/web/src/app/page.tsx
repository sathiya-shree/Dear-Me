'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [storedPassword, setStoredPassword] = useState<string | null>(null);
  const [inputPassword, setInputPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [journal, setJournal] = useState('');
  const [entries, setEntries] = useState<any[]>([]);
  const [mood, setMood] = useState('calm');

  useEffect(() => {
    const saved = localStorage.getItem('dearMePassword');
    if (saved) setStoredPassword(saved);

    const savedEntries = JSON.parse(localStorage.getItem('dearMeEntries') || '[]');
    setEntries(savedEntries);
  }, []);

  const handlePasswordSubmit = () => {
    if (!storedPassword) {
      localStorage.setItem('dearMePassword', inputPassword);
      setStoredPassword(inputPassword);
      setIsAuthenticated(true);
    } else if (inputPassword === storedPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleSave = () => {
    const date = new Date().toLocaleDateString();
    const newEntry = { text: journal, date, mood };
    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem('dearMeEntries', JSON.stringify(updated));
    setJournal('');
  };

  const moodColors: any = {
    happy: 'bg-yellow-200',
    sad: 'bg-blue-200',
    calm: 'bg-purple-100',
    anxious: 'bg-red-100',
    energetic: 'bg-green-200',
  };

  return (
    <main className={`min-h-screen p-8 ${moodColors[mood] || 'bg-white'} transition-all duration-300`}>
      <h1 className="text-4xl font-bold mb-6 text-center">🌈 Dear Me</h1>

      {!isAuthenticated ? (
        <div className="text-center">
          <p className="mb-4">{storedPassword ? 'Enter your password:' : 'Set your private password:'}</p>
          <input
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            onClick={handlePasswordSubmit}
            className="ml-4 bg-purple-500 text-white px-4 py-2 rounded"
          >
            Unlock
          </button>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="mb-4">
            <label className="block mb-2 font-medium">Select your mood:</label>
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="p-2 border rounded w-full"
            >
              <option value="calm">Calm</option>
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="anxious">Anxious</option>
              <option value="energetic">Energetic</option>
            </select>
          </div>

          <textarea
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            className="w-full h-32 p-2 border rounded mb-4"
            placeholder="Write something beautiful..."
          />

          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save Entry
          </button>

          <h2 className="text-2xl mt-8 mb-4">Your Entries</h2>
          <ul className="text-left">
            {entries.map((entry, index) => (
              <li key={index} className="border-b py-2">
                <strong>{entry.date} ({entry.mood})</strong><br />
                {entry.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
