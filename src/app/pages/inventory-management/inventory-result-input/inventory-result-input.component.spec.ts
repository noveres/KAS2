import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryResultInputComponent } from './inventory-result-input.component';

describe('InventoryResultInputComponent', () => {
  let component: InventoryResultInputComponent;
  let fixture: ComponentFixture<InventoryResultInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryResultInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryResultInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
