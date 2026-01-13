import type { Plan, User, CatalogFile, SearchResult, UsageData, TeamMember } from './types';

export const pricingPlans: Plan[] = [
  {
    id: 'plan-basic',
    name: 'Basic',
    price: 49,
    description: 'For small businesses getting started.',
    features: [
      '10,000 API requests/day',
      'Up to 1,000 products',
      'CSV/JSON Upload',
      'Community Support',
    ],
    limits: {
      apiRequests: 10000,
    },
  },
  {
    id: 'plan-pro',
    name: 'Pro',
    price: 199,
    description: 'For growing businesses with increasing demand.',
    features: [
      '100,000 API requests/day',
      'Up to 50,000 products',
      'Real-time indexing',
      'Email & Chat Support',
    ],
    isPopular: true,
    limits: {
      apiRequests: 100000,
    },
  },
  {
    id: 'plan-enterprise',
    name: 'Enterprise',
    price: 'custom',
    description: 'For large-scale applications requiring maximum power.',
    features: [
      'Unlimited API requests',
      'Unlimited products',
      'Dedicated Infrastructure',
      '24/7 Priority Support',
    ],
    limits: {
      apiRequests: 1000000, // Using a high number for "unlimited"
    },
  },
];

export const mockUser: User = {
  id: 'user-123',
  name: 'Alice Martin',
  email: 'alice@example.com',
  businessName: 'Alice\'s Widgets Inc.',
  avatarUrl: 'https://picsum.photos/seed/avatar1/100/100',
  plan: pricingPlans[1], // Pro plan
};

export const mockTeamMembers: TeamMember[] = [
    { id: 'user-123', name: 'Alice Martin', email: 'alice@example.com', avatarUrl: 'https://picsum.photos/seed/avatar1/100/100', role: 'Admin' },
    { id: 'user-456', name: 'Bob Lee', email: 'bob@example.com', avatarUrl: 'https://picsum.photos/seed/avatar2/100/100', role: 'Developer' },
    { id: 'user-789', name: 'Charlie Green', email: 'charlie@example.com', avatarUrl: 'https://picsum.photos/seed/avatar3/100/100', role: 'Viewer' },
];

export const mockCatalogFiles: CatalogFile[] = [
  { id: 'cat-1', name: 'products_fall2024.csv', uploadedAt: new Date('2024-07-20T10:00:00Z'), status: 'Validated', size: '2.5 MB' },
  { id: 'cat-2', name: 'inventory_update.json', uploadedAt: new Date('2024-07-18T14:30:00Z'), status: 'Validated', size: '1.1 MB' },
  { id: 'cat-3', name: 'summer_sale_items.csv', uploadedAt: new Date('2024-06-05T09:00:00Z'), status: 'Error', size: '500 KB' },
];

export const mockSearchResults: SearchResult[] = [
  { id: 'prod-1', title: 'Modern Wireless Keyboard', description: 'A sleek and silent keyboard for modern workstations.', price: 79.99, imageUrl: 'https://picsum.photos/seed/product1/400/300', imageHint: 'modern keyboard' },
  { id: 'prod-2', title: 'Ergonomic Office Chair', description: 'Supports your back for long working hours.', price: 249.99, imageUrl: 'https://picsum.photos/seed/product2/400/300', imageHint: 'office chair' },
  { id: 'prod-3', title: '4K Ultra-Wide Monitor', description: 'Immerse yourself in stunning visuals.', price: 699.99, imageUrl: 'https://picsum.photos/seed/product3/400/300', imageHint: 'computer monitor' },
  { id: 'prod-4', title: 'Noise-Cancelling Headphones', description: 'Focus on your work or music without distractions.', price: 199.99, imageUrl: 'https://picsum.photos/seed/product4/400/300', imageHint: 'headphones' },
];

export const mockApiUsage: UsageData[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toISOString().split('T')[0],
    requests: Math.floor(Math.random() * (60000 - 20000 + 1)) + 20000,
  };
});
