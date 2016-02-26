import {Component, OnInit} from "angular2/core";
import {ExperimentService} from "./experiment.service";
import {Card} from "./card";
import {CountdownComponent} from "./countdown.component";

@Component({
  template: `
    <div *ngIf="card" id="tachistoscope">
      <div id="progress">Card <span class="cur">{{cardIndex + 1}}</span>/<span class="total">{{cards.length}}</span></div>
      <countdown *ngIf="displayCountdown" (finished)="onCountdownFinished()"></countdown>
      <div *ngIf="displayCard" id="card">
        <img src="assets/images/{{card.num}}_{{card.suit}}.svg" />
      </div>
      <div *ngIf="displayResponse" id="response">
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
      <div *ngIf="message === 'incorrect'" class="blurb">
        <p *ngIf="response === 'unknown'">OK, increasing exposure time.</p>
        <p *ngIf="response !== 'unknown'">Sorry, that's not the correct card. We'll increase the exposure time.</p>
        <div class="action"><button (click)="showNextInterval()">Try again</button></div>
      </div>
      <div *ngIf="message == 'correct'" class="blurb">
        <p>That's correct!</p>
        <div class="action"><button (click)="showNextCard()">Show next card</button></div>
      </div>
      <div *ngIf="message === 'nextCard'" class="blurb">
        <p>OK, let's move on to the next card.</p>
        <div class="action"><button (click)="showNextCard()">Show next card</button></div>
      </div>
      <div *ngIf="message === 'done'" class="blurb">
        <p>You're done!</p>
      </div>
      <div *ngIf="completed" class="blurb">
        <p>You're done!</p>
      </div>
    </div>
  `,
  providers: [ExperimentService],
  directives: [CountdownComponent]
})

export class CardsComponent implements OnInit {
  public card: Card;
  public cards: Card[];
  public displaying: boolean;
  public cardIndex: number;
  public completed: boolean;
  public displayCountdown: boolean;
  public displayCard: boolean;
  public displayResponse: boolean;
  public response: any;
  public message: any;
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
    this.message = null;
    if (interval) {
      this.displayCountdown = true;
      this.intervalIndex = index;
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

  showIncorrect() {
    if (this.cardIndex === this.cards.length - 1) {
      this.message = "done";
    } else if (this.intervalIndex === this.intervals.length - 1) {
      this.message = "nextCard";
    } else {
      this.message = "incorrect";
    }
  }

  showCorrect() {
    this.message = "correct";
  }

  answer(response) {
    this.displayResponse = false;
    this.response = response;
    if (response === 'none') {
      this.response = 'unknown';
    }
    if (response === "unknown") {
      this.showIncorrect();
    } else {
      if (response.suit === this.card.suit && response.num === this.card.num) {
        this.showCorrect();
      } else {
        this.showIncorrect();
      }
    }
    this._experimentService.recordResponse({
      cardNum: this.cardIndex,
      card: this.card,
      response: response,
      interval: this.intervals[this.intervalIndex],
    });
  }

  onCountdownFinished() {
    this.displayCountdown = false;
    this.displayCard = true;
    setTimeout(() => {
      this.displayCard = false;
      this.displayResponse = true;
    }, this.intervals[this.intervalIndex]);
  }
}
