import {Component} from "angular2/core";
import {RouterLink} from "angular2/router";

@Component({
  template: `
    <div id="intro">
      <p>You will be shown a series of playing cards one at a time. The objective is to identify the number and suit of the card—for example, ace of spades or six of diamonds.</p>
      <p>The first exposure of each card will be for just 10 milliseconds (1/100th of a second). The exposure time will increase until you correctly identify the card or reach the 1000ms (1 second) exposure threshold. When you've correctly identified the card or reached the 1000ms threshold, the next card will be shown starting at the 10ms exposure, and the process restarts.</p>
      <p>You'll move through 9 cards total and then see how you did compared to the overall average.</p>
      <div class="action"><a [routerLink]="['Cards']">Show First Card</a></div>
    </div>
  `,
  directives: [RouterLink]
})

export class IntroComponent { }
