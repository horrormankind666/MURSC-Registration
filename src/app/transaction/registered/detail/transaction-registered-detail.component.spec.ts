import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionRegisteredDetailComponent } from './transaction-registered-detail.component';

describe('TransactionRegisteredDetailComponent', () => {
    let component: TransactionRegisteredDetailComponent;
    let fixture: ComponentFixture<TransactionRegisteredDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TransactionRegisteredDetailComponent]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TransactionRegisteredDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
