import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CardAnuncioComponent } from './card-anuncio/card-anuncio.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PublicarComponent } from './publicar/publicar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DetallesComponent } from './detalles/detalles.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
// Gestures
import { HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';

/** Import Alyle UI */
import {
  LyTheme2,
  StyleRenderer,
  LY_THEME,
  LY_THEME_NAME,
  LyHammerGestureConfig,
} from '@alyle/ui';

/** Import the component modules */
import { LyButtonModule } from '@alyle/ui/button';
import { LyToolbarModule } from '@alyle/ui/toolbar';
import { LyImageCropperModule } from '@alyle/ui/image-cropper';
import { MinimaLight, MinimaDark } from '@alyle/ui/themes/minima';
import { TamanoPipe } from './tamano.pipe';
import { FiltrosComponent } from './filtros/filtros.component';
import { ColorPipe } from './color.pipe';
import { RazaPipe } from './raza.pipe';
import { CollarPipe } from './collar.pipe';
import { PerfilComponent } from './perfil/perfil.component';
import { CardAnuncioUsuarioComponent } from './card-anuncio-usuario/card-anuncio-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardAnuncioComponent,
    PublicarComponent,
    NavbarComponent,
    DetallesComponent,
    LoginComponent,
    RegistroComponent,
    TamanoPipe,
    FiltrosComponent,
    ColorPipe,
    RazaPipe,
    CollarPipe,
    PerfilComponent,
    CardAnuncioUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    LyButtonModule,
    LyToolbarModule,
    LyImageCropperModule,
    HammerModule,
  ],
  providers: [
    [LyTheme2],
    [StyleRenderer],
    // Theme that will be applied to this module
    { provide: LY_THEME_NAME, useValue: 'minima-light' },
    { provide: LY_THEME, useClass: MinimaLight, multi: true }, // name: `minima-light`
    { provide: LY_THEME, useClass: MinimaDark, multi: true }, // name: `minima-dark`
    // Gestures
    { provide: HAMMER_GESTURE_CONFIG, useClass: LyHammerGestureConfig }, // Required for <ly-carousel>],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
