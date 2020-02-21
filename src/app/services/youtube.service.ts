import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  user: any;
  apiUrl;
  accessToken: string;
  constructor(private http: HttpClient) {
    this.accessToken = localStorage.getItem('accessToken');
    this.apiUrl = environment.youtubeApiUrl;
  }
  getPlaylists(): Observable<Object> {
    //console.log(accessToken)
    let url = this.apiUrl + 'playlists?&part=snippet&mine=true&maxResults=50&access_token=' + this.accessToken;
    return this.http.get(url).pipe(map((res) => {
      return res;
    }));
  }
  addPlaylist(title) {
    let url = this.apiUrl + 'playlists?part=snippet&access_token=' + this.accessToken;
    return this.http.post(url, {
      "snippet": {
        "title": title,
      }
    }
    )
  }
  updatePlaylist(id, title) {
    let url = this.apiUrl + 'playlists?part=snippet&access_token=' + this.accessToken;
    return this.http.put(url, {
      "id": id,
      "snippet": {
        "title": title,
      }
    }
    )
  }
  searchVideos(keyword) {
    let url = this.apiUrl + 'search?part=snippet&t&maxResults=10&type=video&q=' + keyword + '&access_token=' + this.accessToken;
    return this.http.get(url).pipe(map((res) => {
      return res;
    }));
  }
  deletePlaylist(id): Observable<Object> {
    //console.log(accessToken)
    let url = this.apiUrl + 'playlists?&id=' + id + '&access_token=' + this.accessToken;
    return this.http.delete(url);
  }
}
