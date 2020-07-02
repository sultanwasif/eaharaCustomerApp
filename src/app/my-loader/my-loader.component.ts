import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-my-loader',
  templateUrl: './my-loader.component.html',
  styleUrls: ['./my-loader.component.scss'],
})
export class MyLoaderComponent implements OnInit {

  loading: boolean;

  constructor(private loaderService: LoaderService,
              private SpinnerService: NgxSpinnerService) {
    this.loaderService.isLoading.subscribe((v) => {
      this.loading = v;
      this.SpinnerService.show();
    });

  }
  ngOnInit() {
  }

}
