<template>
  <main class="settings home-page">
    <h1>Projects</h1>
    <p>These are some fun projects I've done so far!</p>

    <div class="row">
      <div class="col-sm-6 col-xl-3 col-lg-4 my-2" v-motion-pop :delay="100">
        <div class="card">
          <div class="card-body d-flex flex-column">
            <img src="/dndscreenshot.png" alt="" class="card-img-top mx-auto" />
            <h5 class="card-title my-3 text-center">
              DnD Random Character Generator
            </h5>

            <p class="card-text alt-text">
              Randomly generates Dungeons and Dragons character profiles,
              leveraging the DnD API.
            </p>

            <p class="card-text alt-text">
              Generates PDF server-side and provides the output in a
              downloadable format for the user.
            </p>

            <p class="card-text alt-text text-center" style="color: grey">
              HTML, CSS, VUE.JS, EXPRESS, Node.js
            </p>
            <div class="row mx-auto d-flex justify-content-between">

              <a
                href="https://github.com/Kmirz/DnD-Character-Generator-VueJS"
                class="btn btn-success my-2"
                target="_blank"
                >Github Repo</a
              >
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-xl-3 col-lg-4 my-2" v-motion-pop :delay="200">
        <div class="card">
          <div class="card-body d-flex flex-column">
            <img
              src="/dynamicSidebarScreenshot.png"
              alt=""
              class="card-img-top mx-auto"
            />
            <h5 class="card-title my-3 text-center">Responsive Sidebar</h5>

            <p class="card-text alt-text">
              Dynamic sidebar with Vue routing, enabling the user to cycle
              through different pages.
            </p>

            <p class="card-text alt-text">
              Has an open and closed state saved to local storage.
            </p>

            <p class="card-text alt-text text-center" style="color: grey">
              HTML, CSS, VUE.JS
            </p>
            <div class="row mx-auto d-flex justify-content-between">

              <a
                href="https://github.com/Kmirz/Responsive-Sidebar-VueJS"
                class="btn btn-success my-2"
                target="_blank"
                >Github Repo</a
              >
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-xl-3 col-lg-4 my-2" v-motion-pop :delay="300">
        <div class="card">
          <div class="card-body d-flex flex-column">
            <img
              src="/taskTrackerScreenshot.png"
              alt=""
              class="card-img-top mx-auto"
            />
            <h5 class="card-title my-3 text-center">Task Tracker</h5>

            <p class="card-text alt-text">
              Task tracker allowing for marking of different tasks and their
              completion.
            </p>

            <p class="card-text alt-text text-center" style="color: grey">
              HTML, CSS, VUE.JS
            </p>
            <div class="row mx-auto d-flex justify-content-between">

              <a
                href="https://github.com/Kmirz/Task-Tracker-VueJS"
                class="btn btn-success my-2"
                target="_blank"
                >Github Repo</a
              >
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-xl-3 col-lg-4 my-2" v-motion-pop :delay="400">
        <div class="card">
          <div class="card-body d-flex flex-column">
            <img
              src="/subscriberscreenshot.png"
              alt=""
              class="card-img-top mx-auto"
            />
            <h5 class="card-title my-3 text-center">
              Subscriber Profile Generator
            </h5>

            <p class="card-text alt-text">
              Randomly generates a subsriber profile based on the Random User
              API. Stores the data in a Mongo.DB database and preserved upon
              reload.
            </p>

            <p class="card-text alt-text text-center" style="color: grey">
              HTML, CSS, VUE.JS, EXPRESS, Node.js, Mongo.DB
            </p>
            <div class="row mx-auto d-flex justify-content-between">

              <a
                href="https://github.com/Kmirz/Subscriber-REST-API-FullStack"
                class="btn btn-success my-2"
                target="_blank"
                >Github Repo</a
              >
            </div>
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
  height: 250px;
  max-width: 300px;
}
</style>