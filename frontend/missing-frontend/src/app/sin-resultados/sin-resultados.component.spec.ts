import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinResultadosComponent } from './sin-resultados.component';

describe('SinResultadosComponent', () => {
  let component: SinResultadosComponent;
  let fixture: ComponentFixture<SinResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SinResultadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
