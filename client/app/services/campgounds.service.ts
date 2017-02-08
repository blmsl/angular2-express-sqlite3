/**
 * Created by Laurence Ho on 07-02-2017.
 */
/// <reference path="../../typings/index.d.ts" />

import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Campground } from "../models/campground";
import { Comment } from "../models/comment";

export class CampDetail {
    campground: Campground;
    comments: Comment[];
}

@Injectable()
export class CampgroundService {

    private campgroundsUrl = 'api/campground';  // URL to web api

    constructor(private http: Http) { }

    getCamps(): Promise<Campground[]> {
        return this.http.get(this.campgroundsUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getCamp(id: number): Promise<CampDetail> {
        return this.http.get(this.campgroundsUrl + '/' + id)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}