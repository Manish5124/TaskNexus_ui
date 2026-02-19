import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintListsComponent } from './sprint-lists.component';

describe('SprintListsComponent', () => {
  let component: SprintListsComponent;
  let fixture: ComponentFixture<SprintListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SprintListsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprintListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
