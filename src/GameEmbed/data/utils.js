export function rectangularCollision({ rectangle1, rectangle2 }) {
  return rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
  rectangle1.position.x <= rectangle2.position.x + rectangle2.width && 
  rectangle1.position.y <= rectangle2.position.y + rectangle2.height - 50 && 
  rectangle1.position.y + rectangle1.height >= rectangle2.position.y;
}

export function NPCCollision({ rectangle1, rectangle2 }) {
  return rectangle1.position.x + rectangle1.width + 25 >= rectangle2.position.x && 
  rectangle1.position.x <= rectangle2.position.x + rectangle2.width + 25 && 
  rectangle1.position.y <= rectangle2.position.y + rectangle2.height + 25 && 
  rectangle1.position.y + rectangle1.height + 25 >= rectangle2.position.y;
}

export function checkForCharacterCollision({ characters, player, characterOffset = { x: 0, y: 0 } }) {
  // monitor for character collision
  for (let i = 0; i < characters.length; i++) {
    const character = characters[i];

    // player.height = player.height + 10;

    if (
      NPCCollision({
        rectangle1: player,
        rectangle2: {
          ...character,
          position: {
            x: character.position.x + characterOffset.x,
            y: character.position.y + characterOffset.y,
          },
        },
      })
    ) {
      console.log("Interacting with: ", character.NPCID)
      return character.NPCID;
    }
  }

  return "NA"; //Will render interact value to be false
}
