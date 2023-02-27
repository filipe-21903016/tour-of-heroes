import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { IHero } from '../../models/IHero';

@Pipe({
  name: 'heroImageSource',
})
export class HeroImageSourcePipe implements PipeTransform {
  transform(hero: IHero | null, file?: File): Observable<string> {
    const defaultUrl = 'assets/images/upload-image.png';
    const reader = new FileReader();
    const parsedImage$ = new Subject<string>();

    reader.onload = () => {
      parsedImage$.next(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
      return parsedImage$;
    } else {
      return hero != null && hero.documentId
        ? of(`/api/documents/${hero.documentId}`)
        : of(defaultUrl);
    }
  }
}
