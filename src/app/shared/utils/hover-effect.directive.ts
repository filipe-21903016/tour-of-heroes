import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHoverEffect]',
})
export class HoverEffectDirective {
  constructor(private containerEl: ElementRef, private renderer: Renderer2) {}
  @Input('appHoverEffect') hoverText = '';
  middleEl: any;
  textEl: any;
  imageEl: any;

  ngOnInit() {
    this.imageEl = this.containerEl.nativeElement.children[0];

    //strucure
    this.middleEl = this.renderer.createElement('div');
    this.textEl = this.renderer.createElement('div');
    this.renderer.appendChild(
      this.textEl,
      this.renderer.createText(this.hoverText)
    );
    this.renderer.appendChild(this.middleEl, this.textEl);

    //Text Styling
    this.renderer.setStyle(this.textEl, 'font-weight', 'bold');

    //Image Styling
    this.renderer.setStyle(this.imageEl, 'opacity', '1');
    this.renderer.setStyle(this.imageEl, 'display', 'block');
    this.renderer.setStyle(this.imageEl, 'width', '100%');
    this.renderer.setStyle(this.imageEl, 'height', 'auto');
    this.renderer.setStyle(this.imageEl, 'transition', '.5s ease');
    this.renderer.setStyle(this.imageEl, 'backface-visibility', 'hidden');
    this.renderer.setStyle(this.imageEl, 'border', '5px solid #daa520');

    //Container styling
    this.renderer.setStyle(
      this.containerEl.nativeElement,
      'position',
      'relative'
    );
    this.renderer.setStyle(
      this.containerEl.nativeElement,
      'max-width',
      '150px'
    );
    this.renderer.setStyle(this.containerEl.nativeElement, 'cursor', 'pointer');

    //Middle styling
    this.renderer.setStyle(this.middleEl, 'transition', '.5s ease');
    this.renderer.setStyle(this.middleEl, 'opacity', '0');
    this.renderer.setStyle(this.middleEl, 'position', 'absolute');
    this.renderer.setStyle(this.middleEl, 'top', '50%');
    this.renderer.setStyle(this.middleEl, 'left', '50%');
    this.renderer.setStyle(this.middleEl, 'transform', 'translate(-50%, -50%)');
    this.renderer.setStyle(
      this.middleEl,
      '-ms-transform',
      'translate(-50%, -50%)'
    );
    this.renderer.setStyle(this.middleEl, 'text-align', 'center');

    //add children to DOM
    this.renderer.appendChild(this.containerEl.nativeElement, this.middleEl);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.imageEl, 'opacity', '0.2');
    this.renderer.setStyle(this.middleEl, 'opacity', '1');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.imageEl, 'opacity', '1');
    this.renderer.setStyle(this.middleEl, 'opacity', '0');
  }
}
