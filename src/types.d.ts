
// Тип для игрового кейса
export type Case = {
  id: number;
  name: string;
  price: number;
  image: string;
  rarity: "common" | "rare" | "epic" | "legendary";
};

// Тип для предмета, который может выпасть из кейса
export type Item = {
  id: string;
  name: string;
  price: number;
  image: string;
  rarity: "common" | "rare" | "epic" | "legendary";
};
