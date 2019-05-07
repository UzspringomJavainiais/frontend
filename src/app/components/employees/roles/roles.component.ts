import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {RoleService} from '../../../_services/role.service';
import {NewRoleModalComponent} from '../new-role-modal/new-role-modal.component';

@Component({
    selector: 'app-roles',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
    private roles: any;

    constructor(private matDialog: MatDialog, private roleService: RoleService) {
    }

    ngOnInit() {
        this.getRoles();
    }

    getRoles() {
        this.roleService.getAllRoles()
            .subscribe(data => this.roles = data);
    }

    openAddNewRoleModal() {
        const matDialogRef = this.matDialog.open(NewRoleModalComponent);
        matDialogRef.afterClosed()
            .subscribe(data => this.getRoles());
    }
}
