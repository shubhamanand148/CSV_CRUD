import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('AppComponent', () => {
  let httpTestingController = HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, HttpClientTestingModule],
    declarations: [AppComponent]
  }));

  it('should create the angular app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    expect()
  });
});

describe('Get Users', () => {
  it("Fetch a list of all users which is saved in users.csv file.", () =>{
        
  });
});
