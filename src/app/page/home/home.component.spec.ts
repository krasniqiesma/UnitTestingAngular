import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ActivatedRoute} from "@angular/router";
import { MockUserList } from '../../mock/user';
import { API_URL } from '../../util/constant';
import { User } from '../../interface/user';
import { UserService } from '../../service/user.service';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let element: HTMLElement;
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: {
                get(): number {
                  return 6;
                }
              }
            }
          }
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);

    element = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //SEARCH
  it('should check if the search is rendered', () => {
    //arrange
    const searchElement = element.querySelector('input[type=search]');
    //assert
    expect(searchElement).toBeTruthy();
  });


  //TABLE
  it('should return list of users', () => {
    //act
    service.getUsers().subscribe((users: User[]) => {

      //assert
      expect(users).toEqual(MockUserList);
      expect(users.length).toEqual(2);
      expect(users[0].name.length).toBeGreaterThan(1);

      //arrange
      const req = httpTestingController.expectOne(`${API_URL}users`);

      //assert
      expect(req.request.method).toBe('GET');

      //Complete
      req.flush(MockUserList);
    });
  });

  it('should check if the table is rendered', () =>{
    //arrange
    const tableElement = element.querySelector('table');
    
    //assert
    expect(tableElement).toBeTruthy();
  });

  it('should filter users and find one record based on search input', () => {
    //arrange
    component.originalUserList = MockUserList;
    component.userList = MockUserList;
    fixture.detectChanges();

    const searchTerms: { [key: string]: string } = {
        name: MockUserList[0].name,
        email: MockUserList[0].email,
        company: MockUserList[0].company.name,
        address: MockUserList[0].address.street
    };

    //act
    for (const attribute in searchTerms) {
        if (searchTerms.hasOwnProperty(attribute)) {
            const searchTerm = searchTerms[attribute];
            const searchInput = fixture.debugElement.query(By.css('input[type=search]')).nativeElement;
            searchInput.value = searchTerm;
            searchInput.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            const userRows = fixture.debugElement.queryAll(By.css('tbody tr'));

            //assert
            expect(userRows.length).toBe(1);

            //assert
            expect(userRows[0].nativeElement.textContent.toLowerCase()).toContain(searchTerm.toLowerCase());
        }
    }
  });
});