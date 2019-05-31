import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {BaseChartDirective, Color, Label} from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import {TripService} from '../../../_services/trip.service';
import {StatisticsService} from '../../../_services/statistics.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {


    public barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true
    };

    public barChartOptions3 = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    reverse: false,
                    stepSize: 1,
                    beginAtZero: true
                },
            }]
        }

    };
    public barChartType = 'bar';
    public barChartLegend = true;

    // public barChartData = [{data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    public barChartData1 = [{data: [], label: 'Trip days'}];
    public barChartLabels1: any[];

    public barChartData2 = [{data: [], label: 'Trip price'}];
    public barChartLabels2: any[];

    public barChartData3 = [{data: [], label: 'Trips'}];
    public barChartLabels3: any[];

    public barChartData4 = [{data: [], label: 'Trip days'}];
    public barChartLabels4 = ['Trip count'];

    public dateFromForm: FormGroup;


    constructor(private statisticsService: StatisticsService,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.dateFromForm = this.fb.group({
            dateFrom: ['', Validators.required],
            dateTo: ['', Validators.required],
        });

        this.dateFromForm.valueChanges
            .subscribe(data => {
                if (!this.dateFromForm.value.dateFrom || !this.dateFromForm.value.dateTo) {
                    console.log('invalid dates');
                    return;
                }
                this.statisticsService
                    .getTripCountByPeriod(this.dateFromForm.value.dateFrom, this.dateFromForm.value.dateTo)
                    .subscribe(data => this.barChartData4[0].data = [data]);
            });

        this.statisticsService.getTripsByDuration()
            .subscribe((data: any[]) => {
                this.barChartLabels1 = data.map(item => `Trip name: ${item.name}`);
                this.barChartData1[0].data = data.map(item => item.dateDiff);
                console.log('getTripsByDuration: ', data);
            });

        this.statisticsService.getTripsByPrice()
            .subscribe((data: any[]) => {
                this.barChartLabels2 = data.map(item => `Trip name: ${item.name}`);
                this.barChartData2[0].data = data.map(item => item.sum);
                console.log('getTripsByPrice: ', data);
            });

        this.statisticsService.getTripCountByEmployee()
            .subscribe((data: any[]) => {
                this.barChartLabels3 = data.map(item => `Employee name: ${item.name}`);
                this.barChartData3[0].data = data.map(item => item.sum);
                console.log('getTripCountByEmployee: ', data);
            });

        // this.statisticsService.getTripCountByPeriod()
        //     .subscribe((data: any[]) => {
        //         this.barChartLabels4 = ['Trip count'];
        //         this.barChartData4[0].data = [data];
        //         console.log('getTripCountByPeriod: ', data);
        //     });

        this.statisticsService.getTripsByApartments()
            .subscribe((data: any[]) => console.log(data));
    }

}
