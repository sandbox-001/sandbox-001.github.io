import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { map, Observable, of } from 'rxjs';

@Service()
export class VidsrcApiService {
    private http = inject(HttpClient);
    sanitizer = inject(DomSanitizer)

    // The vidsrc player will not run properly locally (test by changing the urls and deploying)
    // Base Url proxys for localhost testing (remember to rebuild and npm start after changing the proxies in proxy.conf.json)
    // private VIDSRC_DOMAINS_URL = '/api-vidsrc-domains'
    // private VIDSRC_API = '/api-vidsrc-vidsrcme.ru'
    // private VIDSRC_API = '/api-vidsrc-vidsrc.sh'

    // Base Urls for deployments
    private VIDSRC_DOMAINS_URL = 'https://vidsrc.domains'
    private VIDSRC_API = 'https://vidsrc.sh'



    private vidsrcDomainsUrl = this.VIDSRC_DOMAINS_URL
    private vidsrcBaseUrl = this.VIDSRC_API
    
    private vidsrcMovieUrl = this.vidsrcBaseUrl + '/embed/movie?tmdb='
    private vidsrcTVUrl = this.vidsrcBaseUrl + '/embed/tv?tmdb='

    getVidsrcMovie(movieId: number): Observable<SafeResourceUrl> {
        // disable correct return for iframe src
        // return of('')
        
        return of(this.sanitizer.bypassSecurityTrustResourceUrl(this.vidsrcMovieUrl + movieId))
        
    }

    getVidsrcTV(tvId: number, season: number, episode: number): Observable<SafeResourceUrl> {
        // disable correct return for iframe src
        // return of('')

        return of(this.sanitizer.bypassSecurityTrustResourceUrl(this.vidsrcTVUrl + `${tvId}&season=${season}&episode=${episode}`))
    }

}
