import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { YoutubeService } from 'src/app/services/youtube.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  playlists = [];
  playlist: any;
  show: boolean;
  playlistName: any;
  isEdit: boolean;
  isSearch: boolean;
  showView: boolean;
  searchKeyword: string;
  videos: any;
  ngOnInit(): void {
    this.search();
    this.show = false;
    this.isSearch = false;
    this.showView = false;
    this.youtubeService.getPlaylists()
      .subscribe(lista => {
        for (let element of lista["items"]) {
          this.playlists.push(element);
        }
      });
  }

  constructor(private auth: AuthService, private router: Router, private youtubeService: YoutubeService) { }

  viewPlaylist(playlist) {
    this.isSearch = false;
    this.playlist = playlist;
    this.showView = true;
  }
  editPlaylist(playlist) {
    this.isSearch = false;
    this.playlist = playlist;
    this.playlistName = playlist.snippet.title;
    this.show = true;
    this.isEdit = true;
  }
  deletePlaylist(id) {
    this.isSearch = false;
    this.youtubeService.deletePlaylist(id).subscribe(res => {
      console.log(res);
      const filteredItems = this.playlists.filter(function (item) {
        return item.id !== id
      });
      this.playlists = filteredItems;
    });
  }
  add() {
    this.isSearch = false;
    this.show = true;
    this.isEdit = false;
  }
  editOrAddAPlaylist(event) {
    event.preventDefault();
    if (this.isEdit && this.playlist && this.playlist.snippet.title !== this.playlistName) {
      this.youtubeService.updatePlaylist(this.playlist.id, this.playlistName).subscribe(res => {
        for (let i = 0; i < this.playlists.length; i++) {
          if (this.playlists[i].id === this.playlist.id) {
            this.playlists[i] = res;
          }
        }
        this.playlistName = null;
        this.playlist = null;
        this.show = false;
        this.isEdit = false;
      });
    }
    else if (!this.isEdit) {
      this.youtubeService.addPlaylist(this.playlistName).subscribe(res => {
        this.playlists.push(res)
        this.playlist = null;
        this.show = false;
        this.playlistName = null;
        this.isEdit = false;
      });
    }
  }
  close() {
    this.show = false;
    this.showView = false;
  }
  search() {
    if (this.searchKeyword)
      this.youtubeService.searchVideos(this.searchKeyword).subscribe(res => {
        console.log(res)
        this.videos = res;
        this.isSearch = true;
      });
  }
  logout() {
    this.auth.logout().then(res =>
      this.router.navigate(['login']));
  }
}
