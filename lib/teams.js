export const TEAMS = [
  { id: "hey-yaho", name: "HEY야호", color: "#FCE38A", edge: "#F2C94C" },
  { id: "godsaeng-lion", name: "갓생사자", color: "#B7E8C7", edge: "#4CAF7D" },
  { id: "bukbu-yeti", name: "북부대공예티", color: "#BEE0F7", edge: "#4A9FD6" },
  { id: "arcu", name: "아크크", color: "#F6C6DE", edge: "#E37CA8" },
];

export function getTeamByName(name) {
  return TEAMS.find((t) => t.name === name);
}
