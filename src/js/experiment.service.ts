import {Injectable} from "angular2/core";
import {Card} from "./card";
import {Result} from "./result";

interface Response {
  card: Card,
  interval: number,
  cardNum: number,
  response: any
}


@Injectable()
export class ExperimentService {
  private responses: Response[];
  private results: Result[];

  getCards() {
    return [
      { num: "5", suit: "spades", real: true, color: 'black' },
      { num: "4", suit: "hearts", real: false, color: 'black' },
      { num: "6", suit: "spades", real: false, color: 'red' },
      { num: "ace", suit: "diamonds", real: false, color: 'black' },
      { num: "3", suit: "hearts", real: false, color: 'black' },
      { num: "5", suit: "hearts", real: true, color: 'red' },
      { num: "6", suit: "clubs", real: false, color: 'red' },
      { num: "7", suit: "spades", real: true, color: 'black' },
      { num: "ace", suit: "hearts", real: true, color: 'red' }
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

  recordResponse(cardIndex, response) {
    this.responses = this.responses || [];
    this.responses[cardIndex] = this.responses[cardIndex] || [];
    this.responses[cardIndex].push(response);
  }

  getResults() {
    this.results = this.responses.map((responses) => {
      let interval = Math.max.apply(Math, responses.map((response) => response.interval));
      let lastResponse = responses[responses.length - 1];
      let card = responses[0].card;
      return {
        correct: lastResponse.response.num == card.num && lastResponse.response.suit == card.suit,
        card: card,
        interval: interval
      };
    });
    return this.results;
  }
}
