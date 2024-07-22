import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAnuncioUsuarioComponent } from './card-anuncio-usuario.component';

describe('CardAnuncioUsuarioComponent', () => {
  let component: CardAnuncioUsuarioComponent;
  let fixture: ComponentFixture<CardAnuncioUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardAnuncioUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardAnuncioUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
