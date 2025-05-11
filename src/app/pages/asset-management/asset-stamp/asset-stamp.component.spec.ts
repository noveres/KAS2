import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetStampComponent } from './asset-stamp.component';

describe('AssetStampComponent', () => {
  let component: AssetStampComponent;
  let fixture: ComponentFixture<AssetStampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetStampComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetStampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
