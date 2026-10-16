const dialog = document.getElementById('donationDialog');
const categorySelect = document.getElementById('donationCategory');
const amountInput = document.getElementById('donationAmount');
const formMessage = document.getElementById('formMessage');

function openDonation(category = 'Food') {
  categorySelect.value = category;
  formMessage.textContent = '';
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else alert('Donation demo: ' + category);
}
document.querySelectorAll('[data-category]').forEach(button => {
  button.addEventListener('click', () => openDonation(button.dataset.category));
});
document.querySelectorAll('[data-amount]').forEach(button => {
  button.addEventListener('click', () => {
    amountInput.value = button.dataset.amount;
    document.querySelectorAll('[data-amount]').forEach(b => b.style.borderColor = '');
    button.style.borderColor = '#526fe0';
  });
});
document.getElementById('confirmDonation').addEventListener('click', () => {
  const amount = Number(amountInput.value);
  if (!Number.isFinite(amount) || amount < 1) {
    formMessage.style.color = '#d85c6b';
    formMessage.textContent = 'Please enter a valid amount.';
    return;
  }
  formMessage.style.color = '#3b9b6b';
  formMessage.textContent = `Demo only: ₹${amount} for ${categorySelect.value} selected. No payment was processed.`;
});
document.getElementById('searchInput').addEventListener('input', event => {
  const query = event.target.value.trim().toLowerCase();
  let visible = 0;
  document.querySelectorAll('.need-item').forEach(item => {
    const matches = (item.innerText + ' ' + item.dataset.search).toLowerCase().includes(query);
    item.hidden = !matches;
    if (matches) visible++;
  });
  document.getElementById('emptyState').hidden = visible !== 0;
});
document.querySelectorAll('.category').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.category').forEach(b => b.classList.remove('selected'));
    button.classList.add('selected');
  });
});
