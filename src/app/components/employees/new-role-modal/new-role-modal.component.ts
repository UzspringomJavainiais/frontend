import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApartmentService} from '../../../_services/apartment.service';
import {RoleService} from '../../../_services/role.service';

@Component({
    selector: 'app-new-role-modal',
    templateUrl: './new-role-modal.component.html',
    styleUrls: ['./new-role-modal.component.css']
})
export class NewRoleModalComponent implements OnInit {
    public addRoleForm: FormGroup;

    constructor(private roleService: RoleService,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.addRoleForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
        });
    // @Size(max = 100)
    // @Column(name = "NAME")
    // private String name;
    //
    // @Size(max = 100)
    // @Column(name = "DESCRIPTION")
    // private String description;
    }

    saveRole() {
        const dto = this.addRoleForm.value;
        this.roleService.saveRole(dto)
            .subscribe(data => {
                // TODO: saved role
                console.log('role saved');
            });
    }
}
