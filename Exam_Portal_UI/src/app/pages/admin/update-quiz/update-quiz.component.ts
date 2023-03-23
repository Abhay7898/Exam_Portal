import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private router: ActivatedRoute, private quizService: QuizService,private categorieService: CategoryService,private routerLink : Router) { }

  qId: any = 0;
  quizData :any = [];
  categorySelect : any=[];


  ngOnInit(): void {
    this.qId = this.router.snapshot.params['qid'];
    this.quizService.getSingalQuiz(this.qId).subscribe((data: any) => {
      this.quizData = data;
      console.log(data);
    },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error in loading Singal Quiz data', 'error');
      })

      this.categorieService.categories().subscribe((data: any) => {
        this.categorySelect = data;    
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!' ,'Error in loading data','error');
      } 
      );
  }


  updateQuizSubmit(){

    Swal.fire({
      title: 'Do you want to Update Quiz ?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.quizService.updateQuiz(this.quizData).subscribe((data :any) =>{
          Swal.fire('Success Done !!' ,'Quiz Update','success').then((e) => {
            this.routerLink.navigate(['admin/quizzes']);
          });
      },
      (error)=> {
        console.log(error);
        Swal.fire('Error !!' ,'Quiz Update Failed','error');
      })      
      } else if (result.isDenied) {
        Swal.fire('Quiz Update Canceled', '', 'info')
      }
    })
  }

}
