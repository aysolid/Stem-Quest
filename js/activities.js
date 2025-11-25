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
        
        let html = `
            <h3>🤖 Robot Grid</h3>
            <div class="robot-grid" style="grid-template-columns: repeat(${gridSize.cols}, 1fr);">
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
                    content = '⬜';
                } else if (isGoal) {
                    cellClass += ' goal';
                    content = '🔋';
                } else if (isRobot) {
                    content = '🤖';
                }
                
                html += `<div class="${cellClass}" data-x="${x}" data-y="${y}">${content}</div>`;
            }
        }
        
        html += `
            </div>
            
            <h3>Command Blocks</h3>
            <p>Drag commands to create your algorithm:</p>
            <div class="command-blocks">
                <div class="command-block" draggable="true" data-command="forward">↑ Forward</div>
                <div class="command-block" draggable="true" data-command="right">→ Turn Right</div>
                <div class="command-block" draggable="true" data-command="left">← Turn Left</div>
            </div>
            
            <h3>Your Algorithm</h3>
            <div class="sequence-zone" id="sequenceZone">
                <p style="color: #6b7280;">Drag commands here...</p>
            </div>
        `;
        
        container.innerHTML = html;
        this.setupDragAndDrop();
    },
    
    setupDragAndDrop() {
        const blocks = document.querySelectorAll('.command-block');
        const zone = document.getElementById('sequenceZone');
        
        blocks.forEach(block => {
            block.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('command', e.target.dataset.command);
                e.target.classList.add('dragging');
            });
            
            block.addEventListener('dragend', (e) => {
                e.target.classList.remove('dragging');
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
            this.currentAnswer.push(command);
            
            if (zone.querySelector('p')) {
                zone.innerHTML = '';
            }
            
            const item = document.createElement('span');
            item.className = 'sequence-item';
            item.textContent = command === 'forward' ? '↑ Forward' : 
                              command === 'right' ? '→ Right' : '← Left';
            item.onclick = () => {
                const index = Array.from(zone.children).indexOf(item);
                this.currentAnswer.splice(index, 1);
                item.remove();
                if (zone.children.length === 0) {
                    zone.innerHTML = '<p style="color: #6b7280;">Drag commands here...</p>';
                }
            };
            zone.appendChild(item);
            
            document.getElementById('questProgress').style.width = 
                Math.min((this.currentAnswer.length / 8) * 100, 90) + '%';
        });
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
