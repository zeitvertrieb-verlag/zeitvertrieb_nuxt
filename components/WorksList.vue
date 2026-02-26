<template>
  <div>
    <div class="spinner" v-if="loading">Loading works...</div>
    
    <input type="text" id="search-box" v-model="searchQuery" placeholder="Search works..." />
    
    <div class="works-category" id="orchestra-large-ensemble">
      <div class="work">
        <div class="work-header1">orchestral / large ensemble (9+)</div>
        <div class="work-header2">instrumentation, duration</div>
      </div>
      <div v-for="work in filteredWorks.orchestral" :key="work.id" class="work-item">
        <div class="title">
          <button @click="openModal(work.id)">{{ work.title }} ({{ work.year }})</button>
        </div>
        <div class="instrumentation">{{ work.instrumentation }}</div>
      </div>
    </div>

    <div class="works-category" id="ensemble">
      <div class="work">
        <div class="work-header1">ensemble (3+)</div>
      </div>
      <div v-for="work in filteredWorks.ensemble" :key="work.id" class="work-item">
        <div class="title">
          <button @click="openModal(work.id)">{{ work.title }} ({{ work.year }})</button>
        </div>
        <div class="instrumentation">{{ work.instrumentation }}</div>
      </div>
    </div>

    <div class="works-category" id="solo-duo">
      <div class="work">
        <div class="work-header1">solo/duo (1+)</div>
      </div>
      <div v-for="work in filteredWorks.solo" :key="work.id" class="work-item">
        <div class="title">
          <button @click="openModal(work.id)">{{ work.title }} ({{ work.year }})</button>
        </div>
        <div class="instrumentation">{{ work.instrumentation }}</div>
      </div>
    </div>

    <div class="works-category" id="series">
      <div class="work">
        <div class="work-header1">series</div>
      </div>
      <div v-for="work in filteredWorks.series" :key="work.id" class="work-item">
        <div class="title">
          <button @click="openModal(work.id)">{{ work.title }} ({{ work.year }})</button>
        </div>
        <div class="instrumentation">{{ work.instrumentation }}</div>
      </div>
    </div>

    <div class="works-category" id="collaborations">
      <div class="work">
        <div class="work-header1">collaborations</div>
      </div>
      <div v-for="work in filteredWorks.collaborations" :key="work.id" class="work-item">
        <div class="title">
          <button @click="openModal(work.id)">{{ work.title }} ({{ work.year }})</button>
        </div>
        <div class="instrumentation">{{ work.instrumentation }}</div>
      </div>
    </div>

    <!-- Modals -->
    <div v-for="work in allWorks" :key="'modal-' + work.id" class="modal" :id="work.id + '-modal'" :style="{ display: modalOpen === work.id ? 'block' : 'none' }">
      <div class="modal-content">
        <div class="modal-close">
          <button @click="closeModal">×</button>
        </div>
        <div class="modal-header">{{ work.title }} ({{ work.year }})</div>
        <div class="modal-instrumentation">{{ work.instrumentation }}<br>{{ work.dedication }}</div>
        <div v-html="work.description"></div>
        <br>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  apiEndpoint?: string
}>()

const endpoint = props.apiEndpoint || '/api/works'
const { data: works, pending: loading } = await useFetch(endpoint)
const searchQuery = ref('')
const modalOpen = ref(null)

const allWorks = computed(() => {
  return [
    ...(works.value['orchestral-large-ensemble'] || []),
    ...(works.value['ensemble'] || []),
    ...(works.value['solo-duo'] || []),
    ...(works.value['series'] || []),
    ...(works.value['collaborations'] || [])
  ]
})

const filterWorks = (workList) => {
  if (!searchQuery.value) return workList || []
  const query = searchQuery.value.toLowerCase()
  return (workList || []).filter(work => 
    work.title.toLowerCase().includes(query) || 
    work.instrumentation.toLowerCase().includes(query)
  )
}

const filteredWorks = computed(() => {
  return {
    orchestral: filterWorks(works.value['orchestral-large-ensemble']),
    ensemble: filterWorks(works.value['ensemble']),
    solo: filterWorks(works.value['solo-duo']),
    series: filterWorks(works.value['series']),
    collaborations: filterWorks(works.value['collaborations'])
  }
})

const openModal = (id) => {
  modalOpen.value = id
}

const closeModal = () => {
  modalOpen.value = null
}
</script>

<style scoped>
.works-category {
  margin-bottom: 30px;
}
.work-header1 {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #7F7F7F;
}
.work-header2 {
  font-size: 12px;
  color: #7F7F7F;
  margin-bottom: 15px;
}
.work-item {
  display: flex;
  margin-bottom: 10px;
  align-items: baseline;
}
.work-item .title {
  width: 350px;
  padding-right: 15px;
}
.work-item .title button {
  background: none;
  border: none;
  padding: 0;
  color: #F03900;
  cursor: pointer;
  font-family: "Courier New", Courier, monospace;
  font-size: small;
  text-align: left;
}
.work-item .title button:hover {
  text-decoration: underline;
}
.work-item .instrumentation {
  flex: 1;
  font-size: small;
}
.modal {
  display: none;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.7);
}
.modal-content {
  background-color: #fff;
  margin: 5% auto;
  padding: 30px;
  border: 1px solid #888;
  width: 80%;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  font-family: "Courier New", Courier, monospace;
  font-size: small;
}
.modal-close {
  text-align: right;
  margin-bottom: 20px;
}
.modal-close button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
}
.modal-header {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}
.modal-instrumentation {
  margin-bottom: 15px;
  font-style: italic;
}
.spinner {
  text-align: center;
  padding: 20px;
}
#search-box {
  margin-bottom: 20px;
  padding: 8px;
  width: 300px;
  font-family: "Courier New", Courier, monospace;
  font-size: small;
  border: 1px solid #ccc;
}
#search-box:focus {
  outline: none;
  border-color: #F03900;
}
</style>
