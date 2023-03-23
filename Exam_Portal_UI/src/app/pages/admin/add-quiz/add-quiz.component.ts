import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/service/category.service';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent {

  constructor(private categorieService: CategoryService,private snack: MatSnackBar, private quizService : QuizService) { }

categorySelect : any=[];

quizData : any = {
  title: '',
  description: '',
  maxMarks: '',
  numberOfQuestions : '' ,
  active : true,  
  category : {
    cid: ''
} 
};

ngOnInit(): void {
  this.categorieService.categories().subscribe((data: any) => {
    this.categorySelect = data;
  },
  (error) => {
    console.log(error);
    Swal.fire('Error !!' ,'Error in loading data','error');
  } 
  );
}


public addQuizSubmit(){
  if(this.quizData.title == null || this.quizData.title == ''){
    this.snack.open('Title is required!','ok',{
      duration :3000, verticalPosition:'bottom',
      });
    return;
  }

  if(this.quizData.description == null || this.quizData.description == ''){
    this.snack.open('Description is required!','ok',{
      duration :3000, verticalPosition:'bottom',
      });
    return;
  }

  if(this.quizData.maxMarks == null || this.quizData.maxMarks == ''){
    this.snack.open('Max Marks is required!','ok',{
      duration :3000, verticalPosition:'bottom',
      });
    return;
  }
  if(this.quizData.numberOfQuestions == null || this.quizData.numberOfQuestions == ''){
    this.snack.open('Number Of Questions is required!','ok',{
      duration :3000, verticalPosition:'bottom',
      });
    return;
  }
  if(this.quizData.category.cid == null || this.quizData.category.cid == ''){
    this.snack.open('Category is required!','ok',{
      duration :3000, verticalPosition:'bottom',
      });
    return;
  }


  this.quizService.addQuiz(this.quizData).subscribe(
    (data:any)=>{        
      this.quizData.title = '';
      this.quizData.description = '';
      this.quizData.maxMarks = '';
      this.quizData.numberOfQuestions = '';
      this.quizData.title = '';
      Swal.fire('Success Done !!' ,'Quiz Added with id ' + data.qid,'success');
    },
    (error) =>{
      console.log(error);
      this.snack.open(error.error.msg,'',{
        duration :3000, verticalPosition:'bottom',
      });
    }
  );    
  }


}
