const API = '/api/tasks';
const token = localStorage.getItem('token');
if (!token) { window.location.href = '/auth/login.html'; }
const user = JSON.parse(localStorage.getItem('user') || 'null');
document.getElementById('userName').textContent = user ? user.name : '';
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) logoutBtn.addEventListener('click', ()=>{ localStorage.removeItem('token'); localStorage.removeItem('user'); window.location.href = '/auth/login.html'; });

let editingId = null;

async function fetchTasks(){
  try {
    const res = await fetch(API, { headers: { Authorization: 'Bearer ' + token } });
    if (res.status === 401) { localStorage.removeItem('token'); window.location.href = '/auth/login.html'; return; }
    const tasks = await res.json();
    const container = document.getElementById('taskList');
    container.innerHTML = '';
    if (!tasks.length) { container.innerHTML = '<p class="text-muted">No tasks yet. Add one below.</p>'; return; }
    tasks.forEach(t=>{
      const card = document.createElement('div');
      card.className = 'card p-3 my-2';
      const priorityClass = t.priority === 'High' ? 'priority-high' : (t.priority === 'Low' ? 'priority-low' : 'priority-medium');
      card.innerHTML = `
        <div class="d-flex justify-content-between align-items-start gap-3">
          <div style="min-width:0">
            <div class="${t.completed? 'text-decoration-line-through text-muted':''}"><strong>${escapeHtml(t.title)}</strong> <span class="${priorityClass}">[${t.priority}]</span></div>
            ${t.description ? `<div class="task-desc">${escapeHtml(t.description)}</div>` : ''}
            <div class="small text-secondary mt-1">Deadline: ${t.deadline? new Date(t.deadline).toLocaleDateString():'—'}</div>
          </div>
          <div class="btn-group-vertical">
            <button class="btn btn-sm btn-outline-success mb-1" onclick="toggleComplete('${t._id}', ${!t.completed})">${t.completed? 'Undo':'Done'}</button>
            <button class="btn btn-sm btn-outline-primary mb-1" onclick="startEdit('${t._id}')">Edit</button>
            <button class="btn btn-sm btn-outline-danger" onclick="deleteTask('${t._id}')">Delete</button>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (err) { console.error(err); }
}

function escapeHtml(s){ return String(s).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[c]); }

document.getElementById('addBtn').addEventListener('click', async ()=>{
  const title = document.getElementById('taskTitle').value.trim();
  const description = document.getElementById('taskDescription').value.trim();
  const priority = document.getElementById('taskPriority').value;
  const deadline = document.getElementById('taskDeadline').value || null;
  if (!title) return alert('Enter task title');
  const payload = { title, description, priority, deadline };
  if (editingId) {
    // update
    const res = await fetch(API + '/' + editingId, { method:'PUT', headers:{ 'Content-Type':'application/json', Authorization: 'Bearer ' + token }, body: JSON.stringify(payload) });
    if (!res.ok) { alert('Failed to update'); return; }
    editingId = null;
    document.getElementById('addBtn').textContent = 'Add Task';
  } else {
    const res = await fetch(API, { method:'POST', headers:{ 'Content-Type':'application/json', Authorization: 'Bearer ' + token }, body: JSON.stringify(payload) });
    if (!res.ok) { alert('Failed to add'); return; }
  }
  document.getElementById('taskTitle').value='';
  document.getElementById('taskDescription').value='';
  document.getElementById('taskDeadline').value='';
  document.getElementById('taskPriority').value='Medium';
  fetchTasks();
});

async function startEdit(id){
  const res = await fetch(API, { headers: { Authorization: 'Bearer ' + token } });
  const tasks = await res.json();
  const t = tasks.find(x => x._id === id);
  if (!t) return alert('Task not found');
  editingId = id;
  document.getElementById('taskTitle').value = t.title;
  document.getElementById('taskDescription').value = t.description || '';
  document.getElementById('taskPriority').value = t.priority || 'Medium';
  document.getElementById('taskDeadline').value = t.deadline ? new Date(t.deadline).toISOString().slice(0,10) : '';
  document.getElementById('addBtn').textContent = 'Save Changes';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function toggleComplete(id, status){
  await fetch(API + '/' + id, { method:'PUT', headers:{ 'Content-Type':'application/json', Authorization: 'Bearer ' + token }, body: JSON.stringify({ completed: status }) });
  fetchTasks();
}
async function deleteTask(id){
  if (!confirm('Delete task?')) return;
  await fetch(API + '/' + id, { method:'DELETE', headers:{ Authorization: 'Bearer ' + token } });
  fetchTasks();
}

// initial load
fetchTasks();
