import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICountry } from 'src/app/models/ICountry';
import { IHero } from 'src/app/models/IHero';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroFormComponent {
  constructor(
    private datePipe: DatePipe,
    private documentService: DocumentService,
    private snackBar: MatSnackBar // private cdr: ChangeDetectorRef
  ) {}
  @Input() submitButtonText = 'Create Hero';
  @Input() backButtonText = 'Back';
  @Input() disabledButtonText = 'Edit';
  @Input() countries!: ICountry[] | null;
  @Input() mode!: 'CREATE' | 'VIEW' | 'EDIT';
  @Input() hero!: IHero | null;

  @Output() onSubmit = new EventEmitter<IHero>();
  @Output() onBack = new EventEmitter();

  loadedFile?: File;

  selectedCountry?: ICountry;
  heroForm = new FormGroup({
    id: new FormControl(undefined),
    name: new FormControl('', Validators.required),
    date: new FormControl(null, Validators.required),
    countryId: new FormControl(null, Validators.required),
    country: new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null),
    }),
    peopleSaved: new FormControl(null),
    documentId: new FormControl(null, Validators.required),
    document: new FormControl(null),
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['mode']) {
      if (this.mode === 'VIEW') this.disableForm();
      else this.enableForm();
    }

    if (changes['hero']) {
      this.heroForm.patchValue({
        ...this.hero,
        date: this.datePipe.transform(this.hero?.date, 'yyyy-MM-dd'),
      });
    }
  }

  onFileChanged(event: any) {
    if (event.target.files.length <= 0) {
      return;
    }

    this.loadedFile = event.target.files[0];

    this.documentService
      .uploadDocument(this.loadedFile)
      .subscribe((id) => this.heroForm.get('documentId').setValue(id));
  }

  submit() {
    if (this.heroForm.disabled) {
      this.onSubmit.emit(this.hero);
    } else {
      const countryId = this.heroForm.get('countryId').value;
      const country = this.countries.find((c) => c.id === countryId);
      this.heroForm.get('country').patchValue(country);
      this.heroForm.markAllAsTouched();
      this.heroForm.updateValueAndValidity();
      if (this.heroForm.get('documentId').invalid) {
        this.snackBar.open('Please upload an image', 'Hide', {
          duration: 5 * 1000,
        });
      }
      if (this.heroForm.valid) {
        this.onSubmit.emit(this.heroForm.value as IHero);
      }
    }
  }

  back() {
    this.onBack.emit();
  }

  private disableForm() {
    if (this.heroForm.enabled) this.heroForm.disable();
  }

  private enableForm() {
    if (this.heroForm.disabled) this.heroForm.enable();
  }

  protected trackById(index: number, element: IHero | ICountry) {
    return element.id;
  }
}
