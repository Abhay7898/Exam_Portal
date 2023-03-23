import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  qId: any;
  question: any;

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;
  isSubmit = false;
  timer: any;


  constructor(private locationsSy: LocationStrategy, private routerAc: ActivatedRoute, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qId = this.routerAc.snapshot.params['qid'];
    this.loadQuestion();
  }

  public preventBackButton() {
    history.pushState(null, 'null', location.href);
    this.locationsSy.onPopState(() => {
      history.pushState(null, 'null', location.href);
    });
  }

  public loadQuestion() {
    this.questionService.getQuistionOfQuizForTest(this.qId).subscribe((data: any) => {
      this.question = data;

      this.timer = this.question.length * 2 * 60;

      this.startTimner();
    },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error in Question loading data', 'error');
      })
  }


  public submitQuiz() {
    Swal.fire({
      title: 'Do you want to Submit the quiz ?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      denyButtonText: `Don't Submit`,
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        this.evalQuiz();
      } else if (result.isDenied) {
        Swal.fire('Quiz not start', '', 'info')
      }
    })
  }

  public startTimner() {
    let t: any = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  public getFormatedTimer() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }

  public evalQuiz() {
    this.questionService.evalQuizQuestion(this.question).subscribe((data: any) => {
      this.correctAnswers++;
          this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
          this.attempted = data.attempted;
          this.correctAnswers = data.correctAnswer;
          this.isSubmit = true;
    },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error while evalution data', 'error');
      })
  }

  public printPage(){
    window.print();
  }

}
