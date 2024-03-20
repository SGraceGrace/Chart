import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Users } from './model/User';
import { ResponseDTO } from './model/ResponseDTO';
import { LatLong } from './model/LatLong';
import { YearDTO } from './model/YearDTO';
import { Result } from './model/Result';
import { TimeDTO } from './model/TimeDTO';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  url: string = environment.getUsers;

  monthwiseUrl: string = environment.getUsersByMonth;
  districtwiseUrl: string = environment.getUsersByDistrict;
  latLongUrl: string = environment.getUsersByLatLong;
  yearWiseUrl: string = environment.getUsersByYear;
  timeWiseUrl: string = environment.getUsersByTime;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Users[]>{
    return this.http.get<Users[]>(this.url);
  }

  getUsersByMonthAndYear(month: number, year: number): Observable<ResponseDTO[]>{
    return this.http.get<ResponseDTO[]>(`${this.monthwiseUrl}/${month}/${year}`);
  }

  getUsersByDistrict(): Observable<Result[]>{
    return this.http.get<Result[]>(this.districtwiseUrl);
  }

  getLocations(): Observable<LatLong[]>{
    return this.http.get<LatLong[]>(this.latLongUrl);
  }

  getUsersByYear(): Observable<YearDTO[]>{
    return this.http.get<YearDTO[]>(this.yearWiseUrl);
  }

  getUsersByTime(month: number, year: number): Observable<TimeDTO[]>{
    return this.http.get<TimeDTO[]>(`${this.timeWiseUrl}/${month}/${year}`);
  }
}
