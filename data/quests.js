// Quest Data
const QUESTS = [
    {
        id: 'robot-navigator-beginner',
        title: 'Robot Navigator: Beginner',
        description: 'Help the robot reach the charging station by creating a step-by-step algorithm',
        category: 'algorithm',
        difficulty: 'beginner',
        level: 1,
        time: 20,
        xp: 120,
        scenario: 'The maintenance robot has run out of power! Guide it to the charging station.',
        activityType: 'sequencing',
        prerequisites: [],
        activity: {
            gridSize: { rows: 5, cols: 5 },
            robotStart: { x: 0, y: 0 },
            goal: { x: 4, y: 4 },
            obstacles: [
                { x: 1, y: 1 },
                { x: 2, y: 2 },
                { x: 3, y: 1 }
            ],
            solution: ['right', 'right', 'right', 'right', 'down', 'down', 'down', 'down']
        },
        hints: [
            'The robot needs to move from position (0, 0) to position (4, 4). What directions will get it there?',
            'Try moving right to reach column 4, then move down to reach row 4.',
            'Solution: Move Right 4 times, then Move Down 4 times'
        ]
    },
    {
        id: 'robot-navigator-intermediate',
        title: 'Robot Navigator: Intermediate',
        description: 'Guide the warehouse robot through obstacles to reach the loading dock',
        category: 'algorithm',
        difficulty: 'intermediate',
        level: 2,
        time: 25,
        xp: 180,
        scenario: 'The warehouse delivery robot needs to deliver a package to the loading dock, but the warehouse is full of storage crates!',
        activityType: 'sequencing',
        prerequisites: ['robot-navigator-beginner'],
        activity: {
            gridSize: { rows: 6, cols: 6 },
            robotStart: { x: 0, y: 0 },
            goal: { x: 5, y: 5 },
            obstacles: [
                { x: 1, y: 0 },
                { x: 2, y: 1 },
                { x: 3, y: 2 },
                { x: 1, y: 3 },
                { x: 4, y: 3 },
                { x: 2, y: 4 },
                { x: 3, y: 5 }
            ],
            solution: ['down', 'down', 'right', 'right', 'down', 'right', 'down', 'right', 'down', 'right']
        },
        hints: [
            'This path isn\'t a straight line! You\'ll need to weave around the storage crates.',
            'Try going down first to avoid the obstacles, then alternate between right and down movements.',
            'One solution: Down 2 times, then alternate right-down movements to navigate around crates.'
        ]
    },
    {
        id: 'robot-navigator-expert',
        title: 'Robot Navigator: Expert',
        description: 'Navigate the repair robot through a damaged space station to reach the emergency airlock',
        category: 'algorithm',
        difficulty: 'expert',
        level: 3,
        time: 30,
        xp: 250,
        scenario: 'The space station has been damaged! Navigate the repair robot through the debris field to reach the emergency systems.',
        activityType: 'sequencing',
        prerequisites: ['robot-navigator-intermediate'],
        activity: {
            gridSize: { rows: 7, cols: 7 },
            robotStart: { x: 0, y: 0 },
            goal: { x: 6, y: 6 },
            obstacles: [
                { x: 1, y: 0 },
                { x: 2, y: 0 },
                { x: 0, y: 1 },
                { x: 2, y: 1 },
                { x: 3, y: 1 },
                { x: 4, y: 1 },
                { x: 1, y: 2 },
                { x: 4, y: 2 },
                { x: 5, y: 2 },
                { x: 2, y: 3 },
                { x: 3, y: 3 },
                { x: 5, y: 3 },
                { x: 1, y: 4 },
                { x: 3, y: 4 },
                { x: 5, y: 4 },
                { x: 1, y: 5 },
                { x: 2, y: 5 },
                { x: 4, y: 5 },
                { x: 3, y: 6 }
            ],
            solution: ['down', 'down', 'down', 'right', 'down', 'right', 'right', 'up', 'right', 'down', 'down', 'right', 'right']
        },
        hints: [
            'This is a complex maze! Look for open pathways and plan your route carefully.',
            'Start by going down to find an opening, then work your way right while avoiding debris.',
            'The path requires some backtracking - you might need to go up at one point to navigate around obstacles.'
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
        prerequisites: [],
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
        prerequisites: [],
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
