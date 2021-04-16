import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionRegisteredHomeComponent } from './transaction-registered-home.component';

describe('TransactionRegisteredHomeComponent', () => {
    let component: TransactionRegisteredHomeComponent;
    let fixture: ComponentFixture<TransactionRegisteredHomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TransactionRegisteredHomeComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TransactionRegisteredHomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
