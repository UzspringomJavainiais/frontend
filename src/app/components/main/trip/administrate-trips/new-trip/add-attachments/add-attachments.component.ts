import {Component, OnInit} from '@angular/core';
import {TripService} from 'src/app/_services/trip.service';
import {Trip} from '../../../../../../models/trip';
import {EmployeeService} from 'src/app/_services/employee.service';
import {Router, ActivatedRoute} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { Observable, of, forkJoin, from } from 'rxjs';
import { mergeMap, flatMap, merge, map } from 'rxjs/operators';

@Component({
    selector: 'app-add-attachments',
    templateUrl: './add-attachments.component.html',
    styleUrls: ['./add-attachments.component.css']
})
export class AddAttachmentsComponent implements OnInit {
    public employees;

    private tripId: number;

    item: CheckListItemWithAttachment = {
        name: null,
        price: null,
        attachment: null,
    };

    public tripForm: FormGroup;
    public checklistItemsList: FormArray;

    public uploader: FileUploader = new FileUploader({
        isHTML5: true
    });
    title: string = 'Angular File Upload';

    constructor(private tripService: TripService,
                private employeeService: EmployeeService,
                private router: Router,
                private route: ActivatedRoute,
                private fb: FormBuilder) {

        this.tripForm = this.fb.group({
            checklistItems: this.fb.array([]),
        });

        this.checklistItemsList = this.tripForm.get('checklistItems') as FormArray;
    }

    createCheckListItem(item) {
        return this.fb.group({
            name: [item.name ? item.name : '', Validators.required],
            price: [item.price ? item.price : '', Validators.required],
            attachment: [item.attachment ? item.attachment : null]
        });
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.tripId = params.id;
        });
    }

    onSubmit() {
        // of(this.checklistItemsList.value.map((item) => {
        //     return this.tripService.uploadTripFile(this.tripId, item).subscribe(
        //         (response) => {},
        //         (error) => {
        //             console.error(error)
        //         });
        // }))


        const r = new FileReader();
        // if success
        r.onload = (ev: ProgressEvent): void => {
            console.log("pizda");
            this.tripService.uploadTripFile(this.tripId, this.checklistItemsList.value[0], (ev.target as any).result).subscribe(
                (response) => {
                    console.log(JSON.stringify(response, null, "    "));
                    this.router.navigate(['/administrate-trips']);
                },
                (error) => {
                    console.error(error)
                });
        };
        // if failed
        r.onerror = (ev): void => {

        };
        console.log(this.checklistItemsList.value[0]);
        console.log("=========");
        r.readAsText(this.checklistItemsList.value[0].attachment);




        // .subscribe(response => {
        //     this.router.navigate(['/administrate-trips']);
        // });
    }

    addNewItem() {
        if (!this.item.name || !this.item.price) {
            return 0;
        }
        this.checklistItemsList.push(this.createCheckListItem(this.item));
        this.item = { name: null, price: null, attachment: null };
    }

    onFileSelected(file: FileList): void {
        this.item.attachment = file[0];
    }

    removeAttachment(): void {
        this.item.attachment = null;
    }

    removeAddedAttachment(index: number): void {
        this.checklistItemsList.removeAt(index);
    }
}

export interface CheckListItemWithAttachment {
    name: string,
    price: string,
    attachment: File,
};
