<template>
  <main class="settings home-page">
    <h1>Projects</h1>
    <p>These are some fun projects I've done so far!</p>
    <div class="row">
      <div class="col-sm-6 my-2">
        <div class="card">
          <div class="card-body">
            <img src="/dndscreenshot.png" alt="" class="card-img-top" />
            <h5 class="card-title my-3">DnD Random Character Generator</h5>

            <p class="card-text alt-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <a
              href="https://dnd-random-generator-vuejs.herokuapp.com/"
              class="btn btn-primary m-2"
              target="_blank"
              >Live Demo</a
            >
            <a
              href="https://github.com/Kmirz/DnD-Character-Generator-VueJS"
              class="btn btn-success m-2"
              target="_blank"
              >Github Repo</a
            >
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {};
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}

img {
  max-height: 300px;
  max-width: 300px;
}
</style>