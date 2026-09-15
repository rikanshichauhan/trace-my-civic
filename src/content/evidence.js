(function() {
    // Mode Switching Logic
    const btnSideBySide = document.getElementById('btnSideBySide');
    const btnOverlaySlider = document.getElementById('btnOverlaySlider');
    const sideBySideContainer = document.getElementById('sideBySideContainer');
    const sliderComparisonContainer = document.getElementById('sliderComparisonContainer');

    btnSideBySide.addEventListener('click', () => {
      sideBySideContainer.classList.remove('hidden');
      sliderComparisonContainer.classList.add('hidden');
      btnSideBySide.classList.add('bg-primary', 'text-on-primary');
      btnSideBySide.classList.remove('text-on-surface-variant');
      btnOverlaySlider.classList.remove('bg-primary', 'text-on-primary');
      btnOverlaySlider.classList.add('text-on-surface-variant');
    });

    btnOverlaySlider.addEventListener('click', () => {
      sideBySideContainer.classList.add('hidden');
      sliderComparisonContainer.classList.remove('hidden');
      btnOverlaySlider.classList.add('bg-primary', 'text-on-primary');
      btnOverlaySlider.classList.remove('text-on-surface-variant');
      btnSideBySide.classList.remove('bg-primary', 'text-on-primary');
      btnSideBySide.classList.add('text-on-surface-variant');
      updateSliderWidth();
    });

    // Interactive Slider logic
    const interactiveCanvas = document.getElementById('interactiveCanvas');
    const sliderClippedLayer = document.getElementById('sliderClippedLayer');
    const sliderHandle = document.getElementById('sliderHandle');
    const beforeSlidingImg = document.getElementById('beforeSlidingImg');

    function updateSliderWidth() {
      if (interactiveCanvas && beforeSlidingImg) {
        beforeSlidingImg.style.width = interactiveCanvas.offsetWidth + 'px';
      }
    }
    window.addEventListener('resize', updateSliderWidth);

    let isDragging = false;
    function setSliderPosition(clientX) {
      const rect = interactiveCanvas.getBoundingClientRect();
      let offsetX = clientX - rect.left;
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;
      const percentage = (offsetX / rect.width) * 100;
      sliderClippedLayer.style.width = percentage + '%';
      sliderHandle.style.left = percentage + '%';
    }

    if (sliderHandle && interactiveCanvas) {
      sliderHandle.addEventListener('mousedown', () => isDragging = true);
      window.addEventListener('mouseup', () => isDragging = false);
      window.addEventListener('mousemove', (e) => {
        if (isDragging) setSliderPosition(e.clientX);
      });
      interactiveCanvas.addEventListener('click', (e) => setSliderPosition(e.clientX));

      // Touch events for mobile/tablets
      sliderHandle.addEventListener('touchstart', () => isDragging = true);
      window.addEventListener('touchend', () => isDragging = false);
      window.addEventListener('touchmove', (e) => {
        if (isDragging && e.touches[0]) setSliderPosition(e.touches[0].clientX);
      });
    }

    // Modals Control
    const modalApproval = document.getElementById('modalApproval');
    const modalDispute = document.getElementById('modalDispute');
    const modalQuestionable = document.getElementById('modalQuestionable');

    document.getElementById('btnApproveResolution').addEventListener('click', () => {
      modalApproval.classList.remove('hidden');
    });

    document.getElementById('btnRejectWork').addEventListener('click', () => {
      modalDispute.classList.remove('hidden');
    });

    document.getElementById('btnChallengeProof').addEventListener('click', () => {
      modalQuestionable.classList.remove('hidden');
    });

    document.querySelectorAll('.btn-close-modal').forEach(btn => {
      btn.addEventListener('click', () => {
        modalApproval.classList.add('hidden');
        modalDispute.classList.add('hidden');
        modalQuestionable.classList.add('hidden');
      });
    });

    [modalApproval, modalDispute, modalQuestionable].forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
      });
    });
  })();