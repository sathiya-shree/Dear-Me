'use client';

import { useEffect, useState } from 'react';

type JournalEntry = {
  date: string;
  text: string;
};

export default function JournalBox() {
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

  useEffect(() => {
    const saved = localStorage.getItem('journal-entries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    if (!entry.trim()) return;

    const updatedEntries = [
      ...entries.filter(e => e.date !== today), // replace today's entry
      { date: today, text: entry }
    ];
    localStorage.setItem('journal-entries', JSON.stringify(updatedEntries));
    setEntries(updatedEntries);
    setEntry('');
  };

  return (
    <div className="mt-8 w-full max-w-xl">
      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="Write your thoughts here..."
        rows={8}
        className="w-full p-4 rounded-xl border border-gray-300 shadow-md text-lg resize-none bg-white bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        onClick={handleSave}
        className="mt-3 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Save Entry
      </button>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">📚 Past Entries</h2>
        {entries
          .sort((a, b) => b.date.localeCompare(a.date))
          .map((e) => (
            <div key={e.date} className="mb-4 p-4 rounded-lg bg-white bg-opacity-70 shadow">
              <p className="text-sm font-medium text-gray-600">{e.date}</p>
              <p className="mt-1 text-gray-800 whitespace-pre-wrap">{e.text}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
