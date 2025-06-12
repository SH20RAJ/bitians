// Mention processing utilities
export const parseMentions = (text) => {
  const mentionRegex = /@[a-zA-Z0-9_]+/g;
  return text.replace(mentionRegex, (match) =>
    `<span class="mention text-indigo-500 font-medium hover:text-indigo-600 cursor-pointer">${match}</span>`
  );
};

export const extractMentions = (text) => {
  const mentionRegex = /@[a-zA-Z0-9_]+/g;
  const matches = text.match(mentionRegex);
  return matches ? matches.map(mention => mention.slice(1)) : [];
};

export const renderMentionText = (text) => {
  const parts = text.split(/(@[a-zA-Z0-9_]+)/g);
  return parts.map((part, index) => {
    if (part.startsWith('@')) {
      return (
        <span 
          key={index} 
          className="text-indigo-500 font-medium hover:text-indigo-600 cursor-pointer transition-colors"
          onClick={() => {
            // Handle mention click - could navigate to user profile
            console.log('Clicked mention:', part);
          }}
        >
          {part}
        </span>
      );
    }
    return part;
  });
};

export const getSuggestedUsers = () => {
  return [
    { username: 'arjun_sharma', name: 'Arjun Sharma', kBatch: 'K23' },
    { username: 'priya_mehta', name: 'Priya Mehta', kBatch: 'K22' },
    { username: 'rahul_singh', name: 'Rahul Singh', kBatch: 'K21' },
    { username: 'neha_gupta', name: 'Neha Gupta', kBatch: 'K24' },
    { username: 'amit_kumar', name: 'Amit Kumar', kBatch: 'K23' },
  ];
};
