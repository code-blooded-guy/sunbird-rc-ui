import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfViewTwoComponent } from './pdf-view-two.component';

describe('PdfViewTwoComponent', () => {
  let component: PdfViewTwoComponent;
  let fixture: ComponentFixture<PdfViewTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfViewTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfViewTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
