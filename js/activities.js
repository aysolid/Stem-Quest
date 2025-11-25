// Activity Engines
const Activities = {
    currentQuest: null,
    currentAnswer: null,
    
    init(questId) {
        this.currentQuest = QUESTS.find(q => q.id === questId);
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
        this.robotDirection = 0; // 0=up, 1=right, 2=down, 3=left

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
                    <div class="command-block-modern" draggable="true" data-command="forward" title="Move Forward">
                        <div class="command-icon">⬆️</div>
                        <div class="command-label">Forward</div>
                        <div class="command-tooltip">Move the robot one step forward</div>
                    </div>
                    <div class="command-block-modern" draggable="true" data-command="right" title="Turn Right">
                        <div class="command-icon">↩️</div>
                        <div class="command-label">Turn Right</div>
                        <div class="command-tooltip">Rotate 90° clockwise</div>
                    </div>
                    <div class="command-block-modern" draggable="true" data-command="left" title="Turn Left">
                        <div class="command-icon">↪️</div>
                        <div class="command-label">Turn Left</div>
                        <div class="command-tooltip">Rotate 90° counter-clockwise</div>
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

            const icon = command === 'forward' ? '⬆️' : command === 'right' ? '↩️' : '↪️';
            const label = command === 'forward' ? 'Forward' : command === 'right' ? 'Turn Right' : 'Turn Left';

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
        this.robotDirection = 0;

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
        let dir = 0; // 0=up, 1=right, 2=down, 3=left

        // Animate each command
        let step = 0;
        const executeStep = () => {
            if (step >= this.currentAnswer.length) {
                // Check if robot reached goal
                if (pos.x === goal.x && pos.y === goal.y) {
                    setTimeout(() => {
                        this.showSuccessAnimation();
                    }, 500);
                } else {
                    setTimeout(() => {
                        alert('🤔 Not quite there! The robot didn\'t reach the goal. Try again!');
                    }, 500);
                }
                return;
            }

            const command = this.currentAnswer[step];

            if (command === 'forward') {
                // Calculate new position based on direction
                let newX = pos.x;
                let newY = pos.y;

                if (dir === 0) newY -= 1; // up
                else if (dir === 1) newX += 1; // right
                else if (dir === 2) newY += 1; // down
                else if (dir === 3) newX -= 1; // left

                // Check boundaries
                if (newX < 0 || newX >= gridSize.cols || newY < 0 || newY >= gridSize.rows) {
                    alert('💥 Oops! The robot hit a wall!');
                    return;
                }

                // Check obstacles
                if (obstacles.some(o => o.x === newX && o.y === newY)) {
                    this.showBumpAnimation(newX, newY);
                    setTimeout(() => {
                        alert('💥 Oops! The robot hit an obstacle!');
                    }, 500);
                    return;
                }

                // Move robot
                this.animateRobotMove(pos, {x: newX, y: newY}, dir);
                pos.x = newX;
                pos.y = newY;
            } else if (command === 'right') {
                dir = (dir + 1) % 4;
                this.animateRobotRotate(dir);
            } else if (command === 'left') {
                dir = (dir - 1 + 4) % 4;
                this.animateRobotRotate(dir);
            }

            step++;
            setTimeout(executeStep, 600);
        };

        executeStep();
    },

    animateRobotMove(from, to, direction) {
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

    animateRobotRotate(direction) {
        const robot = document.getElementById('robotIcon');
        if (robot) {
            robot.style.transition = 'transform 0.3s ease';
            robot.style.transform = `rotate(${direction * 90}deg) scale(1.1)`;
            setTimeout(() => {
                robot.style.transform = `rotate(${direction * 90}deg)`;
            }, 300);
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
            alert('🎉 Excellent work! You solved it!');
            setTimeout(() => {
                App.navigate('reflection', this.currentQuest.id);
            }, 500);
        }, 1000);
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
        
        let html = '<h3>Find the Patterns</h3>';
        
        patterns.forEach((pattern, index) => {
            html += `
                <div class="pattern-display">
                    ${pattern.sequence.map(item => `
                        <div class="pattern-item ${item === '?' ? 'mystery' : ''}">${item}</div>
                    `).join('')}
                </div>
                
                <h4>What comes next?</h4>
                <div class="options-grid">
                    ${pattern.options.map(option => `
                        <button class="option-btn" 
                                data-pattern="${index}" 
                                data-answer="${option}"
                                onclick="Activities.selectOption(${index}, '${option}')">
                            ${option}
                        </button>
                    `).join('')}
                </div>
                <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;">
            `;
        });
        
        container.innerHTML = html;
        document.getElementById('questProgress').style.width = '33%';
    },
    
    selectOption(patternIndex, answer) {
        this.currentAnswer[patternIndex] = answer;
        
        const buttons = document.querySelectorAll(`[data-pattern="${patternIndex}"]`);
        buttons.forEach(btn => btn.classList.remove('selected'));
        
        event.target.classList.add('selected');
        
        const totalPatterns = this.currentQuest.activity.patterns.length;
        const answered = Object.keys(this.currentAnswer).length;
        document.getElementById('questProgress').style.width = 
            Math.min((answered / totalPatterns) * 100, 90) + '%';
    },
    
    renderDecomposition(container) {
        const { categories, items } = this.currentQuest.activity;
        this.currentAnswer = {};
        
        let html = `
            <h3>Sort the Items</h3>
            <p>Drag each item to the correct category:</p>
        `;
        
        categories.forEach(category => {
            html += `
                <div class="quest-card mt-4">
                    <h4>${category}</h4>
                    <div class="sequence-zone" id="category-${category}" data-category="${category}">
                        <p style="color: #6b7280;">Drop items here...</p>
                    </div>
                </div>
            `;
        });
        
        html += `
            <h3 class="mt-8">Items to Sort</h3>
            <div class="command-blocks">
                ${items.map((item, i) => `
                    <div class="command-block" draggable="true" data-item="${i}" data-name="${item.name}">
                        ${item.name}
                    </div>
                `).join('')}
            </div>
        `;
        
        container.innerHTML = html;
        this.setupDecompositionDrag();
    },
    
    setupDecompositionDrag() {
        const items = document.querySelectorAll('[data-item]');
        const zones = document.querySelectorAll('[data-category]');
        
        items.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('item', e.target.dataset.item);
                e.dataTransfer.setData('name', e.target.dataset.name);
            });
        });
        
        zones.forEach(zone => {
            zone.addEventListener('dragover', (e) => e.preventDefault());
            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                const itemIndex = e.dataTransfer.getData('item');
                const itemName = e.dataTransfer.getData('name');
                const category = zone.dataset.category;
                
                this.currentAnswer[itemIndex] = category;
                
                if (zone.querySelector('p')) {
                    zone.innerHTML = '';
                }
                
                const dropped = document.createElement('span');
                dropped.className = 'sequence-item';
                dropped.textContent = itemName;
                zone.appendChild(dropped);
                
                const original = document.querySelector(`[data-item="${itemIndex}"]`);
                if (original) original.style.display = 'none';
                
                const total = this.currentQuest.activity.items.length;
                const placed = Object.keys(this.currentAnswer).length;
                document.getElementById('questProgress').style.width = 
                    Math.min((placed / total) * 100, 90) + '%';
            });
        });
    },
    
    submit(questId) {
        const quest = QUESTS.find(q => q.id === questId);
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
            alert('🎉 Excellent work! You solved it!');
            setTimeout(() => {
                App.navigate('reflection', questId);
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
