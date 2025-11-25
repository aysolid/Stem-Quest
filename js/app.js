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
            const colorOptions = document.querySelectorAll('.color-option');
            const avatarPreview = document.getElementById('avatarPreview');
            const avatar = { skinTone: '#FFD1A9', hairColor: '#8B4513', outfit: '#4A90E2' };
            
            colorOptions.forEach(option => {
                option.addEventListener('click', () => {
                    const type = option.dataset.type;
                    const color = option.dataset.color;
                    
                    // Remove selected from siblings
                    const siblings = option.parentElement.querySelectorAll('.color-option');
                    siblings.forEach(s => s.classList.remove('selected'));
                    option.classList.add('selected');
                    
                    // Update avatar
                    avatar[type] = color;
                    
                    // Update preview
                    if (type === 'skinTone') {
                        avatarPreview.style.background = color;
                    }
                });
            });
        }, 100);
    },
    
    completeCharacterCreation() {
        const name = document.getElementById('heroName').value || 'Explorer';
        const colorOptions = document.querySelectorAll('.color-option.selected');
        
        const avatar = {
            skinTone: '#FFD1A9',
            hairColor: '#8B4513',
            outfit: '#4A90E2'
        };
        
        colorOptions.forEach(option => {
            const type = option.dataset.type;
            const color = option.dataset.color;
            avatar[type] = color;
        });
        
        UserData.update({ name, avatar });
        this.navigate('dashboard');
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
        
        UserData.saveReflection(questId, reflection);
        
        const quest = QUESTS.find(q => q.id === questId);
        UserData.addXP(quest.xp);
        UserData.completeQuest(questId);
        
        alert('🎉 Reflection saved! Great job!');
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

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
