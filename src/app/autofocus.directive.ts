import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[autofocus]'
})
export class AutofocusDirective implements OnInit {
  private focus = true;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    if (this.focus) {
      window.setTimeout(() => {
        this.el.nativeElement.focus();
      });
    }
  }

  @Input() set autofocus(condition: boolean) {
    this.focus = condition;
  }
}
