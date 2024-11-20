export const mockSalesRep = {
  id: '1',
  name: 'Bryan Jurry',
  title: 'Metal Solutions Consultant',
  avatarUrl: 'https://videochat.strongprompt.ai/Brayan.PNG',
  calendlyUrl: 'https://calendly.com/bryan-jurries/30min',
  availability: true,
};

export const mockRagResponses = {
  'pricing': 'Our pricing starts at $49/month for the basic plan. Enterprise plans are custom-priced based on needs.',
  'features': 'Key features include video messaging, live chat, calendar integration, and AI-powered responses.',
  'default': 'I can help you with information about our product, pricing, or schedule a call with our team.',
};

export const fetchSalesRep = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockSalesRep;
};

export const getRagResponse = async (query: string) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  const normalizedQuery = query.toLowerCase();
  
  if (normalizedQuery.includes('price') || normalizedQuery.includes('cost')) {
    return mockRagResponses.pricing;
  }
  if (normalizedQuery.includes('feature') || normalizedQuery.includes('what')) {
    return mockRagResponses.features;
  }
  return mockRagResponses.default;
};