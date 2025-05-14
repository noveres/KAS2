import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextButtonMenuComponent } from './text-button-menu.component';

describe('TextButtonMenuComponent', () => {
  let component: TextButtonMenuComponent;
  let fixture: ComponentFixture<TextButtonMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextButtonMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextButtonMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
