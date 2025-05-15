import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryExceptionListComponent } from './inventory-exception-list.component';

describe('InventoryExceptionListComponent', () => {
  let component: InventoryExceptionListComponent;
  let fixture: ComponentFixture<InventoryExceptionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryExceptionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryExceptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
