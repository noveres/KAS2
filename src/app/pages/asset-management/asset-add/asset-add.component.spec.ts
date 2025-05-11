import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetAddComponent } from './asset-add.component';

describe('AssetAddComponent', () => {
  let component: AssetAddComponent;
  let fixture: ComponentFixture<AssetAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
