export const MOCK_DATA = {
    user: {
        id: 'u1',
        name: 'Alex Wanderer',
        email: 'alex@globetrotter.io',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=b6e3f4',
        bio: 'Adventure seeker & coffee lover. 🌍 ✈️'
    },
    trips: [
        {
            id: 't1',
            name: 'Bali Bliss Retreat',
            coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80',
            startDate: '2024-04-10',
            endDate: '2024-04-20',
            location: 'Bali, Indonesia',
            budget: 2500,
            spent: 1200,
            currency: 'USD',
            status: 'upcoming',
            travelers: 2,
            itinerary: [
                {
                    date: '2024-04-10',
                    day: 1,
                    location: 'Ubud',
                    activities: [
                        { id: 'a1', title: 'Airport Pickup', type: 'transport', time: '10:00', cost: 30, completed: false },
                        { id: 'a2', title: 'Check-in at Maya Resort', type: 'lodging', time: '12:00', cost: 200, completed: false },
                        { id: 'a3', title: 'Monkey Forest Visit', type: 'activity', time: '15:00', cost: 15, completed: false }
                    ]
                }
            ]
        },
        {
            id: 't2',
            name: 'Parisian Spring',
            coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80',
            startDate: '2024-05-15',
            endDate: '2024-05-22',
            location: 'Paris, France',
            budget: 4000,
            spent: 0,
            currency: 'EUR',
            status: 'planning',
            travelers: 1,
            itinerary: []
        }
    ],
    recommended: [
        {
            id: 'r1',
            name: 'Kyoto Bloom',
            image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80',
            cost: 2200,
            days: 7
        },
        {
            id: 'r2',
            name: 'Iceland Adventure',
            image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=1000&q=80',
            cost: 3500,
            days: 10
        },
        {
            id: 'r3',
            name: 'Santorini Sunset',
            image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80',
            cost: 2800,
            days: 5
        }
    ]
};
