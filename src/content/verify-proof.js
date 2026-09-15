(function() {
    const btnVerify = document.getElementById('btn-verify');
    const btnDispute = document.getElementById('btn-dispute');
    const btnFlag = document.getElementById('btn-flag');
    const notifBox = document.getElementById('decision-notification');

    function showStatus(htmlContent, bgClasses) {
      notifBox.className = 'mt-space-md p-space-md rounded-lg ' + bgClasses;
      notifBox.innerHTML = htmlContent;
      notifBox.classList.remove('hidden');
    }

    if(btnVerify) {
      btnVerify.addEventListener('click', function() {
        showStatus(`
          <div class="flex items-center gap-space-sm text-on-secondary-container">
            <span class="material-symbols-outlined text-secondary text-[24px]">verified</span>
            <div>
              <div class="font-headline-sm text-headline-sm font-semibold">Resolution Validated by Citizen #CT-4091</div>
              <div class="font-body-md text-body-md mt-0.5">Complaint #CT-84920 has been marked officially <strong>CLOSED</strong>. Cryptographic confirmation logged at ${new Date().toLocaleTimeString()} EST.</div>
            </div>
          </div>
        `, 'bg-secondary-container text-on-secondary-container');
      });
    }

    if(btnDispute) {
      btnDispute.addEventListener('click', function() {
        showStatus(`
          <div class="flex items-center gap-space-sm text-tertiary">
            <span class="material-symbols-outlined text-error text-[24px]">report_problem</span>
            <div>
              <div class="font-headline-sm text-headline-sm font-semibold text-error">Resolution Disputed • Case Escalated</div>
              <div class="font-body-md text-body-md text-on-surface mt-0.5">Complaint #CT-84920 has been flagged as <strong>"Disputed/Escalated"</strong>. Notice dispatched to Public Works Supervisor Desk. SLA target: 24h expedited audit.</div>
            </div>
          </div>
        `, 'bg-error-container');
      });
    }

    if(btnFlag) {
      btnFlag.addEventListener('click', function() {
        showStatus(`
          <div class="flex items-center gap-space-sm text-primary">
            <span class="material-symbols-outlined text-[24px]">policy</span>
            <div>
              <div class="font-headline-sm text-headline-sm font-semibold">Audit Review Initiated</div>
              <div class="font-body-md text-body-md mt-0.5">Evidence has been quarantined for forensic timestamp and geodata examination by Municipal Oversight.</div>
            </div>
          </div>
        `, 'bg-surface-container-highest');
      });
    }
  })();