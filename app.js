document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const storedTheme = localStorage.getItem('theme') || 'light';

    // Set initial theme
    document.documentElement.setAttribute('data-theme', storedTheme);
    themeToggle.innerHTML = storedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });

    // Code Runner
    const codeEditor = document.getElementById('code-editor');
    const runCodeButton = document.getElementById('run-code');
    const output = document.getElementById('output');

    runCodeButton.addEventListener('click', () => {
      try {
        output.textContent = '';
        const log = console.log;
        console.log = (...args) => {
          output.textContent += args.join(' ') + '\n';
        };

        const code = new Function(codeEditor.value);
        code();

        console.log = log;
      } catch (error) {
        output.textContent = `🚨 Error: ${error.message}`;
      }
    });

    // Quiz Logic
    const quizOptions = document.querySelectorAll('.quiz-option');
    const quizFeedback = document.getElementById('quiz-feedback');

    quizOptions.forEach(option => {
      option.addEventListener('click', () => {
        quizOptions.forEach(opt => opt.style.backgroundColor = '');

        if (option.textContent.includes('B')) {
          option.style.backgroundColor = '#2ecc71';
          quizFeedback.textContent = '🎉 Correct! Block-scoped variables are declared with let';
          quizFeedback.style.color = '#2ecc71';
        } else {
          option.style.backgroundColor = '#e74c3c';
          quizFeedback.textContent = '❌ Try again! Remember: let is block-scoped';
          quizFeedback.style.color = '#e74c3c';
        }
      });
    });

    // Progress Tracking
    let currentDay = localStorage.getItem('currentDay') || 1;
    document.getElementById('progress').textContent = `Day ${currentDay}/60`;
  });
