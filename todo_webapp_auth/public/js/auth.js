const apiAuth = '/api/auth';
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const msg = document.getElementById('msg');
      msg.textContent = '';
      try {
        const res = await fetch(apiAuth + '/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) });
        const data = await res.json();
        if (!res.ok) { msg.textContent = data.error || 'Login failed'; return; }
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = '/index.html';
      } catch (err) { msg.textContent = err.message; }
    });
  }
  if (registerForm) {
    registerForm.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const msg = document.getElementById('msg');
      msg.textContent = '';
      try {
        const res = await fetch(apiAuth + '/register', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name, email, password }) });
        const data = await res.json();
        if (!res.ok) { msg.textContent = data.error || 'Register failed'; return; }
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = '/index.html';
      } catch (err) { msg.textContent = err.message; }
    });
  }
});
