/**
 * AlgoQuest Client-Side Dynamic State & Progression Engine
 * Ensures 100% realistic user states (Fresh New User vs Demo Veteran)
 * and guarantees smooth sequential stage progression without navigation bugs.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'algoquest_user_state_v3';

  // 1. Pristine Brand New User Default
  const DEFAULT_NEW_USER = {
    mode: 'new',
    username: 'AlgoKnight',
    level: 1,
    levelName: 'Level 1: Foundations',
    sublevelId: '1.1',
    sublevelName: 'Complexity & Big-O Foundations',
    xp: 0,
    gems: 100,
    hearts: 5,
    maxHearts: 5,
    streak: 0,
    league: 'Bronze',
    problemsSolved: 0,
    currentStage: 1,
    completedStages: [], // Stages 1 through 8 completed
    clearedNodes: 0,
  };

  // 2. Demo Veteran User State
  const DEMO_VETERAN_USER = {
    mode: 'demo',
    username: 'MasterCoder',
    level: 14,
    levelName: 'Level 2: Linear Data Structures',
    sublevelId: '2.3',
    sublevelName: 'Array Two-Pointers & In-Place Swapping',
    xp: 1250,
    gems: 450,
    hearts: 3,
    maxHearts: 5,
    streak: 7,
    league: 'Diamond',
    problemsSolved: 42,
    currentStage: 8,
    completedStages: [1, 2, 3, 4, 5, 6, 7],
    clearedNodes: 5,
  };

  // State Manager
  const AlgoQuest = {
    getState() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
          this.setState(DEFAULT_NEW_USER);
          return DEFAULT_NEW_USER;
        }
        return JSON.parse(raw);
      } catch (e) {
        return DEFAULT_NEW_USER;
      }
    },

    setState(state) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (e) {}
    },

    resetToNewUser() {
      this.setState(DEFAULT_NEW_USER);
      window.location.reload();
    },

    setDemoMode() {
      this.setState(DEMO_VETERAN_USER);
      window.location.reload();
    },

    completeStage(stageNumber, xpReward = 10) {
      const state = this.getState();
      if (!state.completedStages.includes(stageNumber)) {
        state.completedStages.push(stageNumber);
        state.xp += xpReward;
        state.problemsSolved += 1;
      }
      state.currentStage = Math.max(state.currentStage, stageNumber + 1);
      if (state.completedStages.length >= 6) {
        state.clearedNodes = Math.max(state.clearedNodes, 1);
      }
      this.setState(state);
    },

    consumeHeart() {
      const state = this.getState();
      if (state.hearts > 0) {
        state.hearts -= 1;
        this.setState(state);
      }
      return state.hearts;
    },

    refillHearts() {
      const state = this.getState();
      if (state.gems >= 50) {
        state.gems -= 50;
        state.hearts = state.maxHearts;
        this.setState(state);
      }
    },
  };

  window.AlgoQuest = AlgoQuest;

  // Run on DOM load
  document.addEventListener('DOMContentLoaded', () => {
    const state = AlgoQuest.getState();
    const currentPath = window.location.pathname.split('/').pop() || 'landing_page.html';

    // 1. Sync Top Navbar Badges
    syncNavbar(state);

    // 2. Page Specific State Hydration
    if (currentPath === 'main_dashboard.html') {
      hydrateDashboard(state);
    } else if (currentPath === 'skill_tree_roadmap.html') {
      hydrateRoadmap(state);
    } else if (currentPath === 'sublevel_overview.html') {
      hydrateSublevelOverview(state);
    } else if (currentPath === 'sorting_visualization_stage.html') {
      wireVisualizationStage();
    } else if (currentPath === 'theory_stage_eli5_mode.html') {
      wireTheoryStage();
    } else if (currentPath === 'stage_3_dry_run.html') {
      wireDryRunStage();
    } else if (currentPath === 'stage_4_guided_example.html') {
      wireGuidedStage();
    } else if (currentPath === 'stage_5_problem_solving_boss.html') {
      wireBossStage();
    } else if (currentPath === 'stage_7_quiz_stage.html') {
      wireQuizStage();
    }

    // 3. Inject State Switcher Toolbar
    injectStateToolbar(state);
  });

  /**
   * Updates Top Navbar across all pages to match active user state
   */
  function syncNavbar(state) {
    // XP elements
    document.querySelectorAll('.font-pixel').forEach((el) => {
      const txt = el.textContent.trim();
      if (txt.includes('XP') && (txt.includes('1,250') || txt.includes('1250') || txt === '0 XP')) {
        el.textContent = `${state.xp.toLocaleString()} XP`;
      }
    });

    // Coins / Gems elements
    document.querySelectorAll('header span, nav span').forEach((el) => {
      const txt = el.textContent.trim();
      if (txt === '450' || txt === '100' || txt === '450 Coins') {
        el.textContent = `${state.gems}`;
      }
      if (txt === '7' && el.previousElementSibling && el.previousElementSibling.textContent.includes('flame')) {
        el.textContent = `${state.streak}`;
      }
      if (txt === '3' && el.previousElementSibling && (el.previousElementSibling.textContent.includes('favorite') || el.previousElementSibling.className.includes('error'))) {
        el.textContent = `${state.hearts}`;
      }
    });
  }

  /**
   * Hydrates Main Dashboard with user's actual progress
   */
  function hydrateDashboard(state) {
    if (state.mode === 'new') {
      // Level Badge
      document.querySelectorAll('span').forEach((s) => {
        if (s.textContent.includes('LVL 14') || s.textContent.includes('LVL')) {
          s.textContent = `LVL ${state.level}`;
        }
      });

      // Greeting
      const heading = document.querySelector('h1');
      if (heading && heading.textContent.includes('WELCOME')) {
        heading.textContent = `WELCOME, ALGOKNIGHT!`;
      }

      // Quest Description
      const desc = heading?.nextElementSibling;
      if (desc) {
        desc.textContent = 'Your algorithmic adventure begins. Master Big-O complexity & linear memory.';
      }

      // Streak card
      document.querySelectorAll('.font-headline-lg, .font-headline-md').forEach((el) => {
        if (el.textContent.includes('7') && el.textContent.includes('Days')) {
          el.textContent = `${state.streak} Days`;
        }
        if (el.textContent.includes('1,250') || el.textContent.includes('1250')) {
          el.textContent = `${state.xp.toLocaleString()} XP`;
        }
        if (el.textContent.includes('42') && el.textContent.includes('Tasks')) {
          el.textContent = `${state.problemsSolved} Tasks`;
        }
        if (el.textContent.includes('#12') || el.textContent.includes('Diamond')) {
          el.textContent = `#99+ ${state.league}`;
        }
      });

      // Current Quest Box
      const questTitle = document.querySelectorAll('h2, h3');
      questTitle.forEach((q) => {
        if (q.textContent.includes('Sublevel 2.3')) {
          q.textContent = 'Sublevel 1.1: Complexity & Big-O Foundations';
        }
      });

      // Resume button
      const allButtons = document.querySelectorAll('button, a');
      allButtons.forEach((b) => {
        if (b.textContent.includes('RESUME LEVEL') || b.textContent.includes('RESUME')) {
          b.innerHTML = `<span>▶ START QUEST</span>`;
          b.onclick = () => {
            window.location.href = 'theory_stage_eli5_mode.html';
          };
        }
      });
    }
  }

  /**
   * Hydrates Skill Tree Roadmap with lock/unlock status
   */
  function hydrateRoadmap(state) {
    if (state.mode === 'new') {
      // Sector Cleared Count
      document.querySelectorAll('span, div').forEach((el) => {
        if (el.textContent.includes('5 / 6 Cleared')) {
          el.textContent = `${state.clearedNodes} / 6 Cleared`;
        }
        if (el.textContent.includes('64%')) {
          el.textContent = `${Math.round((state.clearedNodes / 6) * 100)}%`;
        }
      });

      // Sidebar Quest Terminal
      document.querySelectorAll('div, h2, h3').forEach((el) => {
        if (el.textContent.trim() === 'Reverse Array in Place') {
          el.textContent = 'Complexity & Big-O Foundations';
        }
        if (el.textContent.trim() === 'LEVEL 1.4') {
          el.textContent = 'LEVEL 1.1';
        }
      });

      // Sidebar Enter button
      document.querySelectorAll('button').forEach((b) => {
        if (b.textContent.includes('Enter Chamber') || b.textContent.includes('Enter')) {
          b.innerHTML = `<span>▶ Enter Stage Roadmap</span>`;
          b.onclick = () => {
            window.location.href = 'sublevel_overview.html';
          };
        }
      });
    }
  }

  /**
   * Hydrates Sublevel Overview stage cards with dynamic locks
   */
  function hydrateSublevelOverview(state) {
    const isNew = state.mode === 'new';
    const completed = state.completedStages;
    const current = state.currentStage;

    // Stage 1 (Theory)
    const stage1Completed = completed.includes(1);
    const stage1Btn = document.querySelector('[onclick*="theory_stage_eli5_mode.html"] button') ||
      document.querySelector('button[onclick*="theory_stage"]');
    if (stage1Btn) {
      if (stage1Completed) {
        stage1Btn.textContent = 'REVIEW';
        stage1Btn.className = 'bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md px-space-lg py-space-sm rounded-full transition-all shadow-sm';
      } else {
        stage1Btn.textContent = 'START';
        stage1Btn.className = 'bg-tertiary-fixed text-on-tertiary-fixed hover:bg-tertiary hover:text-white font-label-md text-label-md px-space-xl py-space-sm rounded-full shadow-[0_4px_0_0_#008466] active:translate-y-1 transition-all';
      }
    }

    // Stage 2 (Visualization)
    const stage2Unlocked = isNew ? (completed.includes(1) || current >= 2) : true;
    const stage2Card = document.querySelector('[onclick*="sorting_visualization_stage.html"]');
    if (stage2Card && !stage2Unlocked) {
      stage2Card.classList.add('opacity-60', 'grayscale-[40%]');
      const badge = stage2Card.querySelector('.bg-secondary, .bg-secondary-fixed');
      if (badge) badge.textContent = 'LOCKED';
      const btn = stage2Card.querySelector('button');
      if (btn) {
        btn.textContent = 'LOCKED';
        btn.disabled = true;
      }
    }

    // Stage 3 (Dry Run)
    const stage3Unlocked = isNew ? (completed.includes(2) || current >= 3) : true;
    const stage3Card = document.querySelector('[onclick*="stage_3_dry_run.html"]');
    if (stage3Card && !stage3Unlocked) {
      stage3Card.classList.add('opacity-60', 'grayscale-[40%]');
      const btn = stage3Card.querySelector('button');
      if (btn) {
        btn.textContent = 'LOCKED';
        btn.disabled = true;
      }
    }

    // Stage 4 (Guided Example)
    const stage4Unlocked = isNew ? (completed.includes(3) || current >= 4) : true;
    const stage4Card = document.querySelector('[onclick*="stage_4_guided_example.html"]');
    if (stage4Card && !stage4Unlocked) {
      stage4Card.classList.add('opacity-60', 'grayscale-[40%]');
      const btn = stage4Card.querySelector('button');
      if (btn) {
        btn.textContent = 'LOCKED';
        btn.disabled = true;
      }
    }
  }

  /**
   * Hook stage completions
   */
  function wireTheoryStage() {
    document.querySelectorAll('button, a').forEach((b) => {
      if (b.textContent.includes('GOT IT, NEXT') || b.getAttribute('onclick')?.includes('sorting_visualization_stage.html')) {
        b.onclick = (e) => {
          e.preventDefault();
          AlgoQuest.completeStage(1, 10);
          window.location.href = 'sorting_visualization_stage.html';
        };
      }
    });
  }

  function wireVisualizationStage() {
    document.querySelectorAll('button, a').forEach((b) => {
      if (b.textContent.includes('DRY RUN') || b.getAttribute('onclick')?.includes('stage_3_dry_run.html')) {
        b.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          AlgoQuest.completeStage(2, 10);
          window.location.href = 'stage_3_dry_run.html';
        };
      }
    });
  }

  function wireDryRunStage() {
    document.querySelectorAll('button, a').forEach((b) => {
      if (b.textContent.includes('NEXT STAGE') || b.getAttribute('onclick')?.includes('stage_4_guided_example.html')) {
        b.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          AlgoQuest.completeStage(3, 15);
          window.location.href = 'stage_4_guided_example.html';
        };
      }
    });
  }

  function wireGuidedStage() {
    document.querySelectorAll('button, a').forEach((b) => {
      if (b.textContent.includes('PRACTICE PROBLEM') || b.getAttribute('href')?.includes('stage_5_problem_solving_boss.html')) {
        b.onclick = (e) => {
          AlgoQuest.completeStage(4, 20);
        };
      }
    });
  }

  function wireBossStage() {
    document.querySelectorAll('button, a').forEach((b) => {
      if (b.textContent.includes('NEXT REALM') || b.getAttribute('onclick')?.includes('sublevel_overview.html')) {
        b.onclick = (e) => {
          e.preventDefault();
          AlgoQuest.completeStage(5, 30);
          window.location.href = 'stage_7_quiz_stage.html';
        };
        b.innerHTML = `<span>NEXT: QUIZ STAGE</span> <span>→</span>`;
      }
    });
  }

  function wireQuizStage() {
    document.querySelectorAll('button, a').forEach((b) => {
      if (b.textContent.includes('CONTINUE TO BOSS') || b.getAttribute('onclick')?.includes('sublevel_overview.html')) {
        b.onclick = (e) => {
          e.preventDefault();
          AlgoQuest.completeStage(7, 25);
          window.location.href = 'placement_results_celebration.html';
        };
        b.textContent = 'FINISH SUBLEVEL & CELEBRATE →';
      }
    });
  }

  /**
   * Floating User Mode Switcher Toolbar
   */
  function injectStateToolbar(state) {
    if (document.getElementById('algoquest-state-toolbar')) return;

    const bar = document.createElement('div');
    bar.id = 'algoquest-state-toolbar';
    bar.className = 'fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-[#0d1b37]/95 border border-white/20 text-white rounded-full px-3 py-2 shadow-2xl backdrop-blur-md font-pixel text-[10px] select-none';

    const isNew = state.mode === 'new';

    bar.innerHTML = `
      <div class="flex items-center gap-1.5 pr-2 border-r border-white/20">
        <span class="w-2 h-2 rounded-full ${isNew ? 'bg-[#79f9ce] animate-pulse' : 'bg-[#fc6d9e]'}"></span>
        <span class="text-white/80">${isNew ? '🌱 New User (Lv 1)' : '👑 Demo Mode (Lv 14)'}</span>
      </div>
      <button id="btn-toggle-new-user" class="px-2.5 py-1 rounded-full ${isNew ? 'bg-white/20 text-white font-bold' : 'bg-transparent text-white/60 hover:text-white'} hover:bg-white/30 transition-all cursor-pointer" title="Reset to fresh new user (0 XP, Level 1)">
        🔄 Reset New User
      </button>
      <button id="btn-toggle-demo" class="px-2.5 py-1 rounded-full ${!isNew ? 'bg-white/20 text-white font-bold' : 'bg-transparent text-white/60 hover:text-white'} hover:bg-white/30 transition-all cursor-pointer" title="Unlock all stages and demo data">
        ⭐ Unlock All
      </button>
    `;

    document.body.appendChild(bar);

    document.getElementById('btn-toggle-new-user').addEventListener('click', (e) => {
      e.stopPropagation();
      AlgoQuest.resetToNewUser();
    });

    document.getElementById('btn-toggle-demo').addEventListener('click', (e) => {
      e.stopPropagation();
      AlgoQuest.setDemoMode();
    });
  }
})();
