import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyaddComponent } from './keyadd.component';

describe('KeyaddComponent', () => {
  let component: KeyaddComponent;
  let fixture: ComponentFixture<KeyaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
