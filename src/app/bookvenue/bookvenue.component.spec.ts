import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookvenueComponent } from './bookvenue.component';

describe('BookvenueComponent', () => {
  let component: BookvenueComponent;
  let fixture: ComponentFixture<BookvenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookvenueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookvenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
