import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetGruposComponent } from './get-grupos.component';

describe('GetGruposComponent', () => {
  let component: GetGruposComponent;
  let fixture: ComponentFixture<GetGruposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetGruposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
