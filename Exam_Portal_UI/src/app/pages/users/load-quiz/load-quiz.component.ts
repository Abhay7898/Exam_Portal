import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  constructor(private quizService: QuizService, private router: ActivatedRoute) { }


  catId: any;
  quizzlist: any = [];

  ngOnInit(): void {

    this.router.params.subscribe((param) => {
      this.catId = param['catId'];
      if (this.catId == 0) {
        this.quizService.getAllActiveQuiz().subscribe((data: any) => {
          this.quizzlist = data;
        },
          (error) => {
            console.log(error);
            Swal.fire('Error !!', 'Error in Quiz loading data', 'error');
          })
      } else {
        this.quizService.getActiveQuizOfCategory(this.catId).subscribe((data: any) => {
          this.quizzlist = data;
          console.log(data);
        },
          (error) => {
            console.log(error);
            Swal.fire('Error !!', 'Error in loading Singal Quiz data', 'error');
          })
      }

    });

  }


}
