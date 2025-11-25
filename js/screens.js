// Screen Renderer
const Screens = {
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
                        <div class="quest-preview-card" onclick="App.navigate('questDetail', 'robot-navigator')">
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
        return `
            <div class="screen character-creation">
                <h2 class="text-center mb-4">Create Your Hero</h2>
                
                <div class="avatar-preview" id="avatarPreview" style="background: #FFD1A9;">
                    👤
                </div>
                
                <div class="input-group">
                    <label>Hero Name</label>
                    <input type="text" id="heroName" placeholder="Enter your name" value="Explorer">
                </div>
                
                <div class="input-group">
                    <label>Skin Tone</label>
                    <div class="color-grid">
                        ${['#FFD1A9', '#F3C5A5', '#D4A574', '#C68642', '#8D5524', '#614035'].map((color, i) => `
                            <button class="color-option ${i === 0 ? 'selected' : ''}" 
                                    style="background: ${color}" 
                                    data-type="skinTone" 
                                    data-color="${color}">
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <div class="input-group">
                    <label>Hair Color</label>
                    <div class="color-grid">
                        ${['#8B4513', '#2C2C2C', '#F4C430', '#DC143C', '#9370DB'].map((color, i) => `
                            <button class="color-option ${i === 0 ? 'selected' : ''}" 
                                    style="background: ${color}" 
                                    data-type="hairColor" 
                                    data-color="${color}">
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <button class="btn btn-primary mt-8" onclick="App.completeCharacterCreation()">
                    Start My Journey
                </button>
            </div>
        `;
    },

    dashboard() {
        const user = UserData.get();
        const featuredQuest = QUESTS[0];
        
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
        
        return `
            <div class="screen">
                <button class="btn btn-secondary mb-4" onclick="App.navigate('dashboard')">
                    ← Back to Dashboard
                </button>
                
                <div class="quest-card">
                    <div class="quest-header">
                        <h2 class="quest-title">${quest.title}</h2>
                        <span class="quest-category category-${quest.category}">${quest.category}</span>
                    </div>
                    
                    <div class="quest-meta mb-4">
                        <span>⏱️ ${quest.time} min</span>
                        <span>⭐ ${quest.xp} XP</span>
                        <span>📊 ${quest.difficulty}</span>
                    </div>
                    
                    <h3>📜 Mission Briefing</h3>
                    <p>${quest.scenario}</p>
                    
                    <button class="btn btn-primary mt-8" onclick="App.navigate('questPlay', '${quest.id}')">
                        Start Quest →
                    </button>
                </div>
            </div>
        `;
    },

    questPlay(questId) {
        const quest = QUESTS.find(q => q.id === questId);
        if (!quest) return '<div class="screen"><p>Quest not found</p></div>';
        
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
                ${QUESTS.map(quest => `
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
