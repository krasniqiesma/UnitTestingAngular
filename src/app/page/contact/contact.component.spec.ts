import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactComponent } from './contact.component';
import { By } from '@angular/platform-browser';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    element = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if name, email, phone and comment inputs were rendered', () => {
    //arrange
    const inputElements = element.querySelectorAll('input[type=text], input[type=email], input[type=tel], textarea');
    //assert
    expect(inputElements.length).toBe(4);
    inputElements.forEach(inputElement => {
      expect(inputElement).toBeTruthy();
    });
  });

  describe('submitForm()', () => {
    it('should disable the submit button when the form is invalid', () => {
      //arrange
      component.contactForm.controls['name'].setValue('');
      component.contactForm.controls['email'].setValue('');
      component.contactForm.controls['phone'].setValue('');
      component.contactForm.controls['comment'].setValue('');
  
      // act
      fixture.detectChanges();
  
      //assert
      expect(component.contactForm.valid).toBeFalsy();
  
      const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');

      expect(submitButton).toBeTruthy();

      expect(submitButton.disabled).toBeTruthy();
    });
  });
});