function openApprovalModal() {
    document.getElementById('verification-modal').classList.remove('hidden');
  }

  function openIssueModal() {
    document.getElementById('issue-modal').classList.remove('hidden');
  }

  function closeModals() {
    document.getElementById('verification-modal').classList.add('hidden');
    document.getElementById('issue-modal').classList.add('hidden');
  }

  function showToast(msg, isError) {
    var toast = document.getElementById('toast');
    var text = document.getElementById('toast-message');
    var icon = document.getElementById('toast-icon');
    text.textContent = msg;
    icon.textContent = isError ? 'error' : 'check_circle';
    toast.classList.remove('hidden');
    setTimeout(function() {
      toast.classList.add('hidden');
    }, 4000);
  }

  function completeVerification() {
    closeModals();
    showToast('Verification confirmed! Complaint #CT-GZB-8821 marked as Resolved.', false);
  }

  function submitReopenRequest() {
    var notes = document.getElementById('issue-notes').value;
    closeModals();
    showToast('Feedback submitted. Junior Engineer Rajesh Sharma has been alerted.', true);
  }