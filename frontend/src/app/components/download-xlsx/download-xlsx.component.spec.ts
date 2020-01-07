import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadXlsxComponent } from './download-xlsx.component';

describe('DownloadXlsxComponent', () => {
  let component: DownloadXlsxComponent;
  let fixture: ComponentFixture<DownloadXlsxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadXlsxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadXlsxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
