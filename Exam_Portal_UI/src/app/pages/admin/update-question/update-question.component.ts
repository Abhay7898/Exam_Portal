import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {
  public Editor = ClassicEditor;

  constructor(private router: ActivatedRoute, private questionService: QuestionService, private routerLink: Router) { }

  questionId: any = 0;
  questionData: any = [];

  ngOnInit(): void {
    this.questionId = this.router.snapshot.params['questionid'];
    this.questionService.getSingleQuestion(this.questionId).subscribe((data: any) => {
      this.questionData = data;
    },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error in loading Singal Quiz data', 'error');
      })
  }


  updateQuestionSubmit() {

    Swal.fire({
      title: 'Do you want to Question Update ?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Update',
      denyButtonText: `Don't Update`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionService.updateQuestion(this.questionData).subscribe((data: any) => {
          Swal.fire('Success Done !!', 'Question Update', 'success').then((e) => {
            this.routerLink.navigate(['admin/quizzes']);
          });
        },
          (error) => {
            console.log(error);
            Swal.fire('Error !!', 'Question Update Failed', 'error');
          })
      } else if (result.isDenied) {
        Swal.fire('Question Update Canceled', '', 'info')
      }
    })
  }


}
