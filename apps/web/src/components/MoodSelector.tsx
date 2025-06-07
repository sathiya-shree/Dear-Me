'use client';

import { useState } from 'react';

const moods = [
  { emoji: '😊', label: 'Happy', color: 'from-yellow-200 to-yellow-400' },
  { emoji: '😐', label: 'Neutral', color: 'from-gray-200 to-gray-400' },
  { emoji: '😢', label: 'Sad', color: 'from-blue-200 to-blue-400' },
  { emoji: '😡', label: 'Angry', color: 'from-red-300 to-red-500' },
  { emoji: '🥰', label: 'Loved', color: 'from-pink-200 to-pink-400' },
];

export default function MoodSelector({
  onMoodChange,
  onMoodSelect,
}: {
  onMoodChange: (color: string) => void;
  onMoodSelect: () => void;
}) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleSelect = (moodColor: string) => {
    setSelectedMood(moodColor);
    onMoodChange(moodColor);
    onMoodSelect(); // Signal that a mood was chosen
  };

  return (
    <div className="flex gap-4 mt-6">
      {moods.map((mood) => (
        <button
          key={mood.label}
          className={`text-3xl hover:scale-125 transition ${selectedMood === mood.color ? 'scale-125' : ''}`}
          onClick={() => handleSelect(mood.color)}
          title={mood.label}
        >
          {mood.emoji}
        </button>
      ))}
    </div>
  );
}
