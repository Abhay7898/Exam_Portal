import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http : HttpClient) { }


  public getQuistionOfList(qid :any){
    return this.http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  public getQuistionOfQuizForTest(qid :any){
    return this.http.get(`${baseUrl}/question/quiz/${qid}`);
  }

  public getSingleQuestion(qid :any){
    return this.http.get(`${baseUrl}/question/${qid}`);
  }

  public deleteQuestion(qid :any){
    return this.http.delete(`${baseUrl}/question/${qid}`);
  }

  public addQuestion(questionData :any){
    return this.http.post(`${baseUrl}/question/`,questionData);
  }

  public updateQuestion(questionData :any){
    return this.http.put(`${baseUrl}/question/`,questionData);
  }

  public evalQuizQuestion(questionData :any){
    return this.http.post(`${baseUrl}/question/eval-quiz`,questionData);
  }
}
