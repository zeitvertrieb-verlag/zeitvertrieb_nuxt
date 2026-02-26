<template>
  <div class="admin-page">
    <h1>Works Admin</h1>
    
    <div v-if="!authenticated" class="login-form">
      <label>Password: <input type="password" v-model="password" @keyup.enter="login" /></label>
      <button @click="login">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </div>

    <div v-else>
      <div class="actions">
        <input v-model="searchQuery" placeholder="Search works..." class="search-box" />
        <select v-model="filterCategory">
          <option value="">All categories</option>
          <option v-for="(_, cat) in worksData" :key="cat" :value="cat">{{ formatCategory(cat) }}</option>
        </select>
        <select v-model="addToCategory" class="add-select">
          <option value="">+ Add to...</option>
          <option v-for="(_, cat) in worksData" :key="cat" :value="cat">{{ formatCategory(cat) }}</option>
        </select>
        <button @click="addWork" :disabled="!addToCategory" class="add-btn">Add</button>
        <span class="spacer"></span>
        <button @click="saveWorks" :disabled="saving">{{ saving ? 'Saving...' : 'Save Changes' }}</button>
        <span v-if="saved" class="success">Saved!</span>
        <button @click="logout">Logout</button>
      </div>

      <table class="works-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Title</th>
            <th>Year</th>
            <th>Instrumentation</th>
            <th>Dedication</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(works, category) in filteredWorks" :key="category">
            <tr v-for="(work, index) in works" :key="work.id">
              <td class="category-cell">{{ formatCategory(category) }}</td>
              <td class="title-cell">{{ work.title }}</td>
              <td>{{ work.year }}</td>
              <td>{{ work.instrumentation }}</td>
              <td>{{ work.dedication }}</td>
              <td>
                <button @click="editWork(category, index)" class="edit-btn">Edit</button>
                <button @click="deleteWork(category, index)" class="delete-btn">Delete</button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <div v-if="Object.keys(filteredWorks).length === 0" class="empty">No works found</div>

      <div v-if="editingWork" class="modal" @click.self="closeModal">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Edit Work</h2>
            <button @click="closeModal" class="close-btn">&times;</button>
          </div>
          <div class="form-group">
            <label>Title</label>
            <input v-model="editingWork.title" />
          </div>
          <div class="form-group">
            <label>Year</label>
            <input v-model="editingWork.year" />
          </div>
          <div class="form-group">
            <label>ID</label>
            <input v-model="editingWork.id" />
          </div>
          <div class="form-group">
            <label>Instrumentation</label>
            <textarea v-model="editingWork.instrumentation" rows="2"></textarea>
          </div>
          <div class="form-group">
            <label>Dedication</label>
            <input v-model="editingWork.dedication" />
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea v-model="editingWork.description" rows="4"></textarea>
          </div>
          <div class="modal-actions">
            <button @click="saveEdit" class="save-btn">Save</button>
            <button @click="closeModal" class="cancel-btn">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const password = ref('')
const authenticated = ref(false)
const error = ref('')
const saving = ref(false)
const saved = ref(false)
const worksData = ref({})
const searchQuery = ref('')
const filterCategory = ref('')
const addToCategory = ref('')
const editingWork = ref(null)
const editingCategory = ref('')
const editingIndex = ref(0)

const login = async () => {
  try {
    const response = await fetch('/api/login', {
      headers: { 'Authorization': `Bearer ${password.value}` }
    })
    if (response.ok) {
      worksData.value = await response.json()
      authenticated.value = true
      error.value = ''
    } else {
      error.value = 'Invalid password'
    }
  } catch (e) {
    error.value = 'Connection error'
  }
}

const logout = () => {
  authenticated.value = false
  password.value = ''
  worksData.value = {}
}

const saveWorks = async () => {
  saving.value = true
  saved.value = false
  try {
    const response = await fetch('/api/works', {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${password.value}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(worksData.value)
    })
    if (response.ok) {
      saved.value = true
      setTimeout(() => saved.value = false, 2000)
    } else {
      error.value = 'Save failed'
    }
  } catch (e) {
    error.value = 'Save failed'
  } finally {
    saving.value = false
  }
}

const formatCategory = (cat) => cat.replace(/-/g, ' ')

const filteredWorks = computed(() => {
  const query = searchQuery.value.toLowerCase()
  const result = {}
  
  for (const [category, works] of Object.entries(worksData.value)) {
    if (filterCategory.value && filterCategory.value !== category) continue
    
    let filtered = works
    if (query) {
      filtered = works.filter(w => 
        w.title?.toLowerCase().includes(query) ||
        w.instrumentation?.toLowerCase().includes(query) ||
        w.dedication?.toLowerCase().includes(query)
      )
    }
    
    if (filtered.length > 0 || !query) {
      result[category] = filtered.length > 0 ? filtered : works
    }
  }
  
  return result
})

const addWork = () => {
  const category = addToCategory.value
  if (!category) return
  
  const newWork = {
    title: 'New Work',
    year: '2026',
    id: 'new-' + Date.now(),
    instrumentation: '',
    dedication: '',
    description: ''
  }
  worksData.value[category].unshift(newWork)
  editWork(category, 0)
  addToCategory.value = ''
}

const editWork = (category, index) => {
  editingCategory.value = category
  editingIndex.value = index
  editingWork.value = { ...worksData.value[category][index] }
}

const saveEdit = () => {
  worksData.value[editingCategory.value][editingIndex.value] = { ...editingWork.value }
  closeModal()
}

const deleteWork = (category, index) => {
  if (confirm('Delete this work?')) {
    worksData.value[category].splice(index, 1)
  }
}

const closeModal = () => {
  editingWork.value = null
}
</script>

<style scoped>
.admin-page { padding: 20px; max-width: 1400px; margin: 0 auto; }
.login-form { text-align: center; margin-top: 50px; }
.login-form input { padding: 8px; margin-right: 10px; }
.login-form button { padding: 8px 16px; cursor: pointer; }
.error { color: red; margin-top: 10px; }
.actions { margin-bottom: 20px; display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
.search-box { padding: 8px; width: 200px; }
.add-select { padding: 8px; }
.actions button { padding: 8px 16px; cursor: pointer; }
.spacer { flex: 1; }
.success { color: green; }
.empty { color: #999; font-style: italic; padding: 20px; }

.works-table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
.works-table th { text-align: left; padding: 8px; background: #f5f5f5; border-bottom: 2px solid #ddd; }
.works-table td { padding: 8px; border-bottom: 1px solid #eee; vertical-align: top; }
.works-table .category-cell { color: #888; font-size: 12px; text-transform: capitalize; white-space: nowrap; }
.works-table .title-cell { font-weight: bold; }
.works-table td:nth-child(3) { white-space: nowrap; color: #666; }

.edit-btn { background: #3498db; color: white; border: none; padding: 5px 10px; cursor: pointer; margin-right: 5px; border-radius: 4px; font-size: 12px; }
.delete-btn { background: #e74c3c; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 4px; font-size: 12px; }
.add-btn { background: #27ae60; color: white; border: none; padding: 8px 16px; cursor: pointer; border-radius: 4px; }
.add-btn:disabled { background: #ccc; cursor: not-allowed; }

.modal { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal-content { background: white; padding: 30px; border-radius: 8px; width: 90%; max-width: 600px; max-height: 90vh; overflow-y: auto; }
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.modal-header h2 { margin: 0; }
.close-btn { background: none; border: none; font-size: 24px; cursor: pointer; }
.form-group { margin-bottom: 15px; }
.form-group label { display: block; margin-bottom: 5px; font-weight: bold; color: #555; }
.form-group input, .form-group textarea { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-family: inherit; }
.modal-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px; }
.save-btn { background: #27ae60; color: white; border: none; padding: 10px 20px; cursor: pointer; border-radius: 4px; }
.cancel-btn { background: #95a5a6; color: white; border: none; padding: 10px 20px; cursor: pointer; border-radius: 4px; }
</style>
