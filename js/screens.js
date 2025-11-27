// Screen Renderer
const Screens = {
    // Helper function to check if a quest is unlocked
    isQuestUnlocked(quest) {
        if (!quest.prerequisites || quest.prerequisites.length === 0) {
            return true;
        }

        const user = UserData.get();
        return quest.prerequisites.every(prereqId =>
            user.completedQuests.includes(prereqId)
        );
    },

    // Helper function to get prerequisite quest title
    getPrerequisiteTitle(questId) {
        const prereq = QUESTS.find(q => q.id === questId);
        return prereq ? prereq.title : 'Unknown Quest';
    },

    welcome() {
        return `
            <div class="screen welcome-screen">
                <!-- Background Floating Shapes -->
                <div class="bg-shapes">
                    <div class="bg-shape"></div>
                    <div class="bg-shape"></div>
                    <div class="bg-shape"></div>
                </div>

                <!-- Hero Scene -->
                <div class="hero-scene">
                    <div class="hero-compass">
                        <div class="compass-glow"></div>
                        🧭
                    </div>
                    <div class="robot-helper">🤖</div>
                </div>

                <!-- Hero Title Section -->
                <h1 class="hero-title">STEM Quest World</h1>
                <p class="hero-subtitle">Begin your journey as a STEM Explorer</p>
                <p class="hero-supporting">A judgment-free world where every learner becomes a creator</p>

                <!-- Action Buttons -->
                <div class="action-buttons">
                    <button class="btn-quest-start" onclick="App.navigate('characterCreation')">
                        <span class="btn-icon">🎯</span>
                        Start Your Quest
                    </button>
                    <button class="btn-avatar-create" onclick="App.navigate('characterCreation')">
                        <span class="btn-icon">👤</span>
                        Create Your Avatar
                    </button>
                    <button class="btn-continue hidden" id="continueBtn" onclick="App.navigate('dashboard')">
                        <span class="btn-icon">▶️</span>
                        Continue Adventure
                    </button>
                </div>

                <!-- Quest Preview Section -->
                <div class="quest-preview-section">
                    <h3 class="section-title">Ready to Begin? Choose Your First Quest</h3>
                    <div class="quest-preview-scroll">
                        <div class="quest-preview-card" onclick="App.navigate('questDetail', 'robot-navigator-beginner')">
                            <div class="preview-icon">🤖</div>
                            <h4>Robot Navigator</h4>
                            <p>Guide the robot to safety</p>
                            <span class="preview-badge">Algorithm</span>
                        </div>
                        <div class="quest-preview-card" onclick="App.navigate('questDetail', 'pattern-detective')">
                            <div class="preview-icon">🔍</div>
                            <h4>Pattern Detective</h4>
                            <p>Unlock the hidden patterns</p>
                            <span class="preview-badge">Pattern Recognition</span>
                        </div>
                        <div class="quest-preview-card" onclick="App.navigate('questDetail', 'data-sorter')">
                            <div class="preview-icon">📚</div>
                            <h4>Data Sorter</h4>
                            <p>Organize the library chaos</p>
                            <span class="preview-badge">Decomposition</span>
                        </div>
                        <div class="quest-preview-card preview-locked">
                            <div class="preview-icon">🔒</div>
                            <h4>More Coming Soon</h4>
                            <p>Complete quests to unlock</p>
                        </div>
                    </div>
                </div>

                <!-- Features Section -->
                <div class="features-section">
                    <h3 class="section-title">Why STEM Quest World?</h3>
                    <div class="features-grid">
                        <div class="feature-card">
                            <div class="feature-illustration">
                                🛡️
                            </div>
                            <h4>Safe & Judgment-Free</h4>
                            <p>Learn at your own pace in a supportive environment. No pressure, just progress.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-illustration">
                                📈
                            </div>
                            <h4>Personal Progress</h4>
                            <p>Track your computational thinking journey with detailed skill trees and XP.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-illustration">
                                🎮
                            </div>
                            <h4>Interactive Quests</h4>
                            <p>Engage with hands-on challenges that make learning feel like play.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    characterCreation() {
        const user = UserData.get();
        const hasAvatar = user.name && user.avatar;

        return `
            <div class="screen character-creation">
                <!-- Back to Home Button -->
                <button class="btn-back-home" onclick="App.navigate('${hasAvatar ? 'dashboard' : 'welcome'}')">
                    <span>← Back to ${hasAvatar ? 'Hub' : 'Home'}</span>
                </button>

                <h2 class="avatar-title">Create Your Hero</h2>
                <p class="avatar-subtitle">Design your unique STEM Explorer</p>

                <!-- Live SVG Avatar Preview -->
                <div class="avatar-preview-container">
                    <svg id="avatarPreview" viewBox="0 0 200 240" class="avatar-svg">
                        <!-- Background circle -->
                        <circle cx="100" cy="100" r="80" fill="#e0f2fe" class="avatar-bg"/>

                        <!-- Body -->
                        <rect x="75" y="140" width="50" height="80" rx="10" fill="#4A90E2" class="avatar-body"/>

                        <!-- Head -->
                        <circle cx="100" cy="100" r="45" fill="#FFD1A9" class="avatar-head"/>

                        <!-- Hair -->
                        <g class="avatar-hair-group">
                            <ellipse cx="100" cy="70" rx="48" ry="35" fill="#8B4513" class="avatar-hair"/>
                        </g>

                        <!-- Eyes -->
                        <circle cx="88" cy="95" r="4" fill="#2C2C2C"/>
                        <circle cx="112" cy="95" r="4" fill="#2C2C2C"/>

                        <!-- Smile -->
                        <path d="M 85 110 Q 100 118 115 110" stroke="#2C2C2C" stroke-width="2" fill="none" stroke-linecap="round"/>

                        <!-- Accessory (initially hidden) -->
                        <g class="avatar-accessory" style="display: none;">
                            <ellipse cx="100" cy="65" rx="30" ry="8" fill="#DC143C" class="accessory-hat"/>
                            <circle cx="100" cy="60" r="3" fill="#fff" class="accessory-hat-pom"/>
                        </g>
                    </svg>
                    <div class="avatar-preview-glow"></div>
                </div>

                <!-- Customization Options -->
                <div class="avatar-customization">
                    <div class="input-group-modern">
                        <label>
                            <span class="label-icon">✏️</span>
                            Hero Name
                        </label>
                        <input type="text" id="heroName" placeholder="Enter your name" value="Explorer" class="input-modern">
                    </div>

                    <div class="input-group-modern">
                        <label>
                            <span class="label-icon">🎨</span>
                            Skin Tone
                        </label>
                        <div class="color-grid-modern">
                            ${['#FFD1A9', '#F3C5A5', '#E9B68F', '#D4A574', '#C68642', '#A67650', '#8D5524', '#614035'].map((color, i) => `
                                <button class="color-option-modern ${i === 0 ? 'selected' : ''}"
                                        style="background: ${color}"
                                        data-type="skinTone"
                                        data-color="${color}"
                                        aria-label="Skin tone ${i + 1}">
                                    <span class="color-check">✓</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <div class="input-group-modern">
                        <label>
                            <span class="label-icon">💇</span>
                            Hairstyle
                        </label>
                        <div class="hairstyle-grid">
                            ${[
                                { name: 'Short', value: 'short', icon: '🧑' },
                                { name: 'Long', value: 'long', icon: '👩' },
                                { name: 'Curly', value: 'curly', icon: '👨‍🦱' },
                                { name: 'Bald', value: 'bald', icon: '👨‍🦲' }
                            ].map((style, i) => `
                                <button class="hairstyle-option ${i === 0 ? 'selected' : ''}"
                                        data-type="hairstyle"
                                        data-value="${style.value}">
                                    <span class="hairstyle-icon">${style.icon}</span>
                                    <span class="hairstyle-name">${style.name}</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <div class="input-group-modern">
                        <label>
                            <span class="label-icon">🌈</span>
                            Hair Color
                        </label>
                        <div class="color-grid-modern">
                            ${['#8B4513', '#2C2C2C', '#654321', '#F4C430', '#FFD700', '#DC143C', '#9370DB', '#1E90FF'].map((color, i) => `
                                <button class="color-option-modern ${i === 0 ? 'selected' : ''}"
                                        style="background: ${color}"
                                        data-type="hairColor"
                                        data-color="${color}"
                                        aria-label="Hair color ${i + 1}">
                                    <span class="color-check">✓</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <div class="input-group-modern">
                        <label>
                            <span class="label-icon">👕</span>
                            Clothing Color
                        </label>
                        <div class="color-grid-modern">
                            ${['#4A90E2', '#0d9488', '#DC143C', '#9370DB', '#FF6B6B', '#4ECDC4', '#FFD93D', '#95E1D3'].map((color, i) => `
                                <button class="color-option-modern ${i === 0 ? 'selected' : ''}"
                                        style="background: ${color}"
                                        data-type="clothingColor"
                                        data-color="${color}"
                                        aria-label="Clothing color ${i + 1}">
                                    <span class="color-check">✓</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <div class="input-group-modern">
                        <label>
                            <span class="label-icon">🎩</span>
                            Accessories (Optional)
                        </label>
                        <div class="accessory-grid">
                            ${[
                                { name: 'None', value: 'none', icon: '🚫' },
                                { name: 'Hat', value: 'hat', icon: '🎩' },
                                { name: 'Glasses', value: 'glasses', icon: '👓' },
                                { name: 'Headphones', value: 'headphones', icon: '🎧' }
                            ].map((acc, i) => `
                                <button class="accessory-option ${i === 0 ? 'selected' : ''}"
                                        data-type="accessory"
                                        data-value="${acc.value}">
                                    <span class="accessory-icon">${acc.icon}</span>
                                    <span class="accessory-name">${acc.name}</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <button class="btn-start-journey" onclick="App.completeCharacterCreation()">
                    <span class="btn-icon">🚀</span>
                    Start My Journey
                </button>
            </div>
        `;
    },

    questSelection() {
        const user = UserData.get();

        return `
            <div class="screen quest-selection-screen">
                <!-- Global Top Navigation -->
                <nav class="top-nav">
                    <button class="nav-link" onclick="App.navigate('dashboard')">
                        <span class="nav-link-icon">🏠</span>
                        <span>Home</span>
                    </button>
                    <button class="nav-link" onclick="App.navigate('characterCreation')">
                        <span class="nav-link-icon">👤</span>
                        <span>My Avatar</span>
                    </button>
                    <button class="nav-link active">
                        <span class="nav-link-icon">🎯</span>
                        <span>Quests</span>
                    </button>
                    <button class="nav-link" onclick="App.navigate('settings')">
                        <span class="nav-link-icon">⚙️</span>
                        <span>Settings</span>
                    </button>
                    <button class="nav-link" onclick="App.navigate('welcome')">
                        <span class="nav-link-icon">🚪</span>
                        <span>Exit Game</span>
                    </button>
                </nav>

                <div class="quest-selection-content">
                    <div class="hero-welcome">
                        <h1 class="welcome-hero-title">Welcome, ${user.name || 'Explorer'}! 🎉</h1>
                        <p class="welcome-hero-subtitle">Choose your first quest and begin your STEM adventure</p>
                    </div>

                    <div class="quest-cards-grid">
                        ${QUESTS.map(quest => {
                            const isUnlocked = this.isQuestUnlocked(quest);
                            const isCompleted = UserData.get().completedQuests.includes(quest.id);

                            return `
                            <div class="quest-selection-card ${!isUnlocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''}"
                                 onclick="${isUnlocked ? `App.navigate('questDetail', '${quest.id}')` : 'return false;'}">
                                <div class="quest-card-icon">${quest.category === 'algorithm' ? '🤖' : quest.category === 'pattern' ? '🔍' : '📚'}</div>
                                ${!isUnlocked ? '<div class="lock-overlay">🔒</div>' : ''}
                                ${isCompleted ? '<div class="completed-badge">✅ Completed</div>' : ''}
                                <div class="quest-card-content">
                                    <h3 class="quest-card-title">${quest.title}</h3>
                                    <p class="quest-card-description">${quest.description}</p>
                                    ${!isUnlocked && quest.prerequisites.length > 0 ? `
                                        <p class="prerequisite-text">🔒 Complete "${this.getPrerequisiteTitle(quest.prerequisites[0])}" first</p>
                                    ` : ''}
                                    <div class="quest-card-meta">
                                        <span class="meta-badge">⏱️ ${quest.time} min</span>
                                        <span class="meta-badge">⭐ ${quest.xp} XP</span>
                                        <span class="meta-badge">📊 ${quest.difficulty}</span>
                                    </div>
                                    <span class="quest-card-category category-${quest.category}">${quest.category}</span>
                                </div>
                                <button class="quest-card-btn" ${!isUnlocked ? 'disabled' : ''}>
                                    ${!isUnlocked ? '🔒 Locked' : isCompleted ? 'Play Again →' : 'Start Quest →'}
                                </button>
                            </div>
                        `;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    dashboard() {
        const user = UserData.get();
        // Find the first unlocked quest as the featured quest
        const featuredQuest = QUESTS.find(q => this.isQuestUnlocked(q)) || QUESTS[0];
        
        return `
            <div class="screen dashboard">
                <h1 class="greeting">Hey ${user.name || 'Explorer'}! 👋</h1>
                <p class="greeting-subtitle">Ready for an adventure?</p>
                
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-value">${user.stats.xp}</div>
                        <div class="stat-label">Total XP</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${user.stats.level}</div>
                        <div class="stat-label">Level</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${user.stats.questsCompleted}</div>
                        <div class="stat-label">Quests</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${user.stats.streak}</div>
                        <div class="stat-label">Streak</div>
                    </div>
                </div>
                
                <h3>⭐ Featured Quest</h3>
                <div class="quest-card featured" onclick="App.navigate('questDetail', '${featuredQuest.id}')">
                    <div class="quest-header">
                        <h3 class="quest-title">${featuredQuest.title}</h3>
                        <span class="quest-category category-${featuredQuest.category}">${featuredQuest.category}</span>
                    </div>
                    <p class="quest-description">${featuredQuest.description}</p>
                    <div class="quest-meta">
                        <span>⏱️ ${featuredQuest.time} min</span>
                        <span>⭐ ${featuredQuest.xp} XP</span>
                        <span>📊 ${featuredQuest.difficulty}</span>
                    </div>
                </div>
                
                <h3>Available Quests</h3>
                ${QUESTS.slice(1).map(quest => `
                    <div class="quest-card" onclick="App.navigate('questDetail', '${quest.id}')">
                        <div class="quest-header">
                            <h3 class="quest-title">${quest.title}</h3>
                            <span class="quest-category category-${quest.category}">${quest.category}</span>
                        </div>
                        <p class="quest-description">${quest.description}</p>
                        <div class="quest-meta">
                            <span>⏱️ ${quest.time} min</span>
                            <span>⭐ ${quest.xp} XP</span>
                            <span>📊 ${quest.difficulty}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    questDetail(questId) {
        const quest = QUESTS.find(q => q.id === questId);
        if (!quest) return '<div class="screen"><p>Quest not found</p></div>';

        const isUnlocked = this.isQuestUnlocked(quest);
        const isCompleted = UserData.get().completedQuests.includes(quest.id);

        return `
            <div class="screen">
                <button class="btn btn-secondary mb-4" onclick="App.navigate('dashboard')">
                    ← Back to Dashboard
                </button>

                <div class="quest-card ${!isUnlocked ? 'locked' : ''}">
                    <div class="quest-header">
                        <h2 class="quest-title">
                            ${!isUnlocked ? '🔒 ' : ''}${quest.title}
                            ${isCompleted ? ' ✅' : ''}
                        </h2>
                        <span class="quest-category category-${quest.category}">${quest.category}</span>
                    </div>

                    <div class="quest-meta mb-4">
                        <span>⏱️ ${quest.time} min</span>
                        <span>⭐ ${quest.xp} XP</span>
                        <span>📊 ${quest.difficulty}</span>
                    </div>

                    ${!isUnlocked && quest.prerequisites.length > 0 ? `
                        <div class="prerequisite-warning">
                            <h3>🔒 Quest Locked</h3>
                            <p>You must complete the following quest first:</p>
                            <ul>
                                ${quest.prerequisites.map(prereqId => `
                                    <li><strong>${this.getPrerequisiteTitle(prereqId)}</strong></li>
                                `).join('')}
                            </ul>
                            <button class="btn btn-secondary mt-4" onclick="App.navigate('questMap')">
                                View Quest Map
                            </button>
                        </div>
                    ` : `
                        <h3>📜 Mission Briefing</h3>
                        <p>${quest.scenario}</p>

                        <button class="btn btn-primary mt-8" onclick="App.navigate('questPlay', '${quest.id}')">
                            ${isCompleted ? 'Play Again →' : 'Start Quest →'}
                        </button>
                    `}
                </div>
            </div>
        `;
    },

    questPlay(questId) {
        const quest = QUESTS.find(q => q.id === questId);
        if (!quest) return '<div class="screen"><p>Quest not found</p></div>';

        const isUnlocked = this.isQuestUnlocked(quest);

        if (!isUnlocked) {
            return `
                <div class="screen">
                    <div class="quest-card locked">
                        <h2>🔒 Quest Locked</h2>
                        <p>You cannot access this quest yet. Please complete the prerequisite quests first.</p>
                        <button class="btn btn-primary mt-4" onclick="App.navigate('questMap')">
                            Back to Quest Map
                        </button>
                    </div>
                </div>
            `;
        }

        return `
            <div class="screen quest-play">
                <div class="quest-header-bar">
                    <h2>${quest.title}</h2>
                    <button class="btn btn-secondary" onclick="App.showHints('${questId}')">💡 Hints</button>
                    <div class="progress-bar">
                        <div class="progress-fill" id="questProgress" style="width: 0%"></div>
                    </div>
                </div>

                <div class="activity-container">
                    <div class="challenge-text">${quest.scenario}</div>
                    <div id="activityContent"></div>
                </div>

                <button class="btn btn-primary" id="submitBtn" onclick="Activities.submit('${questId}')">
                    Submit Solution
                </button>
            </div>
        `;
    },

    reflection(questId) {
        const quest = QUESTS.find(q => q.id === questId);
        
        return `
            <div class="screen reflection-screen">
                <div class="celebration">
                    <h2>🎉 Quest Complete!</h2>
                    <div class="xp-earned">+${quest.xp} XP</div>
                    <p>You earned the ${quest.title} badge!</p>
                </div>
                
                <h2 class="mb-4">Reflection Time 💭</h2>
                
                <div class="reflection-prompt">
                    <label>What CT strategies worked well for you?</label>
                    <textarea id="reflection1" placeholder="Think about how you broke down the problem..."></textarea>
                </div>
                
                <div class="reflection-prompt">
                    <label>What will you explore next in STEM?</label>
                    <textarea id="reflection2" placeholder="What interests you?"></textarea>
                </div>
                
                <div class="reflection-prompt">
                    <label>Who are your STEM learning allies?</label>
                    <textarea id="reflection3" placeholder="Who can help you on your journey?"></textarea>
                </div>
                
                <div class="reflection-prompt">
                    <label>Confidence Level</label>
                    <div class="confidence-slider">
                        <input type="range" id="confidence" min="0" max="4" value="2">
                        <div class="slider-labels">
                            <span>Need help</span>
                            <span>Very confident</span>
                        </div>
                    </div>
                </div>
                
                <button class="btn btn-primary mt-8" onclick="App.completeReflection('${questId}')">
                    Save to Journal
                </button>
            </div>
        `;
    },

    skillTree() {
        const user = UserData.get();
        
        return `
            <div class="screen skill-tree">
                <h2 class="mb-4">Your CT Skills 🌳</h2>
                
                <div class="skill-branch">
                    <div class="branch-header">
                        <span class="branch-icon">📐</span>
                        <h3 class="branch-title">Decomposition</h3>
                    </div>
                    <div class="skill-nodes">
                        <div class="skill-node ${user.stats.questsCompleted >= 1 ? 'mastered' : ''}">
                            <strong>Problem Breaker</strong>
                            <p>Break down complex problems</p>
                        </div>
                    </div>
                </div>
                
                <div class="skill-branch">
                    <div class="branch-header">
                        <span class="branch-icon">🔍</span>
                        <h3 class="branch-title">Pattern Recognition</h3>
                    </div>
                    <div class="skill-nodes">
                        <div class="skill-node ${user.stats.questsCompleted >= 1 ? 'unlocked' : ''}">
                            <strong>Pattern Spotter</strong>
                            <p>Identify patterns in data</p>
                        </div>
                    </div>
                </div>
                
                <div class="skill-branch">
                    <div class="branch-header">
                        <span class="branch-icon">⚡</span>
                        <h3 class="branch-title">Algorithm Design</h3>
                    </div>
                    <div class="skill-nodes">
                        <div class="skill-node ${user.stats.questsCompleted >= 1 ? 'unlocked' : ''}">
                            <strong>Algorithm Apprentice</strong>
                            <p>Create step-by-step solutions</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    journal() {
        const user = UserData.get();
        
        return `
            <div class="screen">
                <h2 class="mb-4">Learning Journal 📔</h2>
                
                <div class="stats-grid mb-8">
                    <div class="stat-card">
                        <div class="stat-value">${user.stats.questsCompleted}</div>
                        <div class="stat-label">Quests Completed</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${user.stats.xp}</div>
                        <div class="stat-label">Total XP</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${user.stats.level}</div>
                        <div class="stat-label">Current Level</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${Object.keys(user.progress).length}</div>
                        <div class="stat-label">Reflections</div>
                    </div>
                </div>
                
                <h3>Completed Quests</h3>
                ${user.completedQuests.length > 0 ? `
                    ${user.completedQuests.map(questId => {
                        const quest = QUESTS.find(q => q.id === questId);
                        return quest ? `
                            <div class="quest-card">
                                <h3>${quest.title}</h3>
                                <span class="quest-category category-${quest.category}">${quest.category}</span>
                                <p>Earned ${quest.xp} XP</p>
                            </div>
                        ` : '';
                    }).join('')}
                ` : '<p>No quests completed yet. Start your first quest!</p>'}
            </div>
        `;
    },

    questMap() {
        return `
            <div class="screen">
                <h2 class="mb-4">Quest Map 🗺️</h2>
                ${QUESTS.map(quest => {
                    const isUnlocked = this.isQuestUnlocked(quest);
                    const isCompleted = UserData.get().completedQuests.includes(quest.id);

                    return `
                    <div class="quest-card ${!isUnlocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''}"
                         onclick="${isUnlocked ? `App.navigate('questDetail', '${quest.id}')` : 'return false;'}">
                        <div class="quest-header">
                            <h3 class="quest-title">
                                ${!isUnlocked ? '🔒 ' : ''}${quest.title}
                                ${isCompleted ? ' ✅' : ''}
                            </h3>
                            <span class="quest-category category-${quest.category}">${quest.category}</span>
                        </div>
                        <p class="quest-description">${quest.description}</p>
                        ${!isUnlocked && quest.prerequisites.length > 0 ? `
                            <p class="prerequisite-text">🔒 Complete "${this.getPrerequisiteTitle(quest.prerequisites[0])}" first</p>
                        ` : ''}
                        <div class="quest-meta">
                            <span>⏱️ ${quest.time} min</span>
                            <span>⭐ ${quest.xp} XP</span>
                            <span>📊 ${quest.difficulty}</span>
                        </div>
                    </div>
                `;
                }).join('')}
            </div>
        `;
    },

    settings() {
        const user = UserData.get();
        
        return `
            <div class="screen">
                <h2 class="mb-4">Settings ⚙️</h2>
                
                <div class="quest-card">
                    <h3>User Profile</h3>
                    <p><strong>Name:</strong> ${user.name || 'Explorer'}</p>
                    <p><strong>Level:</strong> ${user.stats.level}</p>
                    <p><strong>Total XP:</strong> ${user.stats.xp}</p>
                </div>
                
                <div class="quest-card mt-4">
                    <h3>Accessibility</h3>
                    <p>Text size, contrast, and motion settings</p>
                    <button class="btn btn-secondary">Customize</button>
                </div>
                
                <button class="btn btn-secondary mt-4" onclick="App.resetProgress()">
                    Reset Progress
                </button>
            </div>
        `;
    }
};
