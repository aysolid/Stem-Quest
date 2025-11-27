// Main App Controller
const App = {
    currentScreen: 'welcome',
    currentQuestId: null,
    
    init() {
        const user = UserData.get();
        
        // Check if user has completed onboarding
        if (user.name) {
            this.navigate('dashboard');
        } else {
            this.navigate('welcome');
        }
        
        // Setup bottom nav
        this.setupNavigation();
    },
    
    navigate(screen, questId = null) {
        this.currentScreen = screen;
        this.currentQuestId = questId;
        
        const appContainer = document.getElementById('app');
        const bottomNav = document.getElementById('bottomNav');
        
        // Render screen
        let html = '';
        switch (screen) {
            case 'welcome':
                html = Screens.welcome();
                bottomNav.classList.add('hidden');
                break;
            case 'characterCreation':
                html = Screens.characterCreation();
                bottomNav.classList.add('hidden');
                this.setupCharacterCreation();
                break;
            case 'questSelection':
                html = Screens.questSelection();
                bottomNav.classList.add('hidden');
                break;
            case 'dashboard':
                html = Screens.dashboard();
                bottomNav.classList.remove('hidden');
                this.updateNavActive('dashboard');
                break;
            case 'questMap':
                html = Screens.questMap();
                bottomNav.classList.remove('hidden');
                this.updateNavActive('questMap');
                break;
            case 'questDetail':
                html = Screens.questDetail(questId);
                bottomNav.classList.remove('hidden');
                break;
            case 'questPlay':
                html = Screens.questPlay(questId);
                bottomNav.classList.add('hidden');
                setTimeout(() => Activities.init(questId), 100);
                break;
            case 'reflection':
                html = Screens.reflection(questId);
                bottomNav.classList.add('hidden');
                break;
            case 'skillTree':
                html = Screens.skillTree();
                bottomNav.classList.remove('hidden');
                this.updateNavActive('skillTree');
                break;
            case 'journal':
                html = Screens.journal();
                bottomNav.classList.remove('hidden');
                this.updateNavActive('journal');
                break;
            case 'settings':
                html = Screens.settings();
                bottomNav.classList.remove('hidden');
                this.updateNavActive('settings');
                break;
        }
        
        appContainer.innerHTML = html;
        window.scrollTo(0, 0);
    },
    
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const screen = item.dataset.screen;
                this.navigate(screen);
            });
        });
    },
    
    updateNavActive(screen) {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            if (item.dataset.screen === screen) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    },
    
    setupCharacterCreation() {
        setTimeout(() => {
            // Avatar state
            const avatarState = {
                skinTone: '#FFD1A9',
                hairColor: '#8B4513',
                hairstyle: 'short',
                clothingColor: '#4A90E2',
                accessory: 'none'
            };

            // Get SVG elements
            const avatarHead = document.querySelector('.avatar-head');
            const avatarHair = document.querySelector('.avatar-hair');
            const avatarHairGroup = document.querySelector('.avatar-hair-group');
            const avatarBody = document.querySelector('.avatar-body');
            const avatarAccessory = document.querySelector('.avatar-accessory');

            // Update avatar visual
            function updateAvatar() {
                if (avatarHead) avatarHead.setAttribute('fill', avatarState.skinTone);
                if (avatarHair) avatarHair.setAttribute('fill', avatarState.hairColor);
                if (avatarBody) avatarBody.setAttribute('fill', avatarState.clothingColor);

                // Update hairstyle
                if (avatarHairGroup) {
                    switch (avatarState.hairstyle) {
                        case 'short':
                            avatarHairGroup.innerHTML = '<ellipse cx="100" cy="70" rx="48" ry="35" fill="' + avatarState.hairColor + '" class="avatar-hair"/>';
                            break;
                        case 'long':
                            avatarHairGroup.innerHTML = `
                                <ellipse cx="100" cy="70" rx="48" ry="35" fill="${avatarState.hairColor}"/>
                                <ellipse cx="70" cy="100" rx="15" ry="40" fill="${avatarState.hairColor}"/>
                                <ellipse cx="130" cy="100" rx="15" ry="40" fill="${avatarState.hairColor}"/>
                            `;
                            break;
                        case 'curly':
                            avatarHairGroup.innerHTML = `
                                <circle cx="75" cy="70" r="20" fill="${avatarState.hairColor}"/>
                                <circle cx="100" cy="65" r="22" fill="${avatarState.hairColor}"/>
                                <circle cx="125" cy="70" r="20" fill="${avatarState.hairColor}"/>
                            `;
                            break;
                        case 'bald':
                            avatarHairGroup.innerHTML = '';
                            break;
                    }
                }

                // Update accessory
                if (avatarAccessory) {
                    switch (avatarState.accessory) {
                        case 'none':
                            avatarAccessory.style.display = 'none';
                            break;
                        case 'hat':
                            avatarAccessory.style.display = 'block';
                            avatarAccessory.innerHTML = `
                                <ellipse cx="100" cy="65" rx="35" ry="10" fill="#DC143C"/>
                                <rect x="80" y="50" width="40" height="15" rx="5" fill="#DC143C"/>
                                <circle cx="100" cy="48" r="4" fill="#fff"/>
                            `;
                            break;
                        case 'glasses':
                            avatarAccessory.style.display = 'block';
                            avatarAccessory.innerHTML = `
                                <circle cx="88" cy="95" r="12" fill="none" stroke="#2C2C2C" stroke-width="2"/>
                                <circle cx="112" cy="95" r="12" fill="none" stroke="#2C2C2C" stroke-width="2"/>
                                <line x1="100" y1="95" x2="100" y2="95" stroke="#2C2C2C" stroke-width="2"/>
                            `;
                            break;
                        case 'headphones':
                            avatarAccessory.style.display = 'block';
                            avatarAccessory.innerHTML = `
                                <path d="M 65 100 Q 65 60, 100 60 Q 135 60, 135 100" stroke="#9370DB" stroke-width="5" fill="none" stroke-linecap="round"/>
                                <rect x="60" y="95" width="10" height="20" rx="3" fill="#9370DB"/>
                                <rect x="130" y="95" width="10" height="20" rx="3" fill="#9370DB"/>
                            `;
                            break;
                    }
                }
            }

            // Color options
            const colorOptions = document.querySelectorAll('.color-option-modern');
            colorOptions.forEach(option => {
                option.addEventListener('click', () => {
                    const type = option.dataset.type;
                    const color = option.dataset.color;

                    // Remove selected from siblings
                    const siblings = option.parentElement.querySelectorAll('.color-option-modern');
                    siblings.forEach(s => s.classList.remove('selected'));
                    option.classList.add('selected');

                    // Update state
                    avatarState[type] = color;
                    updateAvatar();
                });
            });

            // Hairstyle options
            const hairstyleOptions = document.querySelectorAll('.hairstyle-option');
            hairstyleOptions.forEach(option => {
                option.addEventListener('click', () => {
                    const value = option.dataset.value;

                    // Remove selected from siblings
                    const siblings = option.parentElement.querySelectorAll('.hairstyle-option');
                    siblings.forEach(s => s.classList.remove('selected'));
                    option.classList.add('selected');

                    // Update state
                    avatarState.hairstyle = value;
                    updateAvatar();
                });
            });

            // Accessory options
            const accessoryOptions = document.querySelectorAll('.accessory-option');
            accessoryOptions.forEach(option => {
                option.addEventListener('click', () => {
                    const value = option.dataset.value;

                    // Remove selected from siblings
                    const siblings = option.parentElement.querySelectorAll('.accessory-option');
                    siblings.forEach(s => s.classList.remove('selected'));
                    option.classList.add('selected');

                    // Update state
                    avatarState.accessory = value;
                    updateAvatar();
                });
            });

            // Store avatar state for later retrieval
            window.currentAvatarState = avatarState;
        }, 100);
    },
    
    completeCharacterCreation() {
        const name = document.getElementById('heroName').value || 'Explorer';
        const avatar = window.currentAvatarState || {
            skinTone: '#FFD1A9',
            hairColor: '#8B4513',
            hairstyle: 'short',
            clothingColor: '#4A90E2',
            accessory: 'none'
        };

        UserData.update({ name, avatar });

        // Navigate to quest selection page instead of dashboard
        this.navigate('questSelection');
    },
    
    showHints(questId) {
        const quest = QUESTS.find(q => q.id === questId);
        if (!quest) return;
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal">
                <h2>💡 Hints</h2>
                ${quest.hints.map((hint, i) => `
                    <div class="hint-item">
                        <strong>Hint ${i + 1}:</strong>
                        <p>${hint}</p>
                    </div>
                `).join('')}
                <button class="btn btn-primary mt-4" onclick="this.closest('.modal-overlay').remove()">
                    Close
                </button>
            </div>
        `;
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
        
        document.body.appendChild(modal);
    },
    
    completeReflection(questId) {
        const reflection1 = document.getElementById('reflection1').value;
        const reflection2 = document.getElementById('reflection2').value;
        const reflection3 = document.getElementById('reflection3').value;
        const confidence = document.getElementById('confidence').value;

        if (!reflection1 || !reflection2 || !reflection3) {
            alert('Please complete all reflection prompts.');
            return;
        }

        if (reflection1.length < 20 || reflection2.length < 20 || reflection3.length < 20) {
            alert('Please write at least 20 characters for each reflection.');
            return;
        }

        const reflection = {
            whatWorked: reflection1,
            whatNext: reflection2,
            whoCanHelp: reflection3,
            confidence: parseInt(confidence),
            date: new Date().toISOString()
        };

        // Get quest info to handle both standalone and multi-level quests
        const questInfo = QuestHelper.getQuestInfo(questId);

        if (!questInfo) {
            alert('Quest not found.');
            return;
        }

        if (questInfo.isLevel) {
            // For multi-level quests
            const parentQuest = questInfo.parentQuest;

            // Save reflection for the parent quest
            UserData.saveReflection(parentQuest.id, reflection);

            // Award XP for all levels (only if not already awarded)
            const user = UserData.get();
            if (!user.completedQuests.includes(parentQuest.id)) {
                // Calculate total XP from all levels
                const totalXP = parentQuest.levels.reduce((sum, level) => sum + level.xp, 0);
                UserData.addXP(totalXP);

                // Mark parent quest as complete
                UserData.completeQuest(parentQuest.id);

                alert(`🎉 Reflection saved! You earned ${totalXP} XP for completing all levels!`);
            } else {
                alert('🎉 Reflection saved! Great job!');
            }
        } else {
            // For standalone quests
            UserData.saveReflection(questId, reflection);

            const user = UserData.get();
            if (!user.completedQuests.includes(questId)) {
                UserData.addXP(questInfo.quest.xp);
                UserData.completeQuest(questId);
            }

            alert('🎉 Reflection saved! Great job!');
        }

        this.navigate('dashboard');
    },
    
    resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            Storage.clear();
            UserData.init();
            this.navigate('welcome');
        }
    }
};

// Accessibility Functions
function toggleA11yPanel() {
    const panel = document.getElementById('a11yPanel');
    panel.classList.toggle('active');
}

// Close accessibility panel when clicking outside
document.addEventListener('click', (e) => {
    const controls = document.querySelector('.accessibility-controls');
    const panel = document.getElementById('a11yPanel');
    if (controls && !controls.contains(e.target)) {
        panel?.classList.remove('active');
    }
});

// Reduced Motion
document.addEventListener('DOMContentLoaded', () => {
    const reducedMotion = document.getElementById('reducedMotion');

    // Check for saved preference
    if (localStorage.getItem('reducedMotion') === 'true') {
        reducedMotion.checked = true;
        document.body.classList.add('reduced-motion');
    }

    reducedMotion.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.body.classList.add('reduced-motion');
            localStorage.setItem('reducedMotion', 'true');
        } else {
            document.body.classList.remove('reduced-motion');
            localStorage.setItem('reducedMotion', 'false');
        }
    });
});

// High Contrast
document.addEventListener('DOMContentLoaded', () => {
    const highContrast = document.getElementById('highContrast');

    // Check for saved preference
    if (localStorage.getItem('highContrast') === 'true') {
        highContrast.checked = true;
        document.body.classList.add('high-contrast');
    }

    highContrast.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.body.classList.add('high-contrast');
            localStorage.setItem('highContrast', 'true');
        } else {
            document.body.classList.remove('high-contrast');
            localStorage.setItem('highContrast', 'false');
        }
    });
});

// Dyslexia Font
document.addEventListener('DOMContentLoaded', () => {
    const dyslexiaFont = document.getElementById('dyslexiaFont');

    // Check for saved preference
    if (localStorage.getItem('dyslexiaFont') === 'true') {
        dyslexiaFont.checked = true;
        document.body.style.fontFamily = "'OpenDyslexic', 'Lexend', sans-serif";
    }

    dyslexiaFont.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.body.style.fontFamily = "'OpenDyslexic', 'Lexend', sans-serif";
            localStorage.setItem('dyslexiaFont', 'true');
        } else {
            document.body.style.fontFamily = "'Lexend', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
            localStorage.setItem('dyslexiaFont', 'false');
        }
    });
});

// Text Size
document.addEventListener('DOMContentLoaded', () => {
    const textSize = document.getElementById('textSize');

    // Check for saved preference
    const savedSize = localStorage.getItem('textSize');
    if (savedSize) {
        textSize.value = savedSize;
        document.documentElement.style.fontSize = savedSize + 'px';
    }

    textSize.addEventListener('input', (e) => {
        document.documentElement.style.fontSize = e.target.value + 'px';
        localStorage.setItem('textSize', e.target.value);
    });
});

// Read Page Aloud
function readPageAloud() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroSupporting = document.querySelector('.hero-supporting');

    if (heroSubtitle && heroSupporting) {
        const text = heroSubtitle.textContent + '. ' + heroSupporting.textContent;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.lang = 'en-US';
        window.speechSynthesis.cancel(); // Cancel any ongoing speech
        window.speechSynthesis.speak(utterance);
    } else {
        // If we're not on the welcome screen, read the main content
        const mainContent = document.querySelector('.screen');
        if (mainContent) {
            const headings = mainContent.querySelectorAll('h1, h2, h3, p');
            let text = '';
            headings.forEach((el, i) => {
                if (i < 5) { // Only read first 5 elements to avoid too much text
                    text += el.textContent + '. ';
                }
            });
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9;
            utterance.pitch = 1;
            utterance.lang = 'en-US';
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
        }
    }
}

// Show Continue Button for Returning Users
document.addEventListener('DOMContentLoaded', () => {
    // Add a small delay to ensure the DOM is ready
    setTimeout(() => {
        const continueBtn = document.getElementById('continueBtn');
        if (continueBtn) {
            const user = UserData.get();
            if (user.name) {
                continueBtn.classList.remove('hidden');
            }
        }
    }, 100);
});

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
