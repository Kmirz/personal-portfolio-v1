import { defineStore } from "pinia";

export const useContext = defineStore({
  id: "gameState",
  state: () => ({
    selectedButton: "green",
    runEnabled: false,
    interact: false,
    controllerDirection: "/Controller/idle.png",
    showMessage: false,
    messageContent: "test",
    playerDownDynamic: "/img/playerCharacter/Green/playerDown.png",
    playerLeftDynamic: "/img/playerCharacter/Green/playerLeft.png",
    playerRightDynamic: "/img/playerCharacter/Green/playerRight.png",
    playerUpDynamic: "/img/playerCharacter/Green/playerUp.png",
    NPCID: "",
    showPhoto: false,
    photoSelected: false
  }),
});
