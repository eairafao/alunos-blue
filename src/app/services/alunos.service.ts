import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GenericService } from '../shared/generic.service';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {
  //! url principal da aplicação
  private url = environment.urlApiV1

  // Metodo construtor da class
  constructor(
    private http: HttpClient,
    private oGenericService: GenericService,
  ) { }


  createAluno(body: string): Observable<any> {
    return this.http.post(this.url + "api/v1/alunos/create", body , this.oGenericService.httpOptions('POST'));
  }

  findAll():  Observable<any>{
    return this.http.get(this.url + "api/v1/alunos/findAll", this.oGenericService.httpOptions('GET'));
  }

  updateAluno(ra: string ,body: string) : Observable<any>{
    return this.http.patch(this.url + "api/v1/alunos/update/" + ra, body, this.oGenericService.httpOptions('PATCH'))
  }

  deleteAluno(ra: string): Observable<any>{
    return this.http.delete(this.url + "api/v1/alunos/delete/" + ra, this.oGenericService.httpOptions('DELETE'))
  }
}
