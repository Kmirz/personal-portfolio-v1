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
  }),
});
