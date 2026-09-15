document.addEventListener("DOMContentLoaded", () => {
      const navLinks = document.querySelectorAll('nav a[data-path]');
      navLinks.forEach(link => {
        if (link.getAttribute('data-path') === 'my-complaints') {
          link.className = "text-primary font-headline-sm border-b-2 border-primary transition-colors py-2 font-label-md text-label-md uppercase tracking-wider";
        }
      });
    });

    function handlePrint() {
      window.print();
    }

    function handleDownload() {
      const btn = document.getElementById('download-btn-top');
      const btnBottom = document.getElementById('download-btn-bottom');
      const originalText = btn.innerHTML;
      const originalTextBottom = btnBottom.innerHTML;
      
      btn.innerHTML = `<span class="material-symbols-outlined text-[18px] animate-spin">progress_activity</span><span>Generating PDF...</span>`;
      btnBottom.innerHTML = `<span class="material-symbols-outlined text-[18px] animate-spin">progress_activity</span><span>Generating PDF...</span>`;
      
      setTimeout(() => {
        btn.innerHTML = `<span class="material-symbols-outlined text-[18px]">verified</span><span>Downloaded</span>`;
        btnBottom.innerHTML = `<span class="material-symbols-outlined text-[18px]">verified</span><span>Downloaded</span>`;
        setTimeout(() => {
          btn.innerHTML = originalText;
          btnBottom.innerHTML = originalTextBottom;
        }, 2500);
      }, 1200);
    }