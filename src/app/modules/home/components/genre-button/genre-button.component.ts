import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-genre-button',
  standalone: true,
  imports: [],
  templateUrl: './genre-button.component.html',
})
export class GenreButtonComponent {
  @Input() genre = '';
  @Input() isSelected = false;
  @Input() disabled = false;
  @Output() genreSelected = new EventEmitter<string>();

  get buttonClasses(): string {
    return `
        px-6 py-3 
        text-lg font-bold 
        rounded-lg 
        transition-all duration-300 ease-in-out 
        hover:scale-105
        ${
          this.isSelected
            ? 'bg-primary text-primary-foreground'
            : 'bg-background text-foreground'
        }
        ${this.disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `;
  }
}
