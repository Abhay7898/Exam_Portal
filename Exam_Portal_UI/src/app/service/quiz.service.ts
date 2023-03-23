import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http : HttpClient) { }

  public quizzes(){
    return this.http.get(`${baseUrl}/quiz/`);
  }

  public addQuiz(quizData : any){
    return this.http.post(`${baseUrl}/quiz/`,quizData);
  }

  public deleteQuiz(qid : any){
    return this.http.delete(`${baseUrl}/quiz/${qid}`);
  }

  public getSingalQuiz(qid : any){
    return this.http.get(`${baseUrl}/quiz/${qid}`);
  }

  public updateQuiz(quizData : any){
    return this.http.put(`${baseUrl}/quiz/update`,quizData);
  }

  public getQuizzesOfCategory(qid : any){
    return this.http.get(`${baseUrl}/quiz/category/${qid}`);
  }

  public getAllActiveQuiz(){
    return this.http.get(`${baseUrl}/quiz/active`);
  }

  public getActiveQuizOfCategory(qid : any){
    return this.http.get(`${baseUrl}/quiz/category/active/${qid}`);
  }

}
