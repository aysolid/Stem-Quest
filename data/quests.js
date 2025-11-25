// Quest Data
const QUESTS = [
    {
        id: 'robot-navigator',
        title: 'Robot Navigator',
        description: 'Help the robot reach the charging station by creating a step-by-step algorithm',
        category: 'algorithm',
        difficulty: 'beginner',
        time: 20,
        xp: 120,
        scenario: 'The maintenance robot has run out of power! Guide it to the charging station.',
        activityType: 'sequencing',
        activity: {
            gridSize: { rows: 5, cols: 5 },
            robotStart: { x: 0, y: 0 },
            goal: { x: 4, y: 4 },
            obstacles: [
                { x: 1, y: 1 },
                { x: 2, y: 2 },
                { x: 3, y: 1 }
            ],
            solution: ['forward', 'forward', 'right', 'forward', 'forward', 'left', 'forward', 'forward']
        },
        hints: [
            'Try breaking the path into segments. What direction does the robot need to go first?',
            'The robot needs to move forward twice, then turn right.',
            'Solution: Forward, Forward, Turn Right, Forward, Forward, Turn Left, Forward, Forward'
        ]
    },
    {
        id: 'pattern-detective',
        title: 'Pattern Detective',
        description: 'Discover hidden patterns in data to unlock the vault',
        category: 'pattern',
        difficulty: 'beginner',
        time: 15,
        xp: 100,
        scenario: 'Dr. Chen\'s vault is locked! Find the pattern to unlock it.',
        activityType: 'pattern',
        activity: {
            patterns: [
                {
                    sequence: [3, 5, 7, 9, '?'],
                    answer: 11,
                    options: [10, 11, 12, 13]
                },
                {
                    sequence: ['🌸', '🌸🌸', '🌸🌸🌸', '?'],
                    answer: '🌸🌸🌸🌸',
                    options: ['🌸', '🌸🌸🌸🌸', '🌸🌸🌸🌸🌸', '🌸🌸']
                },
                {
                    sequence: [2, 4, 8, 16, '?'],
                    answer: 32,
                    options: [24, 28, 32, 36]
                }
            ]
        },
        hints: [
            'Look at how each number or group relates to the one before it.',
            'Pattern 1: Numbers go up by 2. Pattern 2: One more flower each time.',
            'Answers: 11, four flowers, 32'
        ]
    },
    {
        id: 'data-sorter',
        title: 'The Data Sorter',
        description: 'Organize messy library data by breaking it into categories',
        category: 'decompose',
        difficulty: 'beginner',
        time: 18,
        xp: 110,
        scenario: 'The library computer crashed! Help organize the data.',
        activityType: 'decomposition',
        activity: {
            categories: ['Books', 'Magazines', 'DVDs', 'Audiobooks'],
            items: [
                { name: 'Harry Potter Novel', category: 'Books' },
                { name: 'National Geographic', category: 'Magazines' },
                { name: 'Frozen 2', category: 'DVDs' },
                { name: 'Science Podcast', category: 'Audiobooks' }
            ]
        },
        hints: [
            'Think about what format each item is in.',
            'Items you read go in Books or Magazines. Movies in DVDs.',
            'Novels → Books, Magazines → Magazines, Movies → DVDs'
        ]
    }
];
