import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { computed, inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { FilingStatus, PayPeriod, PayrollTaxApiRequest, PayrollTaxApiResponse, State } from '../models/calculator.model';
import { formatDate } from '@angular/common';

@Service()
export class PayrollTaxApiService {
    http = inject(HttpClient)

     private baseUrl = 'https://payrolltaxapi.com/v1';

    private ratesLookupUrl = this.baseUrl + '/rates/lookup?';
    private jurisdictionsUrl = this.baseUrl + '/jurisdictions?';
    private ratesChangesUrl = this.baseUrl + '/rates/changes?';

    private header = new HttpHeaders().set('Authorization', 'Bearer ptx_free_c27e1fa1767d4914a7d033b7071c6148a8ae15b5649212e6')


    getRatesLookup(payrollTaxApiRequest: PayrollTaxApiRequest): Observable<PayrollTaxApiResponse> {
        return this.http.get<PayrollTaxApiResponse>(this.ratesLookupUrl + `workState=${payrollTaxApiRequest.workState}&payDate=${formatDate(payrollTaxApiRequest.payDate, 'yyyy-MM-dd', 'en-US')}&residenceState=${payrollTaxApiRequest.residenceState}&grossWages=${payrollTaxApiRequest.grossWages}&payPeriod=${payrollTaxApiRequest.payPeriod}&filingStatus=${payrollTaxApiRequest.filingStatus}&allowances=${payrollTaxApiRequest.allowances}`, {headers: this.header})
    }


    constructor() {
        const request: PayrollTaxApiRequest = {
            workState: State.New_York,
            payDate: new Date(new Date().getFullYear(), 1, 1),
            residenceState: State.New_Jersey,
            grossWages: 130000,
            payPeriod: PayPeriod.Weekly,
            filingStatus: FilingStatus.Single,
            allowances: 0
        }

        this.getRatesLookup(request).subscribe({
            next: (response) => {
                console.log(response.taxes)
            },
            error: (err) => {
                console.error(err)
            },
            complete: () => {
                console.log('complete')
            }
        })

    }
}
