import React from 'react';

const JournalEntry: React.FC = () => {
  return (
    <div>
      <h1>New Journal Entry</h1>
      {/* Placeholder for entry form */}
      <textarea placeholder="Write your thoughts here..."></textarea>
      <button>Save Entry</button>
    </div>
  );
};

export default JournalEntry;
