import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  constructor(private quizService: QuizService) { }
  quizzlist: any = [];

  ngOnInit(): void {
    this.quizService.quizzes().subscribe((data: any) => {
      this.quizzlist = data;
    },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error in loading data', 'error');
      })
  }

  public deletQuiz(qid: any) {
    Swal.fire({
      title: 'Do you want to delete Quiz ?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.quizService.deleteQuiz(qid).subscribe((data: any) => {
          this.quizzlist = this.quizzlist.filter((quiz: any) => quiz.qid != qid);
          Swal.fire('Success Done !!', 'Quiz Deleted', 'success');
        },
          (error) => {
            console.log(error);
            Swal.fire('Error !!', 'Quiz Deletion Failed', 'error');
          })
      } else if (result.isDenied) {
        Swal.fire('Quiz Deletion Canceled', '', 'info')
      }
    })
  }





}
