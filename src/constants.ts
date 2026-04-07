export interface Influencer {
  id: number;
  name: string;
  handle: string;
  followers: string;
  engagement: string;
  avatar: string;
}

export interface TrendAlert {
  id: number;
  topic: string;
  source: 'Twitter' | 'TikTok' | 'WhatsApp' | 'Instagram';
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  velocity: string;
  reach: string;
  status: 'Active' | 'Emerging' | 'Fading';
  image: string;
  description: string;
  region: string;
  influencers?: Influencer[];
}

export const initialAlerts: TrendAlert[] = [
  { 
    id: 1, 
    topic: '#DettyDecember', 
    source: 'Twitter', 
    sentiment: 'Positive', 
    velocity: '+85%', 
    reach: '2.4M', 
    status: 'Active', 
    image: 'https://picsum.photos/seed/detty/600/400', 
    description: 'Annual holiday trend focusing on events, concerts, and nightlife in Lagos and Accra.',
    region: 'West Africa',
    influencers: [
      { id: 1, name: 'Tunde Ednut', handle: '@tundeednut', followers: '5.2M', engagement: 'High', avatar: 'https://i.pravatar.cc/150?u=tunde' },
      { id: 2, name: 'Don Jazzy', handle: '@donjazzy', followers: '8.1M', engagement: 'Extreme', avatar: 'https://i.pravatar.cc/150?u=jazzy' },
      { id: 3, name: 'Lagos Life', handle: '@lagoslife', followers: '450K', engagement: 'High', avatar: 'https://i.pravatar.cc/150?u=lagoslife' }
    ]
  },
  { 
    id: 2, 
    topic: 'TikTok Dance Challenge: "Ojapiano"', 
    source: 'TikTok', 
    sentiment: 'Positive', 
    velocity: '+120%', 
    reach: '5.1M', 
    status: 'Active', 
    image: 'https://picsum.photos/seed/dance/600/400', 
    description: 'Viral dance challenge using the latest Amapiano-Flute fusion track.',
    region: 'Nigeria',
    influencers: [
      { id: 4, name: 'Liquorose', handle: '@liquorose', followers: '3.5M', engagement: 'Extreme', avatar: 'https://i.pravatar.cc/150?u=liquor' },
      { id: 5, name: 'Poco Lee', handle: '@pocolee', followers: '4.2M', engagement: 'High', avatar: 'https://i.pravatar.cc/150?u=poco' }
    ]
  },
  { 
    id: 3, 
    topic: 'Fuel Subsidy Debates', 
    source: 'Twitter', 
    sentiment: 'Negative', 
    velocity: '+45%', 
    reach: '1.2M', 
    status: 'Emerging', 
    image: 'https://picsum.photos/seed/fuel/600/400', 
    description: 'Rising conversations regarding economic policies and their impact on local businesses.',
    region: 'Nigeria',
    influencers: [
      { id: 6, name: 'Channels TV', handle: '@channelstv', followers: '6.2M', engagement: 'High', avatar: 'https://i.pravatar.cc/150?u=channels' },
      { id: 7, name: 'Arise News', handle: '@arisenews', followers: '2.1M', engagement: 'High', avatar: 'https://i.pravatar.cc/150?u=arise' }
    ]
  },
  { 
    id: 4, 
    topic: 'WhatsApp Viral: "New Year Promo"', 
    source: 'WhatsApp', 
    sentiment: 'Neutral', 
    velocity: '+30%', 
    reach: '800K', 
    status: 'Emerging', 
    image: 'https://picsum.photos/seed/promo/600/400', 
    description: 'Chain messages circulating about various retail discounts and promotions.',
    region: 'Lagos',
    influencers: [
      { id: 8, name: 'Promo King', handle: '@promoking', followers: '120K', engagement: 'Moderate', avatar: 'https://i.pravatar.cc/150?u=promo' }
    ]
  },
  { 
    id: 5, 
    topic: 'Afrobeats Global Tour', 
    source: 'Instagram', 
    sentiment: 'Positive', 
    velocity: '+15%', 
    reach: '3.5M', 
    status: 'Fading', 
    image: 'https://picsum.photos/seed/tour/600/400', 
    description: 'Recap of major international performances by Nigerian artists.',
    region: 'Global',
    influencers: [
      { id: 9, name: 'Wizkid', handle: '@wizkidayo', followers: '18.2M', engagement: 'Extreme', avatar: 'https://i.pravatar.cc/150?u=wiz' },
      { id: 10, name: 'Burna Boy', handle: '@burnaboy', followers: '15.4M', engagement: 'Extreme', avatar: 'https://i.pravatar.cc/150?u=burna' }
    ]
  },
];

export interface SocialSignal {
  id: number;
  platform: 'Twitter' | 'TikTok' | 'WhatsApp';
  author: string;
  content: string;
  engagement: string;
  likes: number;
  shares: number;
  comments: number;
  totalEngagement: number;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  sentimentScore: number;
  timestamp: string;
  avatar: string;
}

export const initialSignals: SocialSignal[] = [
  {
    id: 1,
    platform: 'Twitter',
    author: '@LagosVibes',
    content: 'The energy at the concert last night was unmatched! #DettyDecember is officially here.',
    engagement: '12.4K',
    likes: 8500,
    shares: 2400,
    comments: 1500,
    totalEngagement: 12400,
    sentiment: 'Positive',
    sentimentScore: 92,
    timestamp: '2m ago',
    avatar: 'https://i.pravatar.cc/150?u=lagos'
  },
  {
    id: 2,
    platform: 'TikTok',
    author: 'DanceQueen_NG',
    content: 'Finally mastered the #Ojapiano challenge! Who wants a tutorial? 💃🏾',
    engagement: '45.2K',
    likes: 32000,
    shares: 8200,
    comments: 5000,
    totalEngagement: 45200,
    sentiment: 'Positive',
    sentimentScore: 88,
    timestamp: '15m ago',
    avatar: 'https://i.pravatar.cc/150?u=dance'
  },
  {
    id: 3,
    platform: 'WhatsApp',
    author: 'Forwarded Many Times',
    content: 'Check out this new promo code for 50% off your next ride! Valid until midnight.',
    engagement: 'Viral',
    likes: 0,
    shares: 15000,
    comments: 0,
    totalEngagement: 15000,
    sentiment: 'Neutral',
    sentimentScore: 50,
    timestamp: '1h ago',
    avatar: 'https://i.pravatar.cc/150?u=wa'
  }
];

export interface Campaign {
  id: number;
  name: string;
  trend: string;
  status: 'Active' | 'Scheduled' | 'Completed';
  spend: string;
  roi: string;
  reach: string;
}

export const initialCampaigns: Campaign[] = [
  { id: 1, name: 'Holiday Glow-up', trend: '#DettyDecember', status: 'Active', spend: '$4,500', roi: '3.2x', reach: '450K' },
  { id: 2, name: 'Ojapiano Contest', trend: 'Ojapiano Challenge', status: 'Active', spend: '$2,800', roi: '4.5x', reach: '890K' },
  { id: 3, name: 'Tech Talent Hunt', trend: 'Lagos Tech Week', status: 'Scheduled', spend: '$1,200', roi: '-', reach: '-' },
];
