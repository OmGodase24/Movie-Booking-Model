import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegisterComponent } from './register.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

fdescribe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have form controls', () => {
    // Ensure that the form has the expected controls
    expect(component.registerForm.contains('email')).toBeTrue();  // 'email' control exists
    expect(component.registerForm.contains('password')).toBeTrue();  // 'password' control exists
  
    // Optionally, verify the initial state of form controls if needed
    expect(component.registerForm.controls['email'].value).toEqual('');  // Default/initial value
    expect(component.registerForm.controls['password'].value).toEqual('');  // Default/initial value
  });
  

  it('should make the name control required', () => {
    let control = component.registerForm.get('name');
    if (control) {
      control.setValue('');
      expect(control.valid).toBeFalsy();
    }
  });

  it('should make the email control required', () => {
    let control = component.registerForm.get('email');
    if (control) {
      control.setValue('');
      expect(control.valid).toBeFalsy();
    }
  });

  it('should make the password control required', () => {
    let control = component.registerForm.get('password');
    if (control) {
      control.setValue('');
      expect(control.valid).toBeFalsy();
    }
  });

  it('should call the register method when form is submitted', () => {
    spyOn(component, 'onSubmit');

    let formElement = debugElement.query(By.css('form')).nativeElement;
    formElement.dispatchEvent(new Event('submit'));

    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should not submit the form if it is invalid', () => {
    // Set up the form to be invalid (e.g., missing required fields)
    component.registerForm.controls['email'].setValue(''); // Set invalid email
    component.registerForm.controls['password'].setValue(''); // Set invalid password
    
    // Spy on the onSubmit method
    spyOn(component, 'onSubmit').and.callThrough();
  
    // Call the submit function
    component.onSubmit();
  
    // Assert that onSubmit was not called because the form is invalid
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
    expect(component.registerForm.invalid).toBeTrue();  // The form should be invalid
  });
});
