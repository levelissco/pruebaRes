import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGrupoComponent } from './create-grupo.component';

describe('CreateGrupoComponent', () => {
  let component: CreateGrupoComponent;
  let fixture: ComponentFixture<CreateGrupoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGrupoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
