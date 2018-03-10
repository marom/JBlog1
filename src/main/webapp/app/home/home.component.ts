import { Component, OnInit } from '@angular/core';
import {Post} from "../entities/post/post.model";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {PostService} from "../entities/post";
import {JhiAlertService} from "ng-jhipster";

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.css'
    ]

})
export class HomeComponent implements OnInit {

    posts: Post[] = [];

    constructor(private postService: PostService,
                private jhiAlertService: JhiAlertService) {

    }

    ngOnInit(){
        this.loadAll();
    }

    loadAll() {
        this.postService.query().subscribe(
            (res: HttpResponse<Post[]>) => {
                this.posts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
