import { Component, OnInit } from '@angular/core';
import { InstituicaoService } from 'src/app/services/instituicao.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-instituicao',
  templateUrl: './instituicao.component.html',
  styleUrls: ['./instituicao.component.scss']
})
export class InstituicaoComponent implements OnInit {
  instituicoes: any;

  constructor(
    private instituicaoService: InstituicaoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const userId = this.route.snapshot.params['id'];
    console.log(userId);
    this.obterInstituicaoPorId(userId)
  }

  obterInstituicaoPorId(userId: number) {
    this.instituicaoService.obter_pelo_id(userId).subscribe(
      (response) => {
        this.instituicoes = response; // atribui o resultado à variável instituicoes
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
