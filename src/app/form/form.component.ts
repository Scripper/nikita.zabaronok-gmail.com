import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import { Subscription} from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  myForm: FormGroup;
  isDeleteButtonDisabled: boolean;
  formSubscribe: Subscription;
  @Output () formValues = new EventEmitter();
  @Input () trigger;
  constructor(private fb: FormBuilder) {
    this.isDeleteButtonDisabled = true;
  }
  ngOnInit(): void {
    this.myForm = this.fb.group({
      users: this.fb.array([])
    });
    this.formSubscribe = this.myForm.valueChanges.subscribe((values) => {
      this.formValues.emit(values.users);
      if (values.users.length <= 1) {
        this.isDeleteButtonDisabled = true;
        return;
      }
      this.isDeleteButtonDisabled = false;
    });
    this.addFormGroup();
  }
  ngOnDestroy(): void {
    this.formSubscribe.unsubscribe();
  }
  get formGroup() {
    return this.myForm.get('users') as FormArray;
  }
  addFormGroup() {
    const user = this.fb.group({
      firstName: '',
      lastName: '',
      age: null,
      number: null,
    });
    this.formGroup.push(user);
  }
  deleteFormGroup(index) {
    this.formGroup.removeAt(index);
  }
}
