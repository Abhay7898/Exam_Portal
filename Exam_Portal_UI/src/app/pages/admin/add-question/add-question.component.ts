import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  
  constructor(private router: ActivatedRoute, private questionService : QuestionService,private snack: MatSnackBar) { }

public Editor = ClassicEditor;

qId  : any;
qTitle : any;
question = {
  
  content:'',
  image:'',
  option1:'',
  option2:'',
  option3:'',
  option4:'',
  answer:'',
  quiz:{ 
    qid: ''},
  
  };
  
  ngOnInit(): void {
    this.qId = this.router.snapshot.params['qid'];
    this.question.quiz.qid = this.qId;
    this.qTitle = this.router.snapshot.params['title'];
  }


  public addQuestionSubmit(){
    if(this.question.content == null || this.question.content == ''){
      this.snack.open('Content is reqierd!','ok',{
        duration :3000, verticalPosition:'bottom',
        });
      return;
    }
  
    if(this.question.option1 == null || this.question.option1 == ''){
      this.snack.open('Option1 is reqierd!','ok',{
        duration :3000, verticalPosition:'bottom',
        });
      return;
    }
  
    if(this.question.option2 == null || this.question.option2 == ''){
      this.snack.open('Option2 is reqierd!','ok',{
        duration :3000, verticalPosition:'bottom',
        });
      return;
    }
    if(this.question.option3 == null || this.question.option3 == ''){
      this.snack.open('Option3 is reqierd!','ok',{
        duration :3000, verticalPosition:'bottom',
        });
      return;
    }
    if(this.question.option4 == null || this.question.option4 == ''){
      this.snack.open('Option4 is reqierd!','ok',{
        duration :3000, verticalPosition:'bottom',
        });
      return;
    }
    if(this.question.answer == null || this.question.answer == ''){
      this.snack.open('Answer is reqierd!','ok',{
        duration :3000, verticalPosition:'bottom',
        });
      return;
    }
    
    
    
    this.questionService.addQuestion(this.question).subscribe(
      (data:any)=>{
      console.log(data);
        Swal.fire('Success Done !!' ,'Question Added with id ' + data.quesId,'success');
        this.question.content = '';
        this.question.option1 = '';
        this.question.option2 = '';
        this.question.option3 = '';
        this.question.option4 = '';
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
