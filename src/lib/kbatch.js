// K-batch utility functions
export const getKBatch = (admissionYear) => {
  return `K${admissionYear.toString().slice(-2)}`;
};

export const getCurrentYear = (kBatch) => {
  const admissionYear = parseInt(`20${kBatch.slice(1)}`);
  const currentYear = new Date().getFullYear();
  return currentYear - admissionYear + 1;
};

export const getYearSuffix = (year) => {
  switch (year) {
    case 1: return '1st Year';
    case 2: return '2nd Year';
    case 3: return '3rd Year';
    case 4: return '4th Year';
    default: return `${year}th Year`;
  }
};

export const getKBatchColor = (kBatch) => {
  const colors = {
    'K24': 'bg-green-500', // Fresh Green - 1st Year
    'K23': 'bg-blue-500',  // Ocean Blue - 2nd Year
    'K22': 'bg-purple-500', // Royal Purple - 3rd Year
    'K21': 'bg-orange-500', // Golden Orange - 4th Year
    'K20': 'bg-red-500',   // Alumni Red
  };
  return colors[kBatch] || 'bg-gray-500';
};

export const getKBatchGradient = (kBatch) => {
  const gradients = {
    'K24': 'from-green-400 to-green-600',
    'K23': 'from-blue-400 to-blue-600',
    'K22': 'from-purple-400 to-purple-600',
    'K21': 'from-orange-400 to-orange-600',
    'K20': 'from-red-400 to-red-600',
  };
  return gradients[kBatch] || 'from-gray-400 to-gray-600';
};
