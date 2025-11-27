// Quest Data
const QUESTS = [
    {
        id: 'robot-navigator',
        title: 'Robot Navigator',
        description: 'Guide robots through challenging mazes with progressive difficulty levels',
        category: 'algorithm',
        difficulty: 'beginner',
        level: 1,
        time: 20,
        xp: 120,
        scenario: 'Choose your difficulty level and help robots navigate to their destinations!',
        activityType: 'level-selection',
        prerequisites: [],
        levels: [
            {
                id: 'robot-navigator-beginner',
                title: 'Beginner: Charging Station',
                description: 'Help the robot reach the charging station by creating a step-by-step algorithm',
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
                title: 'Intermediate: Warehouse Delivery',
                description: 'Guide the warehouse robot through obstacles to reach the loading dock',
                difficulty: 'intermediate',
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
                title: 'Expert: Space Station Repair',
                description: 'Navigate the repair robot through a damaged space station to reach the emergency airlock',
                difficulty: 'expert',
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
                        { x: 3, y: 0 },
                        { x: 0, y: 1 },
                        { x: 2, y: 1 },
                        { x: 4, y: 1 },
                        { x: 5, y: 1 },
                        { x: 1, y: 2 },
                        { x: 3, y: 2 },
                        { x: 5, y: 2 },
                        { x: 2, y: 3 },
                        { x: 4, y: 3 },
                        { x: 0, y: 4 },
                        { x: 2, y: 4 },
                        { x: 4, y: 4 },
                        { x: 6, y: 4 },
                        { x: 1, y: 5 },
                        { x: 3, y: 5 },
                        { x: 5, y: 5 }
                    ],
                    solution: ['down', 'down', 'right', 'down', 'right', 'down', 'right', 'down', 'right', 'right', 'down', 'right']
                },
                hints: [
                    'This is a complex maze! Look for open pathways and plan your route carefully.',
                    'Start by moving down twice, then alternate between moving right and down to weave through the debris.',
                    'The path requires careful navigation - look for the zigzag pattern through the obstacles.'
                ]
            }
        ]
    },
    {
        id: 'pattern-detective',
        title: 'Pattern Detective',
        description: 'Discover hidden patterns in data with progressive difficulty levels',
        category: 'pattern',
        difficulty: 'beginner',
        time: 15,
        xp: 100,
        scenario: 'Choose your difficulty level and unlock the patterns!',
        activityType: 'level-selection',
        prerequisites: [],
        levels: [
            {
                id: 'pattern-detective-beginner',
                title: 'Beginner: Dr. Chen\'s Vault',
                description: 'Find simple patterns to unlock Dr. Chen\'s vault',
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
                            type: 'arithmetic',
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
                    'Answers: 11, four flowers, 15'
                ]
            },
            {
                id: 'pattern-detective-intermediate',
                title: 'Intermediate: The Code Breaker',
                description: 'Crack more complex patterns in secret codes',
                difficulty: 'intermediate',
                time: 20,
                xp: 150,
                scenario: 'A secret agent needs your help to crack encrypted codes! Find the hidden patterns.',
                activityType: 'pattern',
                prerequisites: ['pattern-detective-beginner'],
                activity: {
                    patterns: [
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
                            type: 'arithmetic',
                            sequence: [100, 90, 80, 70, '?'],
                            answer: 60,
                            options: [55, 60, 65, 75],
                            hint: 'This pattern is counting down. By how much each time?'
                        },
                        {
                            type: 'visual-sequence',
                            sequence: ['⭐', '⭐⭐', '⭐', '⭐⭐', '?'],
                            answer: '⭐',
                            options: ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐'],
                            hint: 'The pattern alternates between one and two stars!'
                        }
                    ]
                },
                hints: [
                    'Some patterns multiply, some add, and some alternate!',
                    'Pattern 1: Doubling. Pattern 2: Two sequences interleaved.',
                    'Answers: 32, 4, 60, one star'
                ]
            },
            {
                id: 'pattern-detective-expert',
                title: 'Expert: The Master Cipher',
                description: 'Solve the most challenging pattern puzzles',
                difficulty: 'expert',
                time: 25,
                xp: 200,
                scenario: 'The Master Cipher contains the world\'s most complex patterns. Only a true detective can crack them all!',
                activityType: 'pattern',
                prerequisites: ['pattern-detective-intermediate'],
                activity: {
                    patterns: [
                        {
                            type: 'geometric',
                            sequence: [3, 9, 27, 81, '?'],
                            answer: 243,
                            options: [162, 200, 243, 324],
                            hint: 'Each number is multiplied by 3. What is 81 × 3?'
                        },
                        {
                            type: 'alternating',
                            sequence: [2, 5, 4, 7, 6, 9, '?'],
                            answer: 8,
                            options: [8, 10, 11, 12],
                            hint: 'Two patterns: one adds 2, the other adds 2. But they alternate!'
                        },
                        {
                            type: 'arithmetic',
                            sequence: [1, 1, 2, 3, 5, 8, '?'],
                            answer: 13,
                            options: [11, 12, 13, 16],
                            hint: 'Each number is the sum of the two before it! (Fibonacci sequence)'
                        },
                        {
                            type: 'missing-middle',
                            sequence: [100, 81, '?', 49, 36],
                            answer: 64,
                            options: [60, 64, 70, 72],
                            hint: 'These are perfect squares counting down: 10², 9², ?², 7², 6²'
                        },
                        {
                            type: 'visual-sequence',
                            sequence: ['🔴', '🔴🔵', '🔴🔵🔴', '🔴🔵🔴🔵', '?'],
                            answer: '🔴🔵🔴🔵🔴',
                            options: ['🔴🔵🔴🔵🔴', '🔴🔵🔴', '🔵🔴🔵🔴🔵', '🔴🔴🔵🔵🔴'],
                            hint: 'The pattern adds red and blue circles alternately, always starting with red!'
                        }
                    ]
                },
                hints: [
                    'These patterns require careful observation and mathematical thinking!',
                    'Look for multiplication, addition of previous terms, and perfect squares.',
                    'Answers: 243, 8, 13, 64, red-blue-red-blue-red'
                ]
            }
        ]
    },
    {
        id: 'data-sorter',
        title: 'The Data Sorter',
        description: 'Organize messy data by breaking it into categories with progressive difficulty',
        category: 'decompose',
        difficulty: 'beginner',
        time: 18,
        xp: 110,
        scenario: 'Choose your difficulty level and master the art of data organization!',
        activityType: 'level-selection',
        prerequisites: [],
        levels: [
            {
                id: 'data-sorter-beginner',
                title: 'Beginner: Library Cleanup',
                description: 'Organize library items into basic categories',
                difficulty: 'beginner',
                time: 18,
                xp: 110,
                scenario: 'The library computer crashed! Help organize the data.',
                activityType: 'decomposition',
                activity: {
                    categories: [
                        { name: 'Books', icon: '📚', color: '#dbeafe' },
                        { name: 'Magazines', icon: '📰', color: '#fef3c7' },
                        { name: 'DVDs', icon: '📀', color: '#e0e7ff' }
                    ],
                    items: [
                        { name: 'Harry Potter Novel', category: 'Books', icon: '📖' },
                        { name: 'National Geographic', category: 'Magazines', icon: '📰' },
                        { name: 'Frozen 2', category: 'DVDs', icon: '🎬' },
                        { name: 'Lord of the Rings', category: 'Books', icon: '📕' },
                        { name: 'Time Magazine', category: 'Magazines', icon: '📑' },
                        { name: 'The Lion King', category: 'DVDs', icon: '🎥' },
                        { name: 'Science Fiction Novel', category: 'Books', icon: '📘' },
                        { name: 'Sports Weekly', category: 'Magazines', icon: '🗞️' },
                        { name: 'Toy Story', category: 'DVDs', icon: '💿' }
                    ]
                },
                hints: [
                    'Think about what format each item is in.',
                    'Items you read go in Books or Magazines. Movies in DVDs.',
                    'Novels → Books, Magazines → Magazines, Movies → DVDs'
                ]
            },
            {
                id: 'data-sorter-intermediate',
                title: 'Intermediate: School Supply Sort',
                description: 'Categorize school supplies and materials into departments',
                difficulty: 'intermediate',
                time: 22,
                xp: 160,
                scenario: 'The school supply room is a mess! Sort items by department to help teachers find what they need.',
                activityType: 'decomposition',
                prerequisites: ['data-sorter-beginner'],
                activity: {
                    categories: [
                        { name: 'Art Supplies', icon: '🎨', color: '#fce7f3' },
                        { name: 'Science Lab', icon: '🔬', color: '#dbeafe' },
                        { name: 'Sports Equipment', icon: '⚽', color: '#d1fae5' },
                        { name: 'Office Supplies', icon: '📋', color: '#fef3c7' },
                        { name: 'Technology', icon: '💻', color: '#e0e7ff' }
                    ],
                    items: [
                        { name: 'Paint Brushes', category: 'Art Supplies', icon: '🖌️' },
                        { name: 'Microscope', category: 'Science Lab', icon: '🔬' },
                        { name: 'Basketball', category: 'Sports Equipment', icon: '🏀' },
                        { name: 'Stapler', category: 'Office Supplies', icon: '📎' },
                        { name: 'Laptop', category: 'Technology', icon: '💻' },
                        { name: 'Color Pencils', category: 'Art Supplies', icon: '✏️' },
                        { name: 'Test Tubes', category: 'Science Lab', icon: '🧪' },
                        { name: 'Jump Rope', category: 'Sports Equipment', icon: '🪢' },
                        { name: 'Paper Clips', category: 'Office Supplies', icon: '📌' },
                        { name: 'Tablet', category: 'Technology', icon: '📱' },
                        { name: 'Canvas', category: 'Art Supplies', icon: '🖼️' },
                        { name: 'Beakers', category: 'Science Lab', icon: '⚗️' },
                        { name: 'Soccer Ball', category: 'Sports Equipment', icon: '⚽' },
                        { name: 'Folder', category: 'Office Supplies', icon: '📁' },
                        { name: 'Projector', category: 'Technology', icon: '📽️' }
                    ]
                },
                hints: [
                    'Think about where each item would be used in the school.',
                    'Art items go to Art Supplies, lab equipment to Science Lab, etc.',
                    'Group by activity: art, science experiments, sports, office work, or digital devices.'
                ]
            },
            {
                id: 'data-sorter-expert',
                title: 'Expert: Wildlife Classification',
                description: 'Classify animals into scientific categories using biological characteristics',
                difficulty: 'expert',
                time: 28,
                xp: 220,
                scenario: 'Help the zoo organize their animal database! Classify each animal into the correct biological category.',
                activityType: 'decomposition',
                prerequisites: ['data-sorter-intermediate'],
                activity: {
                    categories: [
                        { name: 'Mammals', icon: '🦁', color: '#fef3c7' },
                        { name: 'Birds', icon: '🦅', color: '#dbeafe' },
                        { name: 'Reptiles', icon: '🦎', color: '#d1fae5' },
                        { name: 'Fish', icon: '🐟', color: '#e0e7ff' },
                        { name: 'Amphibians', icon: '🐸', color: '#ccfbf1' },
                        { name: 'Insects', icon: '🦋', color: '#fce7f3' }
                    ],
                    items: [
                        { name: 'Lion', category: 'Mammals', icon: '🦁' },
                        { name: 'Eagle', category: 'Birds', icon: '🦅' },
                        { name: 'Lizard', category: 'Reptiles', icon: '🦎' },
                        { name: 'Goldfish', category: 'Fish', icon: '🐠' },
                        { name: 'Frog', category: 'Amphibians', icon: '🐸' },
                        { name: 'Butterfly', category: 'Insects', icon: '🦋' },
                        { name: 'Dolphin', category: 'Mammals', icon: '🐬' },
                        { name: 'Penguin', category: 'Birds', icon: '🐧' },
                        { name: 'Snake', category: 'Reptiles', icon: '🐍' },
                        { name: 'Shark', category: 'Fish', icon: '🦈' },
                        { name: 'Salamander', category: 'Amphibians', icon: '🦎' },
                        { name: 'Bee', category: 'Insects', icon: '🐝' },
                        { name: 'Elephant', category: 'Mammals', icon: '🐘' },
                        { name: 'Parrot', category: 'Birds', icon: '🦜' },
                        { name: 'Turtle', category: 'Reptiles', icon: '🐢' },
                        { name: 'Clownfish', category: 'Fish', icon: '🐡' },
                        { name: 'Toad', category: 'Amphibians', icon: '🐸' },
                        { name: 'Ladybug', category: 'Insects', icon: '🐞' }
                    ]
                },
                hints: [
                    'Think about biological characteristics: fur/hair = mammals, feathers = birds, scales on land = reptiles.',
                    'Amphibians live in water and land. Fish live only in water. Insects have 6 legs.',
                    'Remember: Dolphins and whales are mammals (not fish), penguins are birds (not fish).'
                ]
            }
        ]
    }
];
