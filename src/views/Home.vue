<template>
  <main
    class="home-page"
    style="display: flex; flex-direction: column; justify-content: center"
  >
    <div
      v-show="showFirstMessage"
      class="nes-container is-rounded is-dark textbox bottom-text-wrapper"
      v-motion-pop
    >
      <p>
        Hi there! <br />
        I'm Kash, <span class="role-title"> {{ roleName }} </span>
      </p>
    </div>

      <div
        v-show="showMessage"
        class="nes-container with-title is-rounded is-dark textbox bottom-text-wrapper unselectable"
        v-motion-pop
      >
        <p class="title">{{NPCID}}</p>
        <p>{{ messageContent }}</p>
      </div>
      
      <div
        v-if="showPhoto"
        class="nes-container with-title is-rounded is-dark textbox image-wrapper unselectable"
        v-motion-pop
      >
        <img
          class="photo"
          :src= "photoSelected"
          alt=""
        />
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
    <div v-if="showGame" draggable="false" class="adventure-start unselectable">
      <p class="text-center my-0" style="color: white">
        Use A,W,S,D or swipe to move around and explore!
      </p>
      <img
        draggable="false"
        class="unselectable"
        :src="controllerDirection"
        alt=""
      />
      <button
        v-show="interact"
        @click="InteractNPC"
        class="nes-btn is-error mx-auto"
        style="
          width: 50%;
          color: white;
          pointer-events: auto;
          font-size: 15px;
          position: absolute;
          bottom: 50px;
          right: 10px;
        "
        v-motion-pop
      >
        Talk
      </button>
    </div>
  </main>
</template>

<script>
import { ref, onUnmounted, onMounted, watch } from "vue";
import GameEmbed from "../GameEmbed/GameEmbed.vue";

import { useContext } from "../stores/gameState";
import { storeToRefs } from "pinia";

export default {
  components: { GameEmbed },
  setup() {
    // Setup role rotation for intro page

    const roleList = [
      "a story teller.",
      "a product owner.",
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
    const showFirstMessage = ref(true);

    //Changing colours on opening selection

    const gameState = useContext();
    const {
      selectedButton,
      runEnabled,
      interact,
      controllerDirection,
      showMessage,
      messageContent,
      playerDownDynamic, playerLeftDynamic, playerRightDynamic, playerUpDynamic,
      NPCID, showPhoto, photoSelected, disableTalk
    } = storeToRefs(gameState);

    function changeColour(colour) {
      selectedButton.value = colour;

      switch (colour) {
        case "yellow":
          document.documentElement.style.setProperty("--primary", "#fff600");

          document.documentElement.style.setProperty("--dark", "#f4c127");
          document.documentElement.style.setProperty("--dark-alt", "#d87d0f");

          playerDownDynamic.value = "/img/playerCharacter/Yellow/playerDown.png";
          playerLeftDynamic.value = "/img/playerCharacter/Yellow/playerLeft.png";
          playerRightDynamic.value = "/img/playerCharacter/Yellow/playerRight.png";
          playerUpDynamic.value = "/img/playerCharacter/Yellow/playerUp.png";

          break;

        case "green":
          document.documentElement.style.setProperty("--primary", "#4ade80");
          document.documentElement.style.setProperty("--dark", "#2e6c2f");
          document.documentElement.style.setProperty("--dark-alt", "#334155");

          playerDownDynamic.value = "/img/playerCharacter/Green/playerDown.png";
          playerLeftDynamic.value = "/img/playerCharacter/Green/playerLeft.png";
          playerRightDynamic.value = "/img/playerCharacter/Green/playerRight.png";
          playerUpDynamic.value = "/img/playerCharacter/Green/playerUp.png";

          break;

        case "blue":
          document.documentElement.style.setProperty("--primary", "#33ccff");
          document.documentElement.style.setProperty("--dark", "#4d9ba6");
          document.documentElement.style.setProperty("--dark-alt", "#2f6bbe");

          playerDownDynamic.value = "/img/playerCharacter/Blue/playerDown.png";
          playerLeftDynamic.value = "/img/playerCharacter/Blue/playerLeft.png";
          playerRightDynamic.value = "/img/playerCharacter/Blue/playerRight.png";
          playerUpDynamic.value = "/img/playerCharacter/Blue/playerUp.png";

          break;

        default:
          throw new Error("Invalid Color Selected");
      }
    }

    function startAdventure() {
      runEnabled.value = true;
      showGame.value = true;
      showFirstMessage.value = false;
    }

    // NPC interaction

    function InteractNPC() {
      showMessage.value = true;
      messageContent.value = "";
      disableTalk.value = false;
      showNPCText();
    }

    async function showNPCText() {
      // console.log("running function");

      // interact.value = false;

      let conversationList = {
      'James'  : ["Kash cares a lot about diversity and inclusion ▶", "He led the logistics team at VentureOut ▶",0, "One of Canada's largest LGBT+ tech conferences"],
      'Juno the cutest Dog' : ["Woof Woof! ▶", 1, "Woof! ▶", "Woof Woof!"],
      'Leticia' : ["Isn't this really cool? ▶", "Talk to everyone to learn more about Kash! ▶", 2, "Like how he worked in Robotic Process Automation!"],
      }

      let imageList = [
        "public/img/Photos/venture Out.jpeg",
        "public/img/Photos/juno.jpg",
        "/82502279_1029047344128278_5322203239888715776_n.jpg"
      ]

      const chosenConversation = conversationList[NPCID.value]

      // console.log(stringArray);
      // const stringArray = await fetch("http://localhost:3001/mock").then(response => response.json()).then(response => response.message)

      for (let chosenConversationLine of chosenConversation) {
        
        if(typeof chosenConversationLine === "string"){
          messageContent.value = "";
          
          for (let character of chosenConversationLine) {
            if(interact.value === true){
            await new Promise((r) => setTimeout(r, 20));
            messageContent.value = messageContent.value + character;
          } else return;
          }
           await new Promise((r) => setTimeout(r, 2000));
            
        } else {
          photoSelected.value = imageList[chosenConversationLine]
          showPhoto.value = true;
          // photoID = chosenConversationLine;
          console.log("updated photoSelected to", photoSelected)
        }

      }
    }

    // turns off message visibility when moving away from NPC

    watch(interact, (currentValue, oldValue) => {
      if (!interact.value) {
        showMessage.value = false;
        showPhoto.value = false;
      }
    });

    //resetting to defaults

    onUnmounted(() => {
      showMessage.value = false;
      showFirstMessage.value = true;
      runEnabled.value = false;
    });

    onMounted(() => {
      window.scrollTo(0, 0);
    });

    return {
      roleName,
      showGame,
      changeColour,
      runEnabled,
      selectedButton,
      startAdventure,
      interact,
      controllerDirection,
      showFirstMessage,
      showMessage,
      messageContent,
      InteractNPC,
      playerDownDynamic, playerLeftDynamic, playerRightDynamic, playerUpDynamic, NPCID, photoSelected, showPhoto, disableTalk
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

.image-wrapper {
  position: absolute;
  top: 180px;
  z-index: 2;
  height: 40vh;
  text-align: center;
}

.photo {
  z-index: 1;
  height: 100%;
}

.game-window {
  height: 100vh;
}

.unselectable {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  pointer-events: none;
}
</style>