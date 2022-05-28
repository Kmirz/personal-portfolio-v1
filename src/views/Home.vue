<template>
  <main class="home-page">
    <div class="nes-container is-rounded is-dark" v-motion-pop>
      <p>
        Hi there! <br />
        I'm Kash, <span class="role-title">a developer.</span>
      </p>
    </div>
    <button class="nes-btn m-2 is-primary" v-motion-slide-left>Resume</button>
    <button class="nes-btn m-2 is-success" v-motion-slide-left>Projects</button>

    <div class="adventure-trigger">VV scroll for adventure VV</div>

    <div class="nes-container is-rounded">
      <p>Good morning. Thou hast had a good night's sleep, I hope.</p>
    </div>
    <div class="nes-container is-rounded is-dark" v-motion-pop-visible>
      <p>
        Throughout my career, I've had the opportunity to many different
        <span class="role-title">opportunities</span>
      </p>
    </div>
  </main>
</template>

<script>
</script>

<style scoped>
.role-title {
  color: #33ccff;
}

.home-page {
  height: 100%;
}

.adventure-trigger {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 70vh;
}
</style>