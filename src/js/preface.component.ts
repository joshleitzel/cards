import {Component} from "angular2/core";
import {RouterLink} from "angular2/router";

@Component({
  template: `
    <div id="preface">
      <p>This is a short exercise designed to test your ability to perceive information that contradicts your preconceptions. It only takes a couple minutes to complete.</p>
      <p>You'll be shown a playing card for a brief amount of time. After each exposure, you'll be asked to identify the card you just saw. If you answer correctly, you'll move onto the next card. If you answer incorrectly, the exposure time will increase and you'll be asked again until you answer correctly or the exposure time reaches a full second (1000ms).</p>
      <p>At the end you'll see your results and more information about the technique used.</p>
      <div class="action"><a [routerLink]="['Intro']">Start</a></div>
    </div>
  `,
  directives: [RouterLink]
})

export class PrefaceComponent {
}
