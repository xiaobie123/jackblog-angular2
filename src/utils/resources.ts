import { Injectable, bind } from 'angular2/core'
import { Http, Response, Headers, RequestOptions, URLSearchParams } from 'angular2/http'
import {Subject, BehaviorSubject, Observable} from 'rxjs'
import { API_ROOT, CookieDomain } from '../config'
import { Cookie } from './cookies'
import * as querystring from 'querystring'

@Injectable()
export class ResourceService {
		headers:Headers = new Headers()
		opts:RequestOptions = new RequestOptions()
		constructor(public http: Http) {
			this.headers.append('Content-Type', 'application/json')
			this.opts.headers = this.headers
		}

		interceptor():RequestOptions{
			if (Cookie.getCookie('token') && !this.opts.headers.get('Authorization')) {
				this.opts.headers.append('Authorization',
					'Bearer ' + Cookie.getCookie('token').replace(/(^\")|(\"$)/g, ''))
			}
			return this.opts
		}
		//登录请求.
		localLogin(data: Object): Observable<any> {
			return this.http.post(API_ROOT + 'auth/local', JSON.stringify(data), this.interceptor())
		}
		getSnsLogins(): Observable<any> {
			return this.http.get(API_ROOT + 'users/snsLogins', this.interceptor())
		}
		getMe(): Observable<any> {
			return this.http.get(API_ROOT + 'users/me', this.interceptor())
		}
		mdUser(data: Object): Observable<any> {
			return this.http.put(API_ROOT + 'users/mdUser', JSON.stringify(data), this.interceptor())
		}

		getTagList(): Observable<any> {
			return this.http.get(API_ROOT + 'tags/getFrontTagList', this.interceptor())
		}
		getApps(): Observable<any> {
			return this.http.get(API_ROOT + 'mobile/getApps', this.interceptor())
		}
		//article
		getIndexImage(): Observable<any> {
			return this.http.get(API_ROOT + 'article/getIndexImage', this.interceptor())
		}
		getFrontArticleList(options:Object): Observable<any> {
			let params: RequestOptions = this.interceptor()
			params.search = new URLSearchParams(querystring.stringify(options))
			return this.http.get(API_ROOT + 'article/getFrontArticleList', params)
		}
		getFrontArticleCount(): Observable<any> {
			return this.http.get(API_ROOT + 'article/getFrontArticleCount', this.interceptor())
		}
		getFrontArticle(id: string): Observable<any> {
			return this.http.get(API_ROOT + 'article/' + id + '/getFrontArticle', this.interceptor())
		}
		toggleLike(id: string): Observable<any> {
			return this.http.put(API_ROOT + 'article/' + id + '/toggleLike', '', this.interceptor())
		}
		getPrenext(id:string, options:Object): Observable<any> {
			let params: RequestOptions = this.interceptor()
			params.search = new URLSearchParams(querystring.stringify(options))
			return this.http.get(API_ROOT + 'article/' + id + '/getPrenext', params)
		}
		//comment
		getFrontCommentList(id:string): Observable<any> {
			return this.http.get(API_ROOT + 'comment/' + id + '/getFrontCommentList', this.interceptor())
		}
		addNewComment(data: Object): Observable<any> {
			return this.http.post(API_ROOT + 'comment/addNewComment', JSON.stringify(data), this.interceptor())
		}
		addNewReply(id:string,data:Object):Observable<any> {
			return this.http.post(API_ROOT + 'comment/'+ id +'/addNewReply',
				JSON.stringify(data), this.interceptor())
		}
}

