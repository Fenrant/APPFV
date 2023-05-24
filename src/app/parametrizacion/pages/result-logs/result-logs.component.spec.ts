import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultLogsComponent } from './result-logs.component';

describe('ResultLogsComponent', () => {
  let component: ResultLogsComponent;
  let fixture: ComponentFixture<ResultLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultLogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
