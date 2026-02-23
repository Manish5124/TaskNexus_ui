import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboredPageComponent } from './dashbored-page.component';

describe('DashboredPageComponent', () => {
  let component: DashboredPageComponent;
  let fixture: ComponentFixture<DashboredPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DashboredPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboredPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
