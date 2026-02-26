<template>
  <div>
    <h1>Werke</h1>
  </div>
  <WorksList api-endpoint="/api/k-lang-works" />
</template>

<script setup lang="ts">
import WorksList from '~/components/WorksList.vue'
</script>
