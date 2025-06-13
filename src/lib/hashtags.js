// Hashtag processing utilities
export const parseHashtags = (text) => {
  const hashtagRegex = /#[a-zA-Z0-9_]+/g;
  return text.replace(hashtagRegex, (match) =>
    `<span class="hashtag text-blue-500 font-medium hover:text-blue-600 cursor-pointer">${match}</span>`
  );
};

export const extractHashtags = (text) => {
  const hashtagRegex = /#[a-zA-Z0-9_]+/g;
  const matches = text.match(hashtagRegex);
  return matches ? matches.map(tag => tag.slice(1)) : [];
};

export const getPopularHashtags = () => {
  return [
    'bitlife', 'placement', 'coding', 'semester', 'hostel',
    'foodie', 'cultural', 'techfest', 'academics', 'friendship',
    'internship', 'projects', 'examination', 'library', 'sports'
  ];
};

export const renderHashtagText = (text) => {
  const parts = text.split(/(#[a-zA-Z0-9_]+)/g);
  return parts.map((part, index) => {
    if (part.startsWith('#')) {
      return (
        <span
          key={index}
          className="text-blue-500 font-medium hover:text-blue-600 cursor-pointer transition-colors"
          onClick={() => {
            // Handle hashtag click - could navigate to hashtag page
            console.log('Clicked hashtag:', part);
          }}
        >
          {part}
        </span>
      );
    }
    return part;
  });
};
