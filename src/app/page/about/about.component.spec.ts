import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';
import { By } from '@angular/platform-browser';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    element = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //ABOUT US

    it('should have a heading with text "About Us"', () => {
      const headingElement = fixture.debugElement.query(By.css('h1'));
      expect(headingElement).toBeTruthy();
      const headingText = headingElement.nativeElement.textContent;
      expect(headingText).toEqual('About Us');
    });
    

  it('should exists the paragraph', () => {
    //arrange
    const paragraphExist = element.querySelector('p[id="paragraph"]');
    //assert
    expect(paragraphExist).toBeTruthy();
  });
});
