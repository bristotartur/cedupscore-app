import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PaginationResponse } from '../../shared/models/pagination-response.model';
import { handleError } from '../../shared/utils/common-utils';
import { Participant } from '../models/participant.model';
import { ParticipantRegistration } from '../models/participant-registration.model';
import { RegistrationReport } from '../models/registration-report.model';
import { ParticipantWithProblem } from '../models/participant-with-problem.model';
import { InactivationReport } from '../models/inactivation-report.model';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  private url = environment.api;
  private httpClient = inject(HttpClient);

  previousProfileUrl: string = '';

  listParticipants(query?: string): Observable<PaginationResponse<Participant>> {
    return this.httpClient.get<PaginationResponse<Participant>>(`${this.url}/api/v1/participants${query}`);
  }

  findParticipantByCpf(cpf: string): Observable<Participant> {
    return this.httpClient.get<Participant>(`${this.url}/api/v1/participants/find?cpf=${cpf}`)
      .pipe(
        catchError(handleError)
      );
  }

  findParticipantById(id: number): Observable<Participant> {
    return this.httpClient.get<Participant>(`${this.url}/api/v1/participants/${id}`)
      .pipe(
        catchError(handleError)
      );
  }

  findParticipantForUpdate(id: number): Observable<Participant> {
    return this.httpClient.get<Participant>(`${this.url}/api/v1/participants/${id}/for-update`)
      .pipe(
        catchError(handleError)
      );
  }

  registerParticipant(req: ParticipantRegistration): Observable<Participant> {
    return this.httpClient.post<Participant>(`${this.url}/api/v1/participants`, req)
      .pipe(
        catchError(handleError)
      );
  }

  uploadRegistrarionCSVFile(file: File): Observable<RegistrationReport> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post<RegistrationReport>(`${this.url}/api/v1/participants/upload/registration-csv`, formData)
      .pipe(
        catchError(handleError)
      );
  }

  uploadInactivationCSVFile(file: File): Observable<InactivationReport> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post<InactivationReport>(`${this.url}/api/v1/participants/upload/inactivation-csv`, formData)
      .pipe(
        catchError(handleError)
      );
  }

  downloadReportCSVFile(type: string, participants: ParticipantWithProblem[]): Observable<HttpResponse<Blob>> {
    return this.httpClient.post(
      `${this.url}/api/v1/participants/generate/csv?type=${type}`, participants, {
        observe: 'response',
        responseType: 'blob' 
      }
    ).pipe(
      catchError(handleError)
    );
  }

  deleteParticipant(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/api/v1/participants/${id}`)
      .pipe(
        catchError(handleError)
      );
  }

  registerParticipantInEdition(id: number, editionId: number, teamId: number): Observable<Participant> {
    return this.httpClient.post<Participant>(
      `${this.url}/api/v1/participants/${id}/register-in-edition/${editionId}?team=${teamId}`, null
    ).pipe(
      catchError(handleError)
    );
  }

  unregisterParticipantInEdition(id: number, registrationId: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.url}/api/v1/participants/${id}/remove-edition-registration/${registrationId}`
    ).pipe(
      catchError(handleError)
    );
  }

  updateParticipant(id: number, req: ParticipantRegistration): Observable<Participant> {
    return this.httpClient.put<Participant>(`${this.url}/api/v1/participants/${id}`, req)
      .pipe(
        catchError(handleError)
      );
  }

  setStatus(id: number, status: boolean): Observable<Participant> {
    return this.httpClient.patch<Participant>(`${this.url}/api/v1/participants/${id}/set-status?is-active=${status}`, null)
      .pipe(
        catchError(handleError)
      );
  }

}
