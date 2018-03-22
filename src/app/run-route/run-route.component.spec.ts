import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunRouteComponent } from './run-route.component';

describe('RunRouteComponent', () => {
  let component: RunRouteComponent;
  let fixture: ComponentFixture<RunRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
