import { AppComponent } from './app.component';
import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { UserModel } from 'src/Models/UserModel';

const API_URL = "http://localhost:3002/users";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let axiosMock: MockAdapter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [FormsModule],
    }).compileComponents();
    axiosMock = new MockAdapter(axios);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    axiosMock.restore(); // Clean up the Axios mock adapter
  });

  // Testing request to fetch all the users.
  it('should fetch all the users', waitForAsync(async () => {
    // Mocked response data
    const responseData: UserModel[] = [
      { firstName: "FN1", lastName: "LN1", emailID: "EID1", age: 1, country: "C1" },
    ];

    axiosMock.onGet(API_URL).reply(200, responseData);
    component.getUsers();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(Array.isArray(component.allUsers)).toBe(true);
    expect(component.allUsers).toEqual(responseData);
  }));

  // Testing request to post/save the data
  it('should post all the users', waitForAsync(async () => {

    // Mocked response data
    const responseData: UserModel[] = [
      { firstName: "FN1", lastName: "LN1", emailID: "EID1", age: 1, country: "C1" },
      { firstName: "FN2", lastName: "LN2", emailID: "EID2", age: 2, country: "C2" },
    ];

    axiosMock.onPost(API_URL).reply(200, responseData);
    component.saveUsers();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(Array.isArray(component.allUsers)).toBe(true);
    expect(component.allUsers).toEqual(responseData);
  }));

  // Testing request to delete a user
  it('should delete all the users', waitForAsync(async () => {

    // Mocked response data
    const responseData: UserModel[] = [
      { firstName: "FN1", lastName: "LN1", emailID: "EID1", age: 1, country: "C1" },
    ];
    const index = 1;

    axiosMock.onDelete(API_URL).reply(200, responseData);
    component.deleteUser(index);
    await fixture.whenStable();
    fixture.detectChanges();
    expect(Array.isArray(component.allUsers)).toBe(true);
    expect(component.allUsers).toEqual(responseData);
    console.log(component.allUsers)
  }));
});