import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunmoduleComponent } from './runmodule.component';

describe('RunmoduleComponent', () => {
  let component: RunmoduleComponent;
  let fixture: ComponentFixture<RunmoduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunmoduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunmoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
