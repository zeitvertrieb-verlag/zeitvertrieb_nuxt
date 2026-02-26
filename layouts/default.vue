<template>
  <div id="container">
    <div id="header">
      <NuxtLink to="/">
        <img src="/bilder/zeitvertrieb_logo_245x62.jpg" width="245" height="62" />
      </NuxtLink>
      <div id="menu">
        <NuxtLink to="/" :class="{ aktuell: $route.path === '/' }">über ZEITVERTRIEB</NuxtLink> &nbsp; | &nbsp; 
        <NuxtLink to="/kontakt" :class="{ aktuell: $route.path === '/kontakt' }">Kontakt/Order</NuxtLink> &nbsp; | &nbsp; 
        <NuxtLink to="/aktuelles" :class="{ aktuell: $route.path === '/aktuelles' }">Aktuelles</NuxtLink>
      </div>
      <div id="menu">
        <span class="separator">Komponisten</span>
        <div>
          <NuxtLink to="/ablinger" :class="{ aktuell: $route.path.startsWith('/ablinger') }">P. Ablinger</NuxtLink>&nbsp;|&nbsp;
          <NuxtLink to="/lamb" :class="{ aktuell: $route.path.startsWith('/lamb') }">C. Lamb</NuxtLink>&nbsp;|&nbsp;
          <NuxtLink to="/k-lang" :class="{ aktuell: $route.path.startsWith('/k-lang') }">K. Lang</NuxtLink>&nbsp;|&nbsp;
          <NuxtLink to="/mashayekhi" :class="{ aktuell: $route.path.startsWith('/mashayekhi') }">N. Mashayekhi</NuxtLink>&nbsp;
        </div>
      </div>
      <div v-if="composerSlug" id="menu_klein">
        <NuxtLink :to="`/${composerSlug}`" :class="{ aktuell: isCurrentPage('') }">Kurzbio</NuxtLink> | 
        <NuxtLink :to="`/${composerSlug}/werke`" :class="{ aktuell: isCurrentPage('/werke') }">Werke</NuxtLink> | 
        <NuxtLink :to="`/${composerSlug}/tontraeger`" :class="{ aktuell: isCurrentPage('/tontraeger') }">Tonträger</NuxtLink> |
        <NuxtLink :to="`/${composerSlug}/texte`" :class="{ aktuell: isCurrentPage('/texte') }"> Texte</NuxtLink>
      </div>
    </div>
    <div id="sidebar">
      <h1><slot name="sidebar-title" /></h1>
    </div>
    <div id="main">
      <slot />
    </div>
    <div id="footer">
      <p>&copy;2022 Zeitvertrieb | Design by h.g. <br /></p>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

const composerSlug = computed(() => {
  const path = route.path
  if (path === '/ablinger' || path.startsWith('/ablinger/')) return 'ablinger'
  if (path === '/lamb' || path.startsWith('/lamb/')) return 'lamb'
  if (path === '/k-lang' || path.startsWith('/k-lang/')) return 'k-lang'
  if (path === '/mashayekhi' || path.startsWith('/mashayekhi/')) return 'mashayekhi'
  return null
})

const isCurrentPage = (suffix) => {
  return route.path === `/${composerSlug.value}${suffix}`
}
</script>
