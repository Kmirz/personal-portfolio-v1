<template>
  <main class="about-page">
    <h1>About Me</h1>

    <div class="row mx-auto">
      <div
        class="
          nes-container
          with-title
          is-centered is-rounded
          my-3
          mx-auto
          col-md-5 col-xl-3
        "
        style="width: 350px"
        v-motion-slide-left
      >
        <p class="title" style="background: #f5f5f5; margin-top: -30px">
          It's me!
        </p>
        <img
          class="picture-box mx-auto"
          src="/82502279_1029047344128278_5322203239888715776_n.jpg"
          alt=""
        />
      </div>

      <div class="top-wrapper col-md-6 col-xl-8 m-auto" v-motion-slide-right>
        <div class="nes-container with-title is-centered is-rounded my-3">
          <p class="title" style="background: #f5f5f5; margin-top: -30px">
            Introduction
          </p>
          <p class="alt-text">
            Welcome! I’m a development lead, process engineer, and certified
            scrum master (CSM) - currently applying my development, process
            improvement, and digitization skillset to improve client and
            employee experience.
          </p>
        </div>

        <div
          role="button"
          @click="setFact(factNumber)"
          class="nes-container is-rounded is-dark"
          style="min-height: 100px"
        >
          <p>{{ message }} {{ endPoint }} &nbsp;</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const message = ref("Click here for some cool facts about Kash!");

    const endPoint = ref("\u25BC");

    let showEndPoint = false;

    const factList = [
      "He loves you very much",
      "He also meows randomly",
      "He is a super cool vtuber",
    ];

    const factNumber = ref(0);

    const messageEnd = setInterval(() => {
      showEndPoint = !showEndPoint;

      if (showEndPoint) {
        endPoint.value = "\u25BC";
      } else {
        endPoint.value = "";
        console.log(showEndPoint);
      }
    }, 700);

    async function setFact() {
      // console.log("running function");

      message.value = "";

      let stringArray = Array.from(factList[factNumber.value]);

      // console.log(stringArray);

      for (let item of stringArray) {
        await new Promise((resolve) => {
          setTimeout(() => {
            message.value = message.value + item;
            resolve();
          }, 25);
        });
      }

      if (factNumber.value === factList.length - 1) {
        factNumber.value = 0;
      } else {
        factNumber.value++;
      }
    }

    return { message, endPoint, factNumber, setFact };
  },
};
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}

main {
  min-height: 100vh;
}

p {
  text-align: left;
}

.picture-box {
  max-height: 300px;
  max-width: 300px;
}
</style>