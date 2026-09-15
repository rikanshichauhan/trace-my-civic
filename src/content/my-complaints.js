document.addEventListener('DOMContentLoaded', () => {
      // Sync App Shell Header active link state for My Complaints
      const navLinks = document.querySelectorAll('header nav a');
      navLinks.forEach(link => {
        if (link.getAttribute('data-path') === 'my-complaints') {
          link.classList.remove('text-on-surface-variant');
          link.classList.add('text-primary', 'font-headline-sm', 'border-b-2', 'border-primary');
        } else {
          link.classList.remove('text-primary', 'font-headline-sm', 'border-b-2', 'border-primary');
          link.classList.add('text-on-surface-variant');
        }
      });
    });

    function filterComplaints(status, tabBtn) {
      const tabs = document.querySelectorAll('.filter-tab-btn');
      tabs.forEach(btn => {
        btn.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
        btn.classList.add('bg-surface-container-low', 'text-on-surface-variant', 'hover:text-on-surface');
      });
      tabBtn.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');
      tabBtn.classList.remove('bg-surface-container-low', 'text-on-surface-variant', 'hover:text-on-surface');

      const cards = document.querySelectorAll('.complaint-card');
      cards.forEach(card => {
        if (status === 'all' || card.getAttribute('data-status') === status) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    }

    function openVerificationModal() {
      const modal = document.getElementById('verification-modal');
      if (modal) modal.classList.remove('hidden');
    }

    function closeVerificationModal() {
      const modal = document.getElementById('verification-modal');
      if (modal) modal.classList.add('hidden');
    }

    function toggleTimelineDrawer(id) {
      const drawer = document.getElementById(id);
      if (drawer) {
        drawer.classList.toggle('hidden');
      }
    }

    function triggerDownloadNotice(complaintId) {
      const banner = document.getElementById('toast-notice');
      const text = document.getElementById('toast-text');
      if (banner && text) {
        text.innerText = `Preparing official certified municipal dossier for ${complaintId}... PDF generated with civic seal.`;
        banner.classList.remove('hidden');
        setTimeout(() => banner.classList.add('hidden'), 4000);
      }
    }