<template>
  <main
    class="home-page"
    style="display: flex; flex-direction: column; justify-content: center"
  >
    <div
      class="nes-container is-rounded is-dark textbox bottom-text-wrapper"
      v-motion-pop
    >
      <p>
        Hi there! <br />
        I'm Kash, <span class="role-title"> {{ roleName }} </span>
      </p>
    </div>

    <div class="intro-block">
      <GameEmbed class="game-window" v-motion-pop />
    </div>

    <div v-if="!showGame" class="adventure-start">
      <p class="text-center">Pick a colour!</p>

      <div class="topLayer d-flex justify-content-between">
        <button
          @click="test"
          class="nes-btn is-primary my-2 mx-auto"
          style="width: 29%"
          v-motion-pop
        >
          BLUE
        </button>

        <button
          @click="test"
          v-if="!showGame"
          class="nes-btn is-success my-2 mx-auto"
          style="width: 29%"
          v-motion-pop
        >
          GREEN
        </button>

        <button
          @click="test"
          v-if="!showGame"
          class="nes-btn is-warning my-2 mx-auto"
          style="width: 29%; color: white"
          v-motion-pop
        >
          YELLOW
        </button>
      </div>
      <button
        @click="showGame = true"
        v-if="!showGame"
        class="nes-btn is-error mx-auto"
        style="width: 100%"
        v-motion-pop
      >
        START ADVENTURE!
      </button>
    </div>

    <!-- <div
      class="bottom-text-wrapper"
      style="display: flex; flex-direction: row; justify-content: center"
    >
      <button class="nes-btn m-2 is-primary" v-motion-slide-left>Resume</button>
      <button class="nes-btn m-2 is-success" v-motion-slide-left>
        Projects
      </button>
      <button class="nes-btn m-2 is-primary" v-motion-slide-left>
        About Me
      </button>
    </div> -->
  </main>
</template>

<script>
import { ref } from "vue";
import GameEmbed from "../GameEmbed/GameEmbed.vue";
export default {
  components: { GameEmbed },
  setup() {
    // Setup role rotation for intro page

    const roleList = [
      "a developer.",
      "an engineer.",
      "a writer.",
      "a gamer.",
      "a builder.",
      "a streamer.",
      "a poet.",
      "a tinkerer.",
    ];

    let roleNumber = 0;

    const roleName = ref("");

    setRoleName(roleNumber);

    async function setRoleName(roleNumber) {
      // console.log("running function");

      roleName.value = "";

      let stringArray = Array.from(roleList[roleNumber]);

      // console.log(stringArray);

      for (let item of stringArray) {
        await new Promise((resolve) => {
          setTimeout(() => {
            roleName.value = roleName.value + item;
            // console.log(roleName.value);
            resolve();
          }, 25);
        });
      }

      if (roleNumber === roleList.length - 1) {
        roleNumber = 0;
      } else {
        roleNumber++;
      }

      setTimeout(() => setRoleName(roleNumber), 3000);
    }

    //setup game show flag

    const showGame = ref(false);

    return { roleName, showGame };
  },
};
</script>

<style scoped lang="scss">
.adventure-start {
  position: absolute;
  bottom: 10px;
  width: calc(100vw - 4em - 6vw);
  z-index: 1;
}

.intro-block {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.role-title {
  color: #33ccff;
}

.home-page {
  height: 100vh;
  overflow: hidden;
}

.textbox {
  width: calc(100vw - 3em - 5vw);
  font-size: 25px;

  @media (max-width: 769px) {
    min-height: 160px;
  }
}

.bottom-text-wrapper {
  position: absolute;
  top: 10px;
  z-index: 1;
}

.game-window {
  height: 100vh;
}
</style>