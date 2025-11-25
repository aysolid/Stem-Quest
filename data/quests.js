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
                    type: 'arithmetic',
                    sequence: [3, 5, 7, 9, '?'],
                    answer: 11,
                    options: [10, 11, 12, 13],
                    hint: 'Each number increases by 2. What comes after 9?'
                },
                {
                    type: 'visual-sequence',
                    sequence: ['🌸', '🌸🌸', '🌸🌸🌸', '?'],
                    answer: '🌸🌸🌸🌸',
                    options: ['🌸', '🌸🌸🌸🌸', '🌸🌸🌸🌸🌸', '🌸🌸'],
                    hint: 'Each step adds one more flower. How many should be next?'
                },
                {
                    type: 'geometric',
                    sequence: [2, 4, 8, 16, '?'],
                    answer: 32,
                    options: [24, 28, 32, 36],
                    hint: 'Each number doubles! What is 16 × 2?'
                },
                {
                    type: 'alternating',
                    sequence: [1, 10, 2, 20, 3, 30, '?'],
                    answer: 4,
                    options: [4, 40, 5, 35],
                    hint: 'Look at every other number. One pattern adds 1, the other adds 10!'
                },
                {
                    type: 'missing-middle',
                    sequence: [5, 10, '?', 20, 25],
                    answer: 15,
                    options: [12, 13, 15, 17],
                    hint: 'This sequence increases by 5 each time. What fits in the middle?'
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
            categories: [
                { name: 'Books', icon: '📚', color: '#dbeafe' },
                { name: 'Magazines', icon: '📰', color: '#fef3c7' },
                { name: 'DVDs', icon: '📀', color: '#e0e7ff' },
                { name: 'Audiobooks', icon: '🎧', color: '#ccfbf1' }
            ],
            items: [
                { name: 'Harry Potter Novel', category: 'Books', icon: '📖' },
                { name: 'National Geographic', category: 'Magazines', icon: '📰' },
                { name: 'Frozen 2', category: 'DVDs', icon: '🎬' },
                { name: 'Science Podcast', category: 'Audiobooks', icon: '🎙️' },
                { name: 'Lord of the Rings', category: 'Books', icon: '📕' },
                { name: 'Time Magazine', category: 'Magazines', icon: '📑' },
                { name: 'The Lion King', category: 'DVDs', icon: '🎥' },
                { name: 'Mystery Stories', category: 'Audiobooks', icon: '🎧' },
                { name: 'Science Fiction Novel', category: 'Books', icon: '📘' },
                { name: 'Sports Weekly', category: 'Magazines', icon: '🗞️' },
                { name: 'Toy Story', category: 'DVDs', icon: '💿' },
                { name: 'History Tales', category: 'Audiobooks', icon: '🔊' }
            ]
        },
        hints: [
            'Think about what format each item is in.',
            'Items you read go in Books or Magazines. Movies in DVDs.',
            'Novels → Books, Magazines → Magazines, Movies → DVDs'
        ]
    }
];
