import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent {
  @Input() playlists;
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() view = new EventEmitter<any>();
  constructor() { }

  viewPlaylist(playlist) {
    this.view.emit(playlist);
  }
  editPlaylist(playlist) {
    this.edit.emit(playlist);
  }
  deletePlaylist(playlist) {
    this.delete.emit(playlist.id);
  }
}
