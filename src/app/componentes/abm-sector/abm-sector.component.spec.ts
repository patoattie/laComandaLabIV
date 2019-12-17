import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmSectorComponent } from './abm-sector.component';

describe('AbmSectorComponent', () => {
  let component: AbmSectorComponent;
  let fixture: ComponentFixture<AbmSectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmSectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
