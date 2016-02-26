import {Component} from "angular2/core";
import {RouterOutlet, RouteConfig} from "angular2/router";
import {PrefaceComponent} from "./preface.component";
import {IntroComponent} from "./intro.component";
import {CardsComponent} from "./cards.component";

@Component({
  selector: "app",
  template: `
    <div class="wrapper">
      <h1>Perception Tester</h1>
      <router-outlet></router-outlet>
      <footer>
        <a href="#" id="credits">Credits</a>
      </footer>
    </div>
  `,
  directives: [RouterOutlet]
})

@RouteConfig([
  { path: "/", name: "Home", component: PrefaceComponent },
  { path: "/intro", name: "Intro", component: IntroComponent },
  { path: "/cards", name: "Cards", component: CardsComponent }
])

export class AppComponent { }
