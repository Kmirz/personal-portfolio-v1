import { defineStore } from "pinia";

export const useContext = defineStore({
  id: "gameState",
  state: () => ({
    selectedButton: "blue",
    runEnabled: false,
  }),
});
