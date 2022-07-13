import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EmitType } from '../../enums';
import { FormValidityModel } from '../../models';

@Injectable({
    providedIn: 'root',
})
export class FrontendHelperService {
    private saveDataSubject = new BehaviorSubject<EmitType>(EmitType.None);
    public saveDataObservable = this.saveDataSubject.asObservable()
   
    private formValidSubject = new BehaviorSubject<FormValidityModel>(new FormValidityModel());
    public formValidObservable = this.formValidSubject.asObservable()

    constructor() {
    }

    emitSaveData(type: EmitType) {
        this.saveDataSubject.next(type);
    }

    emitFormValid(type: EmitType, isValid: boolean,isDestroyed:boolean) {
        const validity = new FormValidityModel();
        validity.emitType = type;
        validity.isDestroyed = isDestroyed;
        validity.isValid = isValid;
        this.formValidSubject.next(validity);
    }
}
