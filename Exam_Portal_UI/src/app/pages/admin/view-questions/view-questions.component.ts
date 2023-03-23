import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit  {
  
  constructor(private router : ActivatedRoute , private _qustionService : QuestionService,private routerLink : Router){}

  qId :any ;
  title :any;
  questionList : any = [];

  ngOnInit(): void {
    this.qId = this.router.snapshot.params['qid'];
    this.title = this.router.snapshot.params['title'];
    this._qustionService.getQuistionOfList(this.qId).subscribe((data: any) => {
      this.questionList = data;
      console.log(data);
    },
    (error) => {
      console.log(error);
      Swal.fire('Error !!' ,'Error in loading question data','error');
    } 
    );
  }

  public deletQuestion(qid: any) {
    Swal.fire({
      title: 'Do you want to delete Question ?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        this._qustionService.deleteQuestion(qid).subscribe((data: any) => {
          Swal.fire('Success Done !!', 'Question Deleted', 'success').then((e) => {
            this.questionList = this.questionList.filter((q : any) => q.quesId != qid); 
          });
        },
          (error) => {
            console.log(error);
            Swal.fire('Error !!', 'Quiz Question Failed', 'error');
          })
      } else if (result.isDenied) {
        Swal.fire('Question Deletion Canceled', '', 'info')
      }
    })
  }



}
