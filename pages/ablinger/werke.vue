<template>
  <div>
    <h1>Werke</h1>
  </div>
  <div v-html="content"></div>
</template>

<script setup>
const content = `
<p>für die aktuelle Version der Werkliste -&gt; sehen Sie die <a href="http://ablinger.mur.at/werke.html" target="_blank">Homepage von P. Ablinger</a> <br>
<br>
<i>for the actual work list -&gt; go to the <a href="http://ablinger.mur.at/werke.html" target="_blank">homepage of P. Ablinger</a></i> <br><br />
<br />
<b>Werkcharakter</b></p>
<p>Ablingers Werk gliedert sich in mehrere parallele Zyklen.</p>
`
</script>
