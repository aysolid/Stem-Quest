// Activity Engines
const Activities = {
    currentQuest: null,
    currentAnswer: null,

    init(questId) {
        // Use helper to find quest
        this.currentQuest = QuestHelper.findQuest(questId);

        if (!this.currentQuest) return;
        
        const container = document.getElementById('activityContent');
        
        switch (this.currentQuest.activityType) {
            case 'sequencing':
                this.renderSequencing(container);
                break;
            case 'pattern':
                this.renderPattern(container);
                break;
            case 'decomposition':
                this.renderDecomposition(container);
                break;
        }
        
        document.getElementById('questProgress').style.width = '25%';
    },
    
    renderSequencing(container) {
        const { gridSize, robotStart, goal, obstacles } = this.currentQuest.activity;
        this.currentAnswer = [];
        this.robotPosition = { ...robotStart };

        let html = `
            <div class="robot-quest-container">
                <h3 class="quest-section-title">🤖 Robot Grid</h3>
                <div class="robot-grid-wrapper">
                    <div class="robot-grid" id="robotGrid" style="grid-template-columns: repeat(${gridSize.cols}, 1fr);">
        `;

        for (let y = 0; y < gridSize.rows; y++) {
            for (let x = 0; x < gridSize.cols; x++) {
                const isRobot = x === robotStart.x && y === robotStart.y;
                const isGoal = x === goal.x && y === goal.y;
                const isObstacle = obstacles.some(o => o.x === x && o.y === y);

                let cellClass = 'grid-cell';
                let content = '';

                if (isObstacle) {
                    cellClass += ' obstacle';
                    content = '<span class="obstacle-icon">🚧</span>';
                } else if (isGoal) {
                    cellClass += ' goal';
                    content = '<span class="goal-icon">🔋</span>';
                } else if (isRobot) {
                    content = '<span class="robot-icon" id="robotIcon">🤖</span>';
                }

                html += `<div class="${cellClass}" data-x="${x}" data-y="${y}">${content}</div>`;
            }
        }

        html += `
                    </div>
                </div>

                <h3 class="quest-section-title">💻 Command Blocks</h3>
                <p class="quest-instruction">Drag icon-based commands to build your algorithm:</p>
                <div class="command-blocks-modern">
                    <div class="command-block-modern" draggable="true" data-command="up" title="Move Up">
                        <div class="command-icon">⬆️</div>
                        <div class="command-label">Move Up</div>
                        <div class="command-tooltip">Move the robot one step up</div>
                    </div>
                    <div class="command-block-modern" draggable="true" data-command="down" title="Move Down">
                        <div class="command-icon">⬇️</div>
                        <div class="command-label">Move Down</div>
                        <div class="command-tooltip">Move the robot one step down</div>
                    </div>
                    <div class="command-block-modern" draggable="true" data-command="left" title="Move Left">
                        <div class="command-icon">⬅️</div>
                        <div class="command-label">Move Left</div>
                        <div class="command-tooltip">Move the robot one step left</div>
                    </div>
                    <div class="command-block-modern" draggable="true" data-command="right" title="Move Right">
                        <div class="command-icon">➡️</div>
                        <div class="command-label">Move Right</div>
                        <div class="command-tooltip">Move the robot one step right</div>
                    </div>
                </div>

                <h3 class="quest-section-title">📋 Your Algorithm</h3>
                <div class="sequence-zone-modern" id="sequenceZone">
                    <p class="sequence-placeholder">Drag commands here to build your algorithm...</p>
                </div>

                <div class="algorithm-controls">
                    <button class="btn-control btn-run" onclick="Activities.runAlgorithm()">
                        <span>▶️</span> Run Algorithm
                    </button>
                    <button class="btn-control btn-reset" onclick="Activities.resetAlgorithm()">
                        <span>🔄</span> Reset
                    </button>
                </div>
            </div>
        `;

        container.innerHTML = html;
        this.setupDragAndDrop();
    },
    
    setupDragAndDrop() {
        const blocks = document.querySelectorAll('.command-block-modern');
        const zone = document.getElementById('sequenceZone');

        blocks.forEach(block => {
            block.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('command', e.target.closest('.command-block-modern').dataset.command);
                e.target.closest('.command-block-modern').classList.add('dragging');
            });

            block.addEventListener('dragend', (e) => {
                e.target.closest('.command-block-modern').classList.remove('dragging');
            });
        });

        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('drag-over');
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('drag-over');
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('drag-over');

            const command = e.dataTransfer.getData('command');
            if (!command) return;

            this.currentAnswer.push(command);

            if (zone.querySelector('.sequence-placeholder')) {
                zone.innerHTML = '';
            }

            const item = document.createElement('div');
            item.className = 'sequence-item-modern';
            item.dataset.command = command;
            item.draggable = true;

            const commandMap = {
                'up': { icon: '⬆️', label: 'Move Up' },
                'down': { icon: '⬇️', label: 'Move Down' },
                'left': { icon: '⬅️', label: 'Move Left' },
                'right': { icon: '➡️', label: 'Move Right' }
            };
            const icon = commandMap[command]?.icon || '❓';
            const label = commandMap[command]?.label || 'Unknown';

            item.innerHTML = `
                <span class="seq-icon">${icon}</span>
                <span class="seq-label">${label}</span>
                <button class="seq-delete" onclick="Activities.removeCommand(this)">✕</button>
            `;

            // Make sequence items reorderable
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/html', item.innerHTML);
                item.classList.add('dragging');
            });

            item.addEventListener('dragend', () => {
                item.classList.remove('dragging');
            });

            zone.appendChild(item);

            document.getElementById('questProgress').style.width =
                Math.min((this.currentAnswer.length / 8) * 100, 90) + '%';
        });

        // Allow reordering within zone
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            const dragging = document.querySelector('.sequence-item-modern.dragging');
            if (!dragging) return;

            const afterElement = this.getDragAfterElement(zone, e.clientY);
            if (afterElement == null) {
                zone.appendChild(dragging);
            } else {
                zone.insertBefore(dragging, afterElement);
            }
        });
    },

    getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.sequence-item-modern:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;

            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    },

    removeCommand(button) {
        const item = button.closest('.sequence-item-modern');
        const index = Array.from(item.parentElement.children).indexOf(item);
        this.currentAnswer.splice(index, 1);
        item.remove();

        const zone = document.getElementById('sequenceZone');
        if (zone.children.length === 0) {
            zone.innerHTML = '<p class="sequence-placeholder">Drag commands here to build your algorithm...</p>';
        }

        document.getElementById('questProgress').style.width =
            Math.min((this.currentAnswer.length / 8) * 100, 90) + '%';
    },

    resetAlgorithm() {
        const zone = document.getElementById('sequenceZone');
        zone.innerHTML = '<p class="sequence-placeholder">Drag commands here to build your algorithm...</p>';
        this.currentAnswer = [];

        // Reset robot position
        const { robotStart } = this.currentQuest.activity;
        this.robotPosition = { ...robotStart };

        // Reset robot on grid
        const allCells = document.querySelectorAll('.grid-cell');
        allCells.forEach(cell => {
            const existingRobot = cell.querySelector('.robot-icon');
            if (existingRobot) existingRobot.remove();
        });

        const startCell = document.querySelector(`[data-x="${robotStart.x}"][data-y="${robotStart.y}"]`);
        if (startCell) {
            startCell.innerHTML = '<span class="robot-icon" id="robotIcon">🤖</span>';
        }

        document.getElementById('questProgress').style.width = '25%';
    },

    runAlgorithm() {
        if (this.currentAnswer.length === 0) {
            alert('⚠️ Please add some commands first!');
            return;
        }

        const { gridSize, robotStart, goal, obstacles } = this.currentQuest.activity;
        let pos = { ...robotStart };

        // Animate each command
        let step = 0;
        const executeStep = () => {
            if (step >= this.currentAnswer.length) {
                // Store final position
                this.lastRobotPosition = { ...pos };

                // Check if robot reached goal
                if (pos.x === goal.x && pos.y === goal.y) {
                    setTimeout(() => {
                        this.showSuccessAnimation();
                    }, 500);
                } else {
                    setTimeout(() => {
                        this.showLastPositionInfo(pos, goal);
                    }, 500);
                }
                return;
            }

            const command = this.currentAnswer[step];

            // Calculate new position based on command
            let newX = pos.x;
            let newY = pos.y;

            if (command === 'up') {
                newY -= 1;
            } else if (command === 'down') {
                newY += 1;
            } else if (command === 'left') {
                newX -= 1;
            } else if (command === 'right') {
                newX += 1;
            }

            // Check boundaries
            if (newX < 0 || newX >= gridSize.cols || newY < 0 || newY >= gridSize.rows) {
                this.lastRobotPosition = { ...pos };
                setTimeout(() => {
                    this.showLastPositionInfo(pos, goal, 'wall');
                }, 100);
                return;
            }

            // Check obstacles
            if (obstacles.some(o => o.x === newX && o.y === newY)) {
                this.lastRobotPosition = { ...pos };
                this.showBumpAnimation(newX, newY);
                setTimeout(() => {
                    this.showLastPositionInfo(pos, goal, 'obstacle');
                }, 500);
                return;
            }

            // Move robot
            this.animateRobotMove(pos, {x: newX, y: newY});
            pos.x = newX;
            pos.y = newY;

            step++;
            setTimeout(executeStep, 600);
        };

        executeStep();
    },

    showLastPositionInfo(lastPos, goal, errorType = null) {
        // Calculate distance to goal
        const distanceX = Math.abs(goal.x - lastPos.x);
        const distanceY = Math.abs(goal.y - lastPos.y);
        const totalDistance = distanceX + distanceY;

        let message = '';
        if (errorType === 'wall') {
            message = `💥 Oops! The robot hit a wall!\n\n`;
        } else if (errorType === 'obstacle') {
            message = `💥 Oops! The robot hit an obstacle!\n\n`;
        } else {
            message = `🤔 Not quite there! The robot didn't reach the goal.\n\n`;
        }

        message += `📍 Last Position: (${lastPos.x}, ${lastPos.y})\n`;
        message += `🎯 Goal Position: (${goal.x}, ${goal.y})\n`;
        message += `📏 Distance to Goal: ${totalDistance} steps\n\n`;

        if (distanceX > 0) {
            const horizontalDir = goal.x > lastPos.x ? 'right' : 'left';
            message += `💡 Hint: Try moving ${distanceX} step(s) ${horizontalDir}\n`;
        }
        if (distanceY > 0) {
            const verticalDir = goal.y > lastPos.y ? 'down' : 'up';
            message += `💡 Hint: Try moving ${distanceY} step(s) ${verticalDir}\n`;
        }

        alert(message);
    },

    animateRobotMove(from, to) {
        const fromCell = document.querySelector(`[data-x="${from.x}"][data-y="${from.y}"]`);
        const toCell = document.querySelector(`[data-x="${to.x}"][data-y="${to.y}"]`);
        const robot = document.getElementById('robotIcon');

        if (robot && fromCell && toCell) {
            robot.style.transition = 'transform 0.4s ease';
            robot.style.transform = 'scale(1.2)';

            setTimeout(() => {
                fromCell.innerHTML = '';
                toCell.innerHTML = '<span class="robot-icon" id="robotIcon">🤖</span>';
                robot.style.transform = 'scale(1)';
            }, 200);
        }
    },

    showBumpAnimation(x, y) {
        const cell = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
        if (cell) {
            cell.style.transition = 'transform 0.1s ease';
            cell.style.transform = 'scale(1.1)';
            cell.style.background = '#fee2e2';
            setTimeout(() => {
                cell.style.transform = 'scale(1)';
                cell.style.background = '';
            }, 400);
        }
    },

    showSuccessAnimation() {
        const goal = document.querySelector('.goal');
        if (goal) {
            goal.style.animation = 'pulse 0.5s ease 3';
        }

        // Create confetti effect
        this.createConfetti();

        setTimeout(() => {
            this.handleQuestCompletion();
        }, 1000);
    },

    handleQuestCompletion() {
        const questInfo = QuestHelper.getQuestInfo(this.currentQuest.id);

        if (questInfo.isLevel) {
            // This is a level in a multi-level quest
            // First, mark this level as completed and award XP
            const user = UserData.get();
            if (!user.completedQuests.includes(this.currentQuest.id)) {
                UserData.addXP(this.currentQuest.xp);
                UserData.completeQuest(this.currentQuest.id);
            }

            if (questInfo.nextLevel) {
                // There's a next level - show congratulations and prompt to continue
                const message = `🎉 Excellent work! You completed ${questInfo.quest.title}!\n\n` +
                    `You earned ${this.currentQuest.xp} XP!\n` +
                    `You've finished level ${questInfo.levelIndex + 1} of ${questInfo.totalLevels}.\n\n` +
                    `Ready for the next challenge: ${questInfo.nextLevel.title}?`;

                if (confirm(message)) {
                    // Navigate to the next level
                    App.navigate('questPlay', questInfo.nextLevel.id);
                } else {
                    // User wants to take a break - go back to dashboard
                    App.navigate('dashboard');
                }
            } else {
                // This was the last level - go to reflection
                alert(`🎉 Excellent work! You completed the final level and earned ${this.currentQuest.xp} XP!`);
                setTimeout(() => {
                    App.navigate('reflection', this.currentQuest.id);
                }, 500);
            }
        } else {
            // This is a standalone quest - award XP and go to reflection
            const user = UserData.get();
            if (!user.completedQuests.includes(this.currentQuest.id)) {
                UserData.addXP(this.currentQuest.xp);
                UserData.completeQuest(this.currentQuest.id);
            }

            alert(`🎉 Excellent work! You solved it and earned ${this.currentQuest.xp} XP!`);
            setTimeout(() => {
                App.navigate('reflection', this.currentQuest.id);
            }, 500);
        }
    },

    createConfetti() {
        const colors = ['#0d9488', '#2563eb', '#a78bfa', '#f59e0b', '#22c55e'];
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '10000';
            document.body.appendChild(confetti);

            const duration = Math.random() * 3 + 2;
            const rotation = Math.random() * 360;

            confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(100vh) rotate(${rotation}deg)`, opacity: 0 }
            ], {
                duration: duration * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });

            setTimeout(() => confetti.remove(), duration * 1000);
        }
    },
    
    renderPattern(container) {
        const { patterns } = this.currentQuest.activity;
        this.currentAnswer = {};
        this.patternHintsShown = {};

        let html = `
            <div class="pattern-quest-container">
                <h3 class="quest-section-title">🔍 Find the Patterns</h3>
                <p class="quest-instruction">Analyze each sequence and find what comes next!</p>
        `;

        patterns.forEach((pattern, index) => {
            const patternTypeLabel = {
                'arithmetic': '➕ Arithmetic',
                'geometric': '✖️ Geometric',
                'alternating': '🔄 Alternating',
                'missing-middle': '❓ Missing Value',
                'visual-sequence': '👁️ Visual'
            }[pattern.type] || '🔍 Pattern';

            html += `
                <div class="pattern-card" id="pattern-${index}">
                    <div class="pattern-type-badge">${patternTypeLabel}</div>
                    <div class="pattern-display">
                        ${pattern.sequence.map(item => `
                            <div class="pattern-item ${item === '?' ? 'mystery' : ''}">${item}</div>
                        `).join('')}
                    </div>

                    <div class="pattern-hint-container" id="hint-${index}" style="display: none;">
                        <div class="hint-box">
                            <span class="hint-icon">💡</span>
                            <span class="hint-text">${pattern.hint}</span>
                        </div>
                    </div>

                    <div class="pattern-controls">
                        <button class="btn-hint" onclick="Activities.showPatternHint(${index})" id="hint-btn-${index}">
                            <span>💡</span> Need a hint?
                        </button>
                    </div>

                    <h4 class="pattern-question">What comes next?</h4>
                    <div class="options-grid">
                        ${pattern.options.map(option => `
                            <button class="option-btn"
                                    data-pattern="${index}"
                                    data-answer="${option}"
                                    onclick="Activities.selectPatternOption(${index}, '${option}')">
                                ${option}
                            </button>
                        `).join('')}
                    </div>
                    <div class="pattern-feedback" id="feedback-${index}"></div>
                </div>
            `;
        });

        html += '</div>';

        container.innerHTML = html;
        document.getElementById('questProgress').style.width = '25%';
    },
    
    showPatternHint(patternIndex) {
        const hintContainer = document.getElementById(`hint-${patternIndex}`);
        const hintBtn = document.getElementById(`hint-btn-${patternIndex}`);

        if (hintContainer.style.display === 'none') {
            hintContainer.style.display = 'block';
            hintContainer.style.animation = 'slideDown 0.3s ease-out';
            hintBtn.innerHTML = '<span>🙈</span> Hide hint';
            this.patternHintsShown[patternIndex] = true;
        } else {
            hintContainer.style.display = 'none';
            hintBtn.innerHTML = '<span>💡</span> Need a hint?';
        }
    },

    selectPatternOption(patternIndex, answer) {
        const pattern = this.currentQuest.activity.patterns[patternIndex];
        const buttons = document.querySelectorAll(`[data-pattern="${patternIndex}"]`);
        const feedbackDiv = document.getElementById(`feedback-${patternIndex}`);
        const patternCard = document.getElementById(`pattern-${patternIndex}`);

        // Remove previous selections
        buttons.forEach(btn => {
            btn.classList.remove('selected', 'correct-answer', 'wrong-answer');
            btn.disabled = false;
        });

        // Check if answer is correct
        const isCorrect = String(answer) === String(pattern.answer);
        const selectedButton = event.target;

        if (isCorrect) {
            selectedButton.classList.add('correct-answer');
            this.currentAnswer[patternIndex] = answer;

            // Show success feedback
            feedbackDiv.innerHTML = `
                <div class="feedback-success">
                    <span class="feedback-icon">✅</span>
                    <span class="feedback-text">Excellent! You found the pattern!</span>
                </div>
            `;
            feedbackDiv.style.animation = 'slideDown 0.3s ease-out';

            // Disable all buttons for this pattern
            buttons.forEach(btn => btn.disabled = true);

            // Add success animation to card
            patternCard.style.animation = 'successPulse 0.5s ease';
            setTimeout(() => {
                patternCard.style.animation = '';
            }, 500);
        } else {
            selectedButton.classList.add('wrong-answer');

            // Show gentle error feedback with shake animation
            feedbackDiv.innerHTML = `
                <div class="feedback-error">
                    <span class="feedback-icon">🤔</span>
                    <span class="feedback-text">Not quite! Try again or use the hint button.</span>
                </div>
            `;
            feedbackDiv.style.animation = 'shake 0.5s ease';

            // Shake the card
            patternCard.style.animation = 'shake 0.5s ease';
            setTimeout(() => {
                patternCard.style.animation = '';
                feedbackDiv.style.animation = '';
                // Clear feedback after a moment
                setTimeout(() => {
                    feedbackDiv.innerHTML = '';
                }, 2000);
            }, 500);

            // Re-enable button after animation
            setTimeout(() => {
                selectedButton.classList.remove('wrong-answer');
            }, 1000);
        }

        // Update progress
        const totalPatterns = this.currentQuest.activity.patterns.length;
        const answered = Object.keys(this.currentAnswer).length;
        document.getElementById('questProgress').style.width =
            Math.min(25 + (answered / totalPatterns) * 65, 90) + '%';
    },

    selectOption(patternIndex, answer) {
        // Legacy function - redirect to new function
        this.selectPatternOption(patternIndex, answer);
    },
    
    renderDecomposition(container) {
        const { categories, items } = this.currentQuest.activity;
        this.currentAnswer = {};
        this.originalItemOrder = [...items];
        this.originalItemsState = items.map((item, i) => ({index: i, name: item.name, category: item.category, icon: item.icon}));

        let html = `
            <div class="data-sorter-container">
                <h3 class="quest-section-title">🗂️ Sort the Items</h3>
                <p class="quest-instruction">Drag each item to its correct category. Items can be moved between categories!</p>

                <div class="sorter-controls">
                    <button class="btn-shuffle" onclick="Activities.resetItems()">
                        <span>🔄</span> Reset Items
                    </button>
                </div>

                <div class="sorter-layout">
                    <div class="sorter-items-section">
                        <h3 class="quest-section-title">📦 Items to Sort</h3>
                        <div class="items-grid" id="itemsGrid">
                            ${items.map((item, i) => `
                                <div class="sortable-item" draggable="true" data-item="${i}" data-name="${item.name}" data-category="${item.category}">
                                    <span class="item-icon">${item.icon || '📄'}</span>
                                    <span class="item-name">${item.name}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="sorter-categories-section">
                        <h3 class="quest-section-title">📂 Categories</h3>
                        <div class="categories-container">
        `;

        categories.forEach(cat => {
            const categoryName = cat.name || cat;
            const categoryIcon = cat.icon || '📁';
            const categoryColor = cat.color || '#f3f4f6';

            html += `
                <div class="category-bin" id="category-${categoryName}" data-category="${categoryName}" style="--category-color: ${categoryColor}">
                    <div class="category-header">
                        <span class="category-icon">${categoryIcon}</span>
                        <h4 class="category-title">${categoryName}</h4>
                    </div>
                    <div class="category-drop-zone" data-category="${categoryName}">
                        <p class="drop-placeholder">Drop items here...</p>
                    </div>
                </div>
            `;
        });

        html += `
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
        this.setupDecompositionDrag();
        document.getElementById('questProgress').style.width = '25%';
    },
    
    setupDecompositionDrag() {
        const setupItemDrag = (item) => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('item', item.dataset.item);
                e.dataTransfer.setData('name', item.dataset.name);
                e.dataTransfer.setData('category', item.dataset.category);
                item.classList.add('dragging');
            });

            item.addEventListener('dragend', (e) => {
                item.classList.remove('dragging');
            });
        };

        const items = document.querySelectorAll('.sortable-item');
        items.forEach(setupItemDrag);

        const zones = document.querySelectorAll('.category-drop-zone');

        zones.forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.classList.add('drag-over');
            });

            zone.addEventListener('dragleave', (e) => {
                if (e.target === zone) {
                    zone.classList.remove('drag-over');
                }
            });

            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('drag-over');

                const itemIndex = e.dataTransfer.getData('item');
                const itemName = e.dataTransfer.getData('name');
                const itemCategory = e.dataTransfer.getData('category');
                const categoryName = zone.dataset.category;

                // Find and move the item
                const draggedItem = document.querySelector(`[data-item="${itemIndex}"]`);
                if (!draggedItem) return;

                // Update answer
                this.currentAnswer[itemIndex] = categoryName;

                // Remove placeholder if exists
                const placeholder = zone.querySelector('.drop-placeholder');
                if (placeholder) {
                    placeholder.remove();
                }

                // Move item to zone
                zone.appendChild(draggedItem);
                draggedItem.classList.add('placed-item');

                // Add remove button if not present
                if (!draggedItem.querySelector('.item-remove')) {
                    const removeBtn = document.createElement('button');
                    removeBtn.className = 'item-remove';
                    removeBtn.innerHTML = '✕';
                    removeBtn.onclick = (e) => {
                        e.stopPropagation();
                        this.removeItemFromCategory(itemIndex);
                    };
                    draggedItem.appendChild(removeBtn);
                }

                // Update progress
                const total = this.currentQuest.activity.items.length;
                const placed = Object.keys(this.currentAnswer).length;
                document.getElementById('questProgress').style.width =
                    Math.min(25 + (placed / total) * 65, 90) + '%';

                // Show placeholder if zone is empty
                this.updateDropZonePlaceholders();
            });
        });
    },

    removeItemFromCategory(itemIndex) {
        const item = document.querySelector(`[data-item="${itemIndex}"]`);
        if (!item) return;

        // Remove from answer
        delete this.currentAnswer[itemIndex];

        // Remove the item's remove button
        const removeBtn = item.querySelector('.item-remove');
        if (removeBtn) removeBtn.remove();

        // Move back to items grid
        item.classList.remove('placed-item');
        const itemsGrid = document.getElementById('itemsGrid');
        itemsGrid.appendChild(item);

        // Update progress
        const total = this.currentQuest.activity.items.length;
        const placed = Object.keys(this.currentAnswer).length;
        document.getElementById('questProgress').style.width =
            Math.min(25 + (placed / total) * 65, 90) + '%';

        // Update placeholders
        this.updateDropZonePlaceholders();
    },

    updateDropZonePlaceholders() {
        const zones = document.querySelectorAll('.category-drop-zone');
        zones.forEach(zone => {
            const hasItems = zone.querySelectorAll('.sortable-item').length > 0;
            const hasPlaceholder = zone.querySelector('.drop-placeholder');

            if (!hasItems && !hasPlaceholder) {
                const placeholder = document.createElement('p');
                placeholder.className = 'drop-placeholder';
                placeholder.textContent = 'Drop items here...';
                zone.appendChild(placeholder);
            } else if (hasItems && hasPlaceholder) {
                hasPlaceholder.remove();
            }
        });
    },

    resetItems() {
        const itemsGrid = document.getElementById('itemsGrid');

        // Remove all items from categories and reset answer
        this.currentAnswer = {};

        // Get all sortable items from anywhere in the document
        const allItems = document.querySelectorAll('.sortable-item');
        allItems.forEach(item => {
            const removeBtn = item.querySelector('.item-remove');
            if (removeBtn) removeBtn.remove();
            item.classList.remove('placed-item');
        });

        // Clear items grid and repopulate with original items
        itemsGrid.innerHTML = '';
        this.originalItemsState.forEach((itemData) => {
            const existingItem = document.querySelector(`[data-item="${itemData.index}"]`);
            if (existingItem) {
                itemsGrid.appendChild(existingItem);
            }
        });

        // Update placeholders
        this.updateDropZonePlaceholders();

        // Update progress
        document.getElementById('questProgress').style.width = '25%';

        // Add reset animation
        itemsGrid.style.animation = 'shuffle 0.5s ease';
        setTimeout(() => {
            itemsGrid.style.animation = '';
        }, 500);
    },

    shuffleItems() {
        // Keep for backward compatibility, but redirect to resetItems
        this.resetItems();
    },
    
    submit(questId) {
        // Use helper to find quest
        const quest = QuestHelper.findQuest(questId);

        if (!quest) return;

        let isCorrect = false;

        switch (quest.activityType) {
            case 'sequencing':
                isCorrect = this.checkSequencing();
                break;
            case 'pattern':
                isCorrect = this.checkPattern();
                break;
            case 'decomposition':
                isCorrect = this.checkDecomposition();
                break;
        }

        if (isCorrect) {
            document.getElementById('questProgress').style.width = '100%';
            this.createConfetti();
            setTimeout(() => {
                this.handleQuestCompletion();
            }, 1000);
        } else {
            alert('Not quite right. Try again! Use hints if you need help.');
        }
    },
    
    checkSequencing() {
        const solution = this.currentQuest.activity.solution;
        if (this.currentAnswer.length !== solution.length) return false;
        
        for (let i = 0; i < solution.length; i++) {
            if (this.currentAnswer[i] !== solution[i]) return false;
        }
        return true;
    },
    
    checkPattern() {
        const patterns = this.currentQuest.activity.patterns;
        
        for (let i = 0; i < patterns.length; i++) {
            const correct = String(patterns[i].answer);
            const answer = String(this.currentAnswer[i]);
            if (correct !== answer) return false;
        }
        return true;
    },
    
    checkDecomposition() {
        const items = this.currentQuest.activity.items;
        
        for (let i = 0; i < items.length; i++) {
            if (this.currentAnswer[i] !== items[i].category) return false;
        }
        return true;
    }
};
