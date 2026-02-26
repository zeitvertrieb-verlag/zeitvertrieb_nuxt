<template>
  <div>
    <h1>Texte</h1>
  </div>
  <div v-html="content"></div>
</template>

<script setup>
const content = `
<p>f&uuml;r die komplette Liste der Texte -&gt; sehen Sie die <a href="http://ablinger.mur.at/texte.html" target="_blank">Homepage von P. Ablinger</a></p>
`
</script>
