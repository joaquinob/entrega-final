import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationsSectionComponent } from './stations-section.component';

describe('StationsSectionComponent', () => {
  let component: StationsSectionComponent;
  let fixture: ComponentFixture<StationsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationsSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StationsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
