(function() {
    const submitBtn = document.getElementById('submit-resolution-btn');
    const confirmation = document.getElementById('submission-confirmation');

    if (submitBtn && confirmation) {
      submitBtn.addEventListener('click', function() {
        submitBtn.disabled = true;
        submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
        submitBtn.innerHTML = '<span class="material-symbols-outlined text-[18px] animate-spin">refresh</span><span>Submitting to Ledger...</span>';

        setTimeout(function() {
          submitBtn.innerHTML = '<span class="material-symbols-outlined text-[18px]">check</span><span>Submitted</span>';
          submitBtn.classList.remove('bg-primary');
          submitBtn.classList.add('bg-secondary', 'text-on-secondary');
          confirmation.classList.remove('hidden');
        }, 800);
      });
    }
  })();