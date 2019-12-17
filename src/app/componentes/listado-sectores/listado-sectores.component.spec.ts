import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoSectoresComponent } from './listado-sectores.component';

describe('ListadoSectoresComponent', () => {
  let component: ListadoSectoresComponent;
  let fixture: ComponentFixture<ListadoSectoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoSectoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoSectoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
