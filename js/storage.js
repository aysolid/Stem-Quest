// Storage Management
const Storage = {
    get(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Storage get error:', e);
            return null;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Storage set error:', e);
        }
    },

    remove(key) {
        localStorage.removeItem(key);
    },

    clear() {
        localStorage.clear();
    }
};

// User Data Manager
const UserData = {
    init() {
        if (!Storage.get('user')) {
            Storage.set('user', {
                name: '',
                avatar: { skinTone: '#FFD1A9', hairColor: '#8B4513', outfit: '#4A90E2' },
                preferences: { textSize: 'default', contrast: 'standard', motion: 'full', audio: true },
                stats: { xp: 0, level: 1, questsCompleted: 0, streak: 0 },
                completedQuests: [],
                progress: {}
            });
        }
        return Storage.get('user');
    },

    get() {
        return Storage.get('user') || this.init();
    },

    update(updates) {
        const user = this.get();
        const updated = { ...user, ...updates };
        Storage.set('user', updated);
        return updated;
    },

    addXP(amount) {
        const user = this.get();
        const newXP = user.stats.xp + amount;
        const newLevel = Math.floor(newXP / 500) + 1;
        user.stats.xp = newXP;
        user.stats.level = newLevel;
        Storage.set('user', user);
        return user;
    },

    completeQuest(questId) {
        const user = this.get();
        if (!user.completedQuests.includes(questId)) {
            user.completedQuests.push(questId);
            user.stats.questsCompleted++;
        }
        Storage.set('user', user);
        return user;
    },

    saveReflection(questId, reflection) {
        const user = this.get();
        if (!user.progress[questId]) {
            user.progress[questId] = {};
        }
        user.progress[questId].reflection = reflection;
        Storage.set('user', user);
    }
};

// Initialize user data on load
UserData.init();
