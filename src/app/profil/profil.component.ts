import {Component, OnInit} from '@angular/core';
import {Geek} from '../_models/geek';
import {GeekService} from '../_services/geek/geek.service';
import {PhotoService} from '../_services/photo/photo.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {LikeService} from '../_services/like/like.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {

  geeks: Observable<Geek[]>;
  geek: Geek = new Geek();

  constructor(
    private geekService: GeekService,
    private likeService: LikeService,
    private photoService: PhotoService,
    private router: Router) {
  }


  ngOnInit() {}

  profil() {
    const geek = JSON.parse(window.sessionStorage.getItem('geek'));
    return geek;
  }

  photo() {
    const geek = JSON.parse(window.sessionStorage.getItem('geek'));
    const geekId = geek.id;
   this.likeService.getById(geekId).subscribe(photo => console.log(photo.url));
    return this.likeService.getById(geekId);
  }
}
