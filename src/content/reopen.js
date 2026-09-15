document.addEventListener('DOMContentLoaded', () => {
      const myComplaintsLink = document.querySelector('header nav a[data-path="my complaints"]') || 
                               document.querySelector('header nav a[data-path="my-complaints"]');
      if (myComplaintsLink) {
        document.querySelectorAll('header nav a').forEach(a => {
          a.classList.remove('text-primary', 'font-headline-sm', 'border-b-2', 'border-primary');
          a.classList.add('text-on-surface-variant');
        });
        myComplaintsLink.classList.remove('text-on-surface-variant');
        myComplaintsLink.classList.add('text-primary', 'font-headline-sm', 'border-b-2', 'border-primary');
      }
    });
  


    (() => {
      const radioCards = document.querySelectorAll('.option-card');
      radioCards.forEach(card => {
        const input = card.querySelector('input[type="radio"]');
        card.addEventListener('click', () => {
          radioCards.forEach(c => {
            c.classList.remove('ring-2', 'ring-primary', 'bg-surface-container-low');
            c.classList.add('bg-surface');
          });
          card.classList.add('ring-2', 'ring-primary', 'bg-surface-container-low');
          card.classList.remove('bg-surface');
          if (input) input.checked = true;
        });
      });

      const textarea = document.getElementById('detailedDescription');
      const counter = document.getElementById('charCounter');
      if (textarea && counter) {
        textarea.addEventListener('input', () => {
          counter.textContent = `${textarea.value.length} / 1000 characters`;
        });
      }

      const submitBtn = document.getElementById('submitReopenBtn');
      if (submitBtn) {
        submitBtn.addEventListener('click', () => {
          const originalText = submitBtn.innerHTML;
          submitBtn.disabled = true;
          submitBtn.innerHTML = `
            <span class="material-symbols-outlined text-[20px] animate-spin">sync</span>
            <span>Logging Escalation...</span>
          `;
          setTimeout(() => {
            submitBtn.innerHTML = `
              <span class="material-symbols-outlined text-[20px]">check_circle</span>
              <span>Reopen Request Submitted (#CT-GZB-8821)</span>
            `;
            submitBtn.classList.remove('bg-primary-container', 'hover:bg-primary');
            submitBtn.classList.add('bg-secondary', 'text-on-secondary');
          }, 900);
        });
      }
    })();