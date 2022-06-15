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
      <p class="text-center" style="color: white">Pick a colour!</p>

      <div class="topLayer d-flex justify-content-between">
        <button
          @click="changeColour('blue')"
          class="nes-btn is-primary my-2 mx-auto"
          :class="{ 'opacity-75': selectedButton !== 'blue' }"
          style="width: 29%"
          v-motion-pop
        >
          BLUE
        </button>

        <button
          @click="changeColour('green')"
          class="nes-btn is-success my-2 mx-auto"
          :class="{ 'opacity-75': selectedButton !== 'green' }"
          style="width: 29%"
          v-motion-pop
        >
          GREEN
        </button>

        <button
          @click="changeColour('yellow')"
          class="nes-btn is-warning my-2 mx-auto"
          :class="{ 'opacity-75': selectedButton !== 'yellow' }"
          style="width: 29%; color: white"
          v-motion-pop
        >
          YELLOW
        </button>
      </div>
      <button
        @click="startAdventure"
        class="nes-btn is-error mx-auto"
        style="width: 100%"
        v-motion-pop
      >
        START ADVENTURE!
      </button>
    </div>

    <div v-if="showGame" class="adventure-start">
      <p class="text-center" style="color: white">
        Use A,W,S,D or swipe to move around and explore!
      </p>
    </div>
  </main>
</template>

<script>
import { ref } from "vue";
import GameEmbed from "../GameEmbed/GameEmbed.vue";

import { useContext } from "../stores/gameState";
import { storeToRefs } from "pinia";

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

    //Changing colours on opening selection

    const gameState = useContext();
    const { selectedButton, runEnabled } = storeToRefs(gameState);

    function changeColour(colour) {
      selectedButton.value = colour;

      switch (colour) {
        case "yellow":
          document.documentElement.style.setProperty("--primary", "#fff600");

          document.documentElement.style.setProperty("--dark", "#f4c127");
          document.documentElement.style.setProperty("--dark-alt", "#d87d0f");

          break;

        case "green":
          document.documentElement.style.setProperty("--primary", "#4ade80");
          document.documentElement.style.setProperty("--dark", "#2e6c2f");
          document.documentElement.style.setProperty("--dark-alt", "#334155");

          break;

        case "blue":
          document.documentElement.style.setProperty("--primary", "#33ccff");
          document.documentElement.style.setProperty("--dark", "#4d9ba6");
          document.documentElement.style.setProperty("--dark-alt", "#2f6bbe");

          break;

        default:
          throw new Error("Invalid Color Selected");
      }
    }

    function startAdventure() {
      runEnabled.value = true;
      showGame.value = true;
    }

    return {
      roleName,
      showGame,
      changeColour,
      runEnabled,
      selectedButton,
      startAdventure,
    };
  },
};
</script>

<style scoped lang="scss">
.adventure-start {
  position: absolute;
  bottom: 10px;
  width: calc(100vw - 80px - 6vw);
  z-index: 1;

  @media (max-width: 769px) {
    font-size: 9px;
    min-height: 120px;
  }

  @media (min-width: 769px) {
    min-height: 160px;
    font-size: 20px;
  }
}

.intro-block {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.role-title {
  color: var(--primary);
}

.home-page {
  height: 100vh;
  overflow: hidden;
}

.textbox {
  @media (max-width: 769px) {
    width: calc(100vw - 80px - 5vw);

    font-size: 17px;
    min-height: 120px;
  }

  @media (min-width: 769px) {
    width: calc(100vw - 80px - 5vw);

    min-height: 160px;
    font-size: 25px;
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