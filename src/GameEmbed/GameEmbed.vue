<template>
  <canvas ref="canvasBlock"></canvas>
</template>

<script>
import { ref, onMounted } from "vue";

import charactersMapData from "./data/characters";
import collisions from "./data/collisions";
import { Sprite, Boundary } from "./data/classes";
import { rectangularCollision, checkForCharacterCollision } from "./data/utils";

import { useContext } from "../stores/gameState";
import { storeToRefs } from "pinia";

export default {
  name: "GameEmbed",
  setup() {
    const canvasBlock = ref(null);

    const gameState = useContext();
    const { runEnabled, interact, controllerDirection, playerDownDynamic, playerLeftDynamic, playerRightDynamic, playerUpDynamic, NPCID } =
      storeToRefs(gameState);

    const audio = {
      Map: new Howl({
        src: "/audio/map.wav",
        html5: true,
        volume: 0.1,
      }),
    };

    const keys = {
      w: {
        pressed: false,
      },
      a: {
        pressed: false,
      },
      s: {
        pressed: false,
      },
      d: {
        pressed: false,
      },
    };

    onMounted(() => {
      const canvas = canvasBlock.value;

      const c = canvas.getContext("2d");

      // canvas.width = (1024 + 500)*4;
      canvas.width = 1024 + 500;
      // canvas.height = 576*4;
      canvas.height = 576;
      console.log(canvas);

      // const collisionsMap = [];
      // for (let i = 0; i < collisions.length; i += 70) {
      //   collisionsMap.push(collisions.slice(i, 70 + i));
      // }

      const collisionsMap = collisions

      console.log({collisionsMap})

      console.log(charactersMapData);


      const charactersMap = charactersMapData
      // const charactersMap = [];
      // for (let i = 0; i < charactersMapData.length; i += 70) {
      //   charactersMap.push(charactersMapData.slice(i, 70 + i));
      // }
      // console.log({charactersMap})

      const boundaries = [];
      const offset = {
        x: -735 + 250,
        y: -720,
      };

      collisionsMap.forEach((row, i) => {
        row.forEach((symbol, j) => {
          if (symbol === 1025)
            boundaries.push(
              new Boundary({
                position: {
                  x: j * Boundary.width + offset.x,
                  y: i * Boundary.height + offset.y,
                },
              })
            );
        });
      });

      const characters = [];
      const villagerImg = new Image();
      villagerImg.src = "/img/villager/Idle.png";

      const oldManImg = new Image();
      oldManImg.src = "/img/oldMan/Idle.png";

      const leticiaImg = new Image();
      leticiaImg.src = "/img/Leticia/Idle.png";

      charactersMap.forEach((row, i) => {
        row.forEach((symbol, j) => {
          // 1026 === James
          if (symbol === "James") {
            characters.push(
              new Sprite({
                position: {
                  x: j * Boundary.width + offset.x,
                  y: i * Boundary.height + offset.y,
                },
                image: villagerImg,
                frames: {
                  max: 2,
                  hold: 90,
                },
                scale: 1.0,
                animate: true,
                NPCID: "James"
              })
            );

            //Creates character boundary
            boundaries.push(
              new Boundary({
                position: {
                  x: j * Boundary.width + offset.x + 60,
                  y: i * Boundary.height + offset.y + 60,
                },
              })
            );
          }
          // 1031 === Juno
          else if (symbol === "Juno the cutest Dog") {
            characters.push(
              new Sprite({
                position: {
                  x: j * Boundary.width + offset.x,
                  y: i * Boundary.height + offset.y,
                },
                image: oldManImg,
                frames: {
                  max: 7,
                  hold: 5,
                },
                scale: 1,
                animate: true,
                NPCID: "Juno the cutest Dog"
              })
            );
          
            //Creates character boundary
            boundaries.push(
              new Boundary({
                position: {
                  x: j * Boundary.width + offset.x + 15,
                  y: i * Boundary.height + offset.y + 60,
                },
              })
            );
          
          }

          else if (symbol === "Leticia") {
            characters.push(
              new Sprite({
                position: {
                  x: j * Boundary.width + offset.x,
                  y: i * Boundary.height + offset.y,
                },
                image: leticiaImg,
                frames: {
                  max: 8,
                  hold: 5,
                },
                scale: 1,
                animate: true,
                NPCID: "Leticia"
              })
            );
          
            //Creates character boundary
            boundaries.push(
              new Boundary({
                position: {
                  x: j * Boundary.width + offset.x + 15,
                  y: i * Boundary.height + offset.y + 60,
                },
              })
            );
          
          }


        });
      });

      const image = new Image();
      image.src = "/img/Pellet Town.png";

      const foregroundImage = new Image();
      foregroundImage.src = "/img/foregroundObjects.png";

      const playerDownImage = new Image();
      // playerDownImage.src = "/img/playerDown.png";
      playerDownImage.src = playerDownDynamic.value;
      
      const playerUpImage = new Image();
      playerUpImage.src = "/img/playerUp.png";

      const playerLeftImage = new Image();
      playerLeftImage.src = "/img/playerLeft.png";

      const playerRightImage = new Image();
      playerRightImage.src = "/img/playerRight.png";

      const player = new Sprite({
        position: {
          x: canvas.width / 2 - 192 / 4 / 2,
          y: canvas.height / 2 - 68 / 2,
        },
        image: playerDownImage,
        frames: {
          max: 4,
          hold: 10,
        },
        sprites: {
          up: playerUpImage,
          left: playerLeftImage,
          right: playerRightImage,
          down: playerDownImage,
        },
      });

      const background = new Sprite({
        position: {
          x: offset.x,
          y: offset.y,
        },
        image: image,
      });

      const foreground = new Sprite({
        position: {
          x: offset.x,
          y: offset.y,
        },
        image: foregroundImage,
      });

      const renderables = [
        background,
        ...boundaries,
        ...characters,
        player,
        foreground,
      ];

      let movables = [background, ...boundaries, foreground, ...characters];

      function animate() {

        playerDownImage.src = playerDownDynamic.value;
        playerLeftImage.src = playerLeftDynamic.value;
        playerRightImage.src = playerRightDynamic.value;
        playerUpImage.src = playerUpDynamic.value;


        if (runEnabled.value) {
          movables = [background, ...boundaries, foreground, ...characters];
        } else {
          movables = [];
        }

        const animationId = window.requestAnimationFrame(animate);
        renderables.forEach((renderable) => {
          renderable.draw(c);
        });

        let moving = true;
        player.animate = false;

        if (keys.w.pressed && lastKey.length > 0 && lastKey[0] === "w") {
          player.animate = true;
          player.image = player.sprites.up;

          controllerDirection.value = "/Controller/up.png";

          NPCID.value = checkForCharacterCollision({
            characters,
            player,
            characterOffset: { x: 0, y: 3 },
          });

          interact.value = NPCID.value != "NA";

          for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
              rectangularCollision({
                rectangle1: player,
                rectangle2: {
                  ...boundary,
                  position: {
                    x: boundary.position.x,
                    y: boundary.position.y + 3,
                  },
                },
              })
            ) {
              moving = false;
              break;
            }
          }

          if (moving)
            movables.forEach((movable) => {
              movable.position.y += 3;
            });
        } else if (keys.a.pressed && lastKey.length > 0 && lastKey[0] === "a") {
          player.animate = true;
          player.image = player.sprites.left;

          controllerDirection.value = "/Controller/left.png";

          NPCID.value = checkForCharacterCollision({
            characters,
            player,
            characterOffset: { x: 0, y: 3 },
          });

          interact.value = NPCID.value != "NA";

          for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
              rectangularCollision({
                rectangle1: player,
                rectangle2: {
                  ...boundary,
                  position: {
                    x: boundary.position.x + 3,
                    y: boundary.position.y,
                  },
                },
              })
            ) {
              moving = false;
              break;
            }
          }

          if (moving)
            movables.forEach((movable) => {
              movable.position.x += 3;
            });
        } else if (
          (keys.s.pressed && lastKey.length > 0 && lastKey[0] === "s") ||
          runEnabled.value === false
        ) {
          player.animate = true;
          player.image = player.sprites.down;

          controllerDirection.value = "/Controller/down.png";

          NPCID.value = checkForCharacterCollision({
            characters,
            player,
            characterOffset: { x: 0, y: 3 },
          });

          interact.value = NPCID.value != "NA";

          for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
              rectangularCollision({
                rectangle1: player,
                rectangle2: {
                  ...boundary,
                  position: {
                    x: boundary.position.x,
                    y: boundary.position.y - 3,
                  },
                },
              })
            ) {
              moving = false;
              break;
            }
          }

          if (moving)
            movables.forEach((movable) => {
              movable.position.y -= 3;
            });
        } else if (keys.d.pressed && lastKey.length > 0 && lastKey[0] === "d") {
          player.animate = true;
          player.image = player.sprites.right;

          controllerDirection.value = "/Controller/right.png";

          NPCID.value = checkForCharacterCollision({
            characters,
            player,
            characterOffset: { x: 0, y: 3 },
          });

          interact.value = NPCID.value != "NA";

          for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
              rectangularCollision({
                rectangle1: player,
                rectangle2: {
                  ...boundary,
                  position: {
                    x: boundary.position.x - 3,
                    y: boundary.position.y,
                  },
                },
              })
            ) {
              moving = false;
              break;
            }
          }

          if (moving)
            movables.forEach((movable) => {
              movable.position.x -= 3;
            });
        }
      }

      animate();

      let lastKey = [];

      window.addEventListener("keydown", (e) => {
        if (runEnabled.value) {
          switch (e.key) {
            case "w":
              keys.w.pressed = true;
              if (!lastKey.includes("w")) {
                lastKey.unshift("w");
              }

              break;
            case "a":
              keys.a.pressed = true;
              if (!lastKey.includes("a")) {
                lastKey.unshift("a");
              }
              break;

            case "s":
              keys.s.pressed = true;
              if (!lastKey.includes("s")) {
                lastKey.unshift("s");
              }
              break;

            case "d":
              keys.d.pressed = true;
              if (!lastKey.includes("d")) {
                lastKey.unshift("d");
              }
              break;
          }
        }
      });

      window.addEventListener("keyup", (e) => {
        switch (e.key) {
          case "w":
            keys.w.pressed = false;
            lastKey = lastKey.filter((key) => key !== "w");
            controllerDirection.value = "/Controller/idle.png";
            break;
          case "a":
            keys.a.pressed = false;
            lastKey = lastKey.filter((key) => key !== "a");
            controllerDirection.value = "/Controller/idle.png";
            break;
          case "s":
            keys.s.pressed = false;
            lastKey = lastKey.filter((key) => key !== "s");
            controllerDirection.value = "/Controller/idle.png";
            break;
          case "d":
            keys.d.pressed = false;
            lastKey = lastKey.filter((key) => key !== "d");
            controllerDirection.value = "/Controller/idle.png";
            break;
        }
      });

      let swipeCheck = false;

      // create a simple instance
      // by default, it only adds horizontal recognizers
      const mc = new Hammer(canvasBlock.value);

      // let the pan gesture support all directions.
      // this will block the vertical scrolling on a touch-device while on the element
      mc.get("pan").set({ direction: Hammer.DIRECTION_ALL });

      // listen to events...
      mc.on("panleft panright panup pandown tap press", function (ev) {
        console.log(ev.type + " gesture detected.");

        if (runEnabled.value) {
          switch (ev.type) {
            case "panup":
              keys.w.pressed = true;
              lastKey = ["w"];

              break;
            case "panleft":
              keys.a.pressed = true;
              lastKey = ["a"];
              break;

            case "pandown":
              keys.s.pressed = true;
              lastKey = ["s"];
              break;

            case "panright":
              keys.d.pressed = true;
              lastKey = ["d"];
              break;
          }
        }
      });

      mc.on("panend", function (ev) {
        console.log(ev.type + " gesture detected.");
        controllerDirection.value = "/Controller/idle.png";

        lastKey = [];
      });
    });

    // let clicked = false;
    // addEventListener("click", () => {
    //   if (!clicked) {
    //     audio.Map.play();
    //     clicked = true;
    //   }
    // });

    return { canvasBlock, interact, controllerDirection, playerDownDynamic, playerLeftDynamic, playerRightDynamic, playerUpDynamic };
  },
};
</script>

<style scoped>
</style>