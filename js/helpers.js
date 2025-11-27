// Quest Helper Utilities
const QuestHelper = {
    // Find quest information - works for both parent quests and nested levels
    findQuest(questId) {
        // First try to find in main QUESTS array
        let quest = QUESTS.find(q => q.id === questId);

        // If not found, search within levels
        if (!quest) {
            for (const parentQuest of QUESTS) {
                if (parentQuest.levels) {
                    const level = parentQuest.levels.find(l => l.id === questId);
                    if (level) {
                        quest = level;
                        break;
                    }
                }
            }
        }

        return quest;
    },

    // Get parent quest and level information
    getQuestInfo(questId) {
        // Check if this is a parent quest
        const parentQuest = QUESTS.find(q => q.id === questId);
        if (parentQuest && !parentQuest.levels) {
            return { quest: parentQuest, isLevel: false };
        }

        // Check if this is a level within a parent quest
        for (const parent of QUESTS) {
            if (parent.levels) {
                const levelIndex = parent.levels.findIndex(l => l.id === questId);
                if (levelIndex !== -1) {
                    return {
                        quest: parent.levels[levelIndex],
                        isLevel: true,
                        parentQuest: parent,
                        levelIndex: levelIndex,
                        totalLevels: parent.levels.length,
                        nextLevel: levelIndex < parent.levels.length - 1 ? parent.levels[levelIndex + 1] : null
                    };
                }
            }
        }

        // If we reach here, it's a standalone quest
        return parentQuest ? { quest: parentQuest, isLevel: false } : null;
    },

    // Check if all levels in a parent quest are completed
    areAllLevelsCompleted(parentQuestId, completedQuests) {
        const parentQuest = QUESTS.find(q => q.id === parentQuestId);
        if (!parentQuest || !parentQuest.levels) return false;

        return parentQuest.levels.every(level => completedQuests.includes(level.id));
    }
};
