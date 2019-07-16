import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SA_CHROME_VERSION } from '@sa-core/constants/browser.constant';

import { AppRoutingModule } from './app-routing.module';
import { SaAppComponent } from './components/app/app.component';
import { SaErrorPageComponent } from './components/error-page/error-page.component';

const AnimationModule = (SA_CHROME_VERSION && SA_CHROME_VERSION <= 42) ? NoopAnimationsModule : BrowserAnimationsModule;

@NgModule({
  imports: [
    BrowserModule,
    AnimationModule,
    AppRoutingModule,
  ],
  declarations: [
    SaAppComponent,
    SaErrorPageComponent,
  ],
  bootstrap: [
    SaAppComponent,
  ],
})
export class SaAppModule {}
