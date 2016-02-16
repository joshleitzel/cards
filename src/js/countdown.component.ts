import {Component, OnInit, Output, EventEmitter} from "angular2/core";

@Component({
  selector: "countdown",
  template: `
    <div class="blurb">
      <p>Showing card in <span class="remaining-seconds">{{remainingSeconds}}</span></p>
    </div>
  `
})

export class CountdownComponent implements OnInit {
  public remainingSeconds: number;
  @Output() finished = new EventEmitter();
  private interval: any;

  ngOnInit() {
    this.remainingSeconds = 3;
    this.interval = setInterval(() => { this.update(); }, 1000);
  }

  update() {
    if (this.remainingSeconds > 1) {
      this.remainingSeconds -= 1;
    } else {
      clearInterval(this.interval);
      this.finished.emit(true);
    }
  }
}
