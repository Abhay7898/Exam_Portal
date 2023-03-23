import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit { 

  constructor(private quizService: QuizService, private route: ActivatedRoute, private _router: Router) { }

qid :any;
quizResult : any;

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.qid = param['qid'];
      this.quizService.getSingalQuiz(this.qid).subscribe((data: any) => {
        this.quizResult = data;
      },
        (error) => {
          console.log(error);
          Swal.fire('Error !!', 'Error in loading Singal Quiz data', 'error');
        })
    });
  }

  public startQuiz(){
    Swal.fire({
      title: 'Do you want to save the changes?',
      showCancelButton: true,
      confirmButtonText: 'Start',
      denyButtonText: `Don't Start`,
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        this._router.navigate(['start/'+this.qid  ]);
      } else if (result.isDenied) {
        Swal.fire('Quiz not start', '', 'info')
      }
    })
  }

}
