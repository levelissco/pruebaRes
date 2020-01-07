import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewListaComponent } from './view-lista.component';

describe('ViewListaComponent', () => {
  let component: ViewListaComponent;
  let fixture: ComponentFixture<ViewListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
