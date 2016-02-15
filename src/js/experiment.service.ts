import {Injectable} from "angular2/core";

@Injectable()
export class ExperimentService {
  getCards() {
    return [
      { num: "5", suit: "spades" },
      { num: "4", suit: "hearts" },
      { num: "6", suit: "spades" },
      { num: "ace", suit: "diamonds" },
      { num: "3", suit: "hearts" },
      { num: "5", suit: "hearts" },
      { num: "6", suit: "clubs" },
      { num: "7", suit: "spades" },
      { num: "ace", suit: "hearts" }
    ];
  }

  getIntervals() {
    return [
      30,
      30,
      50,
      50,
      70,
      70,
      100,
      100,
      150,
      150,
      200,
      200,
      250,
      250,
      300,
      300,
      400,
      400,
      450,
      450,
      500,
      500,
      600,
      600,
      700,
      700,
      800,
      800,
      900,
      900,
      1000,
      1000
    ];
  }
}