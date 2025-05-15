// ─── Top common passwords ───────────────────────────────────────────
const commonPasswords = [
  '123456', 'password', '123456789', '12345678', '12345',
  '111111', '1234567', 'qwerty', 'abc123', 'password1',
  'iloveyou', 'admin', 'welcome', 'monkey', 'login'
];

const pwdInp   = document.getElementById('pwd');
const showChk  = document.getElementById('show');
const analyze  = document.getElementById('analyze');
const clearBtn = document.getElementById('clear');
const rating   = document.getElementById('rating');
const bar      = document.getElementById('bar');
const fb       = document.getElementById('feedback');

showChk.addEventListener('change', () => {
  pwdInp.type = showChk.checked ? 'text' : 'password';
});

clearBtn.addEventListener('click', () => {
  pwdInp.value = '';
  rating.textContent = 'Enter a password and click Analyze';
  bar.value = 0;
  fb.textContent = '';
  pwdInp.focus();
});

analyze.addEventListener('click', () => {
  const pwd = pwdInp.value.trim();

  // ─── Early out for common passwords ─────────────────────────────
  if (commonPasswords.includes(pwd.toLowerCase())) {
    bar.value = 0;
    rating.textContent = 'Weak (common password)';
    fb.innerHTML = '• This password is extremely common. Try something more unique.';
    return;
  }

  let score = 0;
  const msgs = [];

  // length
  if (pwd.length >= 8) score += 25;
  else                 msgs.push("• At least 8 characters.");

  // lowercase
  if (/[a-z]/.test(pwd)) score += 15;
  else                   msgs.push("• Add lowercase letters.");

  // uppercase
  if (/[A-Z]/.test(pwd)) score += 20;
  else                   msgs.push("• Add uppercase letters.");

  // digits
  if (/\d/.test(pwd))    score += 20;
  else                   msgs.push("• Add numbers (0–9).");

  // special
  if (/[^A-Za-z0-9]/.test(pwd)) score += 20;
  else                           msgs.push("• Add special characters (!@#$%).");

  score = Math.min(score, 100);
  bar.value = score;

  // rating label
  let level;
  if (score < 40)       level = 'Weak';
  else if (score < 70)  level = 'Medium';
  else if (score < 90)  level = 'Strong';
  else                  level = 'Very Strong';
  rating.textContent = `${level} (${score}%)`;

  // feedback pane
  fb.innerHTML = msgs.length
    ? msgs.join('<br>')
    : '🎉 Excellent! Your password meets all criteria.';
});
