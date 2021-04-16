import { TestBed } from '@angular/core/testing';

import { AppRoutingResolveService } from './app-routing-resolve.service';

describe('AppRoutingResolveService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: AppRoutingResolveService = TestBed.get(AppRoutingResolveService);
        expect(service).toBeTruthy();
    });
});
