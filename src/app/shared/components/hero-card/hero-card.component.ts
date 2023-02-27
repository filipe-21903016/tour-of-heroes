import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { pipe, take } from 'rxjs';
import { IHero } from 'src/app/models/IHero';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroCardComponent {
  @Input() hero!: IHero;
  @Output() onDelete = new EventEmitter();
  @Output() onDetails = new EventEmitter();

  constructor(private heroService: HeroService, private router: Router) {}

  delete() {
    this.heroService
      .deleteHero(this.hero.id)
      .pipe(take(1))
      .subscribe((_) => this.onDelete.emit());
  }

  view() {
    this.router.navigate([`/heroes/${this.hero.id}`], {
      queryParams: { mode: 'VIEW' },
    });
    this.onDetails.emit();
  }
}
