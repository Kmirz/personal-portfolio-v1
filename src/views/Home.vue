<template>
  <main
    class="home-page"
    style="display: flex; flex-direction: column; justify-content: center"
  >
    <!-- <div class="hero-container nes-container is-rounded">
      <h1>Choose your character!</h1>

      <div class="row-one">
        <button class="hero-selection">
          <img src="/hero.png" alt="" />
        </button>
        <button class="hero-selection">
          <img src="/hero.png" alt="" />
        </button>
        <button class="hero-selection">
          <img src="/hero.png" alt="" />
        </button>
      </div>
      <div class="row-two">
        <button class="hero-selection">
          <img src="/hero.png" alt="" />
        </button>
        <button class="hero-selection">
          <img src="/hero.png" alt="" />
        </button>
      </div>
      <button class="nes-btn m-2 is-error" v-motion-pop>
        START ADVENTURE!
      </button>
    </div> -->

    <div class="intro-block">
      <button class="nes-btn m-2 is-error start-adventure" v-motion-pop>
        START ADVENTURE!
      </button>

      <div class="bottom-text-wrapper">
        <div class="nes-container is-rounded is-dark textbox" v-motion-pop>
          <p>
            Hi there! <br />
            I'm Kash, <span class="role-title"> {{ roleName }} </span>
          </p>
        </div>
        <button class="nes-btn m-2 is-primary" v-motion-slide-left>
          Resume
        </button>
        <button class="nes-btn m-2 is-success" v-motion-slide-left>
          Projects
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    // Setup role rotation for intro page

    const roleList = ["a developer.", "an engineer.", "a writer."];

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
          }, 150);
        });
      }

      if (roleNumber === roleList.length - 1) {
        roleNumber = 0;
      } else {
        roleNumber++;
      }

      setTimeout(() => setRoleName(roleNumber), 3000);
    }

    return { roleName };
  },
};
</script>

<style scoped>
.intro-block {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.role-title {
  color: #33ccff;
}

.start-adventure {
  font-size: 20px;
}

.home-page {
  height: 100vh;
}

.textbox {
  width: 100%;
  font-size: 25px;
}
</style>