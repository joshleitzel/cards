import {Component, OnInit} from "angular2/core";
import {ExperimentService} from "./experiment.service";
import {Card} from "./card";

@Component({
  template: `
    <div *ngIf="card" id="tachistoscope">
      <div id="progress">Card <span class="cur">{{cardIndex + 1}}</span>/<span class="total">{{cards.length}}</span></div>
      <div *ngIf="displaying" id="card">
        <img src="assets/images/{{card.num}}_{{card.suit}}.svg" />
      </div>
      <div *ngIf="!displaying && !completed" id="response">
        <div class="prompt">Which card did you see?</div>
        <div class="option">
          <button (click)="answer('unknown')" data-value="unknown">I don\'t know</button>
        </div>
        <div class="option">
          <div class="num">
            <div class="card-group">
              <button (click)="answer({ num: 'ace', suit: 'spades' })" class="card-opt" data-num="ace" data-suit="spades">A</button>
              <button (click)="answer({ num: 'ace', suit: 'clubs' })" class="card-opt" data-num="ace" data-suit="clubs">A</button>
              <button (click)="answer({ num: 'ace', suit: 'hearts' })" class="card-opt" data-num="ace" data-suit="hearts">A</button>
              <button (click)="answer({ num: 'ace', suit: 'diamonds' })" class="card-opt" data-num="ace" data-suit="diamonds">A</button>
            </div>
            <div class="card-group">
              <button (click)="answer({ num: '2', suit: 'spades' })" class="card-opt" data-num="2" data-suit="spades">2</button>
              <button (click)="answer({ num: '2', suit: 'clubs' })" class="card-opt" data-num="2" data-suit="clubs">2</button>
              <button (click)="answer({ num: '2', suit: 'hearts' })" class="card-opt" data-num="2" data-suit="hearts">2</button>
              <button (click)="answer({ num: '2', suit: 'diamonds' })" class="card-opt" data-num="2" data-suit="diamonds">2</button>
            </div>
            <div class="card-group">
              <button (click)="answer({ num: '3', suit: 'spades' })" class="card-opt" data-num="3" data-suit="spades">3</button>
              <button (click)="answer({ num: '3', suit: 'clubs' })" class="card-opt" data-num="3" data-suit="clubs">3</button>
              <button (click)="answer({ num: '3', suit: 'hearts' })" class="card-opt" data-num="3" data-suit="hearts">3</button>
              <button (click)="answer({ num: '3', suit: 'diamonds' })" class="card-opt" data-num="3" data-suit="diamonds">3</button>
            </div>
            <div class="card-group">
              <button (click)="answer({ num: '4', suit: 'spades' })" class="card-opt" data-num="4" data-suit="spades">4</button>
              <button (click)="answer({ num: '4', suit: 'clubs' })" class="card-opt" data-num="4" data-suit="clubs">4</button>
              <button (click)="answer({ num: '4', suit: 'hearts' })" class="card-opt" data-num="4" data-suit="hearts">4</button>
              <button (click)="answer({ num: '4', suit: 'diamonds' })" class="card-opt" data-num="4" data-suit="diamonds">4</button>
            </div>
            <div class="card-group">
              <button (click)="answer({ num: '5', suit: 'spades' })" class="card-opt" data-num="5" data-suit="spades">5</button>
              <button (click)="answer({ num: '5', suit: 'clubs' })" class="card-opt" data-num="5" data-suit="clubs">5</button>
              <button (click)="answer({ num: '5', suit: 'hearts' })" class="card-opt" data-num="5" data-suit="hearts">5</button>
              <button (click)="answer({ num: '5', suit: 'diamonds' })" class="card-opt" data-num="5" data-suit="diamonds">5</button>
            </div>
            <div class="card-group">
              <button (click)="answer({ num: '6', suit: 'spades' })" class="card-opt" data-num="6" data-suit="spades">6</button>
              <button (click)="answer({ num: '6', suit: 'clubs' })" class="card-opt" data-num="6" data-suit="clubs">6</button>
              <button (click)="answer({ num: '6', suit: 'hearts' })" class="card-opt" data-num="6" data-suit="hearts">6</button>
              <button (click)="answer({ num: '6', suit: 'diamonds' })" class="card-opt" data-num="6" data-suit="diamonds">6</button>
            </div>
            <div class="card-group">
              <button (click)="answer({ num: '7', suit: 'spades' })" class="card-opt" data-num="7" data-suit="spades">7</button>
              <button (click)="answer({ num: '7', suit: 'clubs' })" class="card-opt" data-num="7" data-suit="clubs">7</button>
              <button (click)="answer({ num: '7', suit: 'hearts' })" class="card-opt" data-num="7" data-suit="hearts">7</button>
              <button (click)="answer({ num: '7', suit: 'diamonds' })" class="card-opt" data-num="7" data-suit="diamonds">7</button>
            </div>
          </div>
          <button (click)="answer('none')" data-value="none">None of the above</button>
        </div>
      </div>
      <div *ngIf="completed">
        <p>You're done!</p>
      </div>
    </div>
  `,
  providers: [ExperimentService]
})

export class CardsComponent implements OnInit {
  public card: Card;
  public cards: Card[];
  public displaying: boolean;
  public cardIndex: number;
  public completed: boolean;
  private intervals: number[];
  private intervalIndex: number;

  constructor(private _experimentService: ExperimentService) { }

  ngOnInit() {
    this.cards = this._experimentService.getCards();
    this.intervals = this._experimentService.getIntervals();
    this.showCard(0);
  }

  showInterval(index) {
    let interval = this.intervals[index];
    if (interval) {
      this.displaying = true;
      this.intervalIndex = index;
      setTimeout(() => this.displaying = false, interval);
    } else {
      this.showNextCard();
    }
  }

  showNextInterval() {
    this.showInterval(this.intervalIndex + 1);
  }

  showCard(index) {
    let card = this.cards[index];
    if (card) {
      this.cardIndex = index;
      this.card = card;

      this.showInterval(0);
    } else {
      this.completed = true;
    }
  }

  showNextCard() {
    this.showCard(this.cardIndex + 1);
  }

  answer(response) {
    if (response === "unknown") {
      this.showNextInterval();
    } else {
      if (response.suit === this.card.suit && response.num === this.card.num) {
        this.showNextCard();
      } else {
        this.showNextInterval();
      }
    }
  }
}
