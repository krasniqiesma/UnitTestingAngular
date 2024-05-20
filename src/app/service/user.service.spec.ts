import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { of } from 'rxjs';
import { MockUserList } from '../mock/user';
import { User } from '../interface/user';
import { API_URL } from '../util/constant';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('shoukd create user list and creating the user', () =>{
    it('should be called getUsers() method', () =>{

      //arrange
      const getUsersSpy = spyOn(service, 'getUsers').and.returnValue(of(MockUserList));
      //act
      service.getUsers().subscribe();
      //assert
      expect(getUsersSpy).toHaveBeenCalled();
    });

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
  });
  
  describe('createUser()', () =>{

    let expectedUserObject: User;

    beforeEach(() => {
      expectedUserObject = MockUserList[0];
    })

    it('should been called', () => {

      //arrange
      const createUserSpy = spyOn(service, 'createUser').and.returnValue(of(expectedUserObject));

      //act
      service.createUser(expectedUserObject)

      //assert
      expect(createUserSpy).toHaveBeenCalled();
    });

    it('should create user', () => {

      //act
      service.createUser(expectedUserObject).subscribe(
        user => {
          expect(user).toEqual(expectedUserObject)
        }
      )
      
      //assert
      const req = httpTestingController.expectOne(`${API_URL}users`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(expectedUserObject);
      expect(req.request.url).toEqual(`${API_URL}users`);

      //complete
      req.flush(expectedUserObject);
    })
  });
});
