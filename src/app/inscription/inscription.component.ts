import {Component, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Geek} from '../_models/geek';
import {HttpClient} from '@angular/common/http';
import {InscriptionService} from '../_services/inscription/inscription.service';
import {AuthService} from '../_services/auth/auth.service';
import {MustMatch} from '../_helpers/must-match.validator';
import * as firebase from 'firebase';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  inscriptionForm: FormGroup;
  errorMessage: string;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private inscriptionService: InscriptionService,
    private renderer: Renderer2,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.inscriptionForm = this.fb.group({
      pseudo: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      confirmPassword: ['', Validators.required],
      age: ['18', Validators.required],
      ville: ['', Validators.required],
      sexe: ['Geek', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: [''],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f() {
    return this.inscriptionForm.controls;
  }

  inscription() {
    this.submitted = true;
    if (this.inscriptionForm.invalid) {
      return;
    }

    let geek = new Geek();
    geek.pseudo = this.inscriptionForm.get('pseudo').value;
    geek.age = this.inscriptionForm.get('age').value;
    geek.ville = this.inscriptionForm.get('ville').value;
    geek.sexe = this.inscriptionForm.get('sexe').value;
    geek.email = this.inscriptionForm.get('email').value;
    geek.password = this.inscriptionForm.get('password').value;
    geek.description = this.inscriptionForm.get('description').value;
    geek.typeCompte = 'Basic';
    this.authService.createNewUser(geek.email, geek.password).then(
      () => {
        geek.token = firebase.auth().currentUser.uid;
        this.inscriptionService.saveGeek(geek).then(
          () => {
            alert('SUCCESS!! :-)\n\n');
            this.authService.signOutUser();
          },
          (error) => {
            this.errorMessage = error;
          }
        );
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  resetUserForm() {
    this.submitted = false;
    this.inscriptionForm.reset();
  }

}
