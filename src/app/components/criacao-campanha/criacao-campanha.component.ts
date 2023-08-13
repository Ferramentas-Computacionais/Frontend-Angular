import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CampanhaService } from 'src/app/services/campanha.service';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ToastrService } from 'ngx-toastr'; // Importe o ToastrService

@Component({
  selector: 'app-criacao-campanha',
  templateUrl: './criacao-campanha.component.html',
  styleUrls: ['./criacao-campanha.component.scss']
})
export class CriacaoCampanhaComponent implements OnInit {
  nomeCampanha: string = '';
  descricaoCampanha: string = '';
  imagemCampanha: File | undefined;

  constructor(
    private campanhaService: CampanhaService,
    private authService: AutenticacaoService,
    private router: Router,
    private toastr: ToastrService // Injete o ToastrService
    
  ) {}

  ngOnInit(): void {}

  onImagemCampanhaChange(event: any) {
    this.imagemCampanha = event.target.files[0];
  }

  criarNovaCampanha() {
    if (!this.nomeCampanha || !this.descricaoCampanha) {
      return;
    }

    const novaCampanha = new FormData();
    novaCampanha.append('nome', this.nomeCampanha);
    novaCampanha.append('descricao', this.descricaoCampanha);

    if (this.imagemCampanha) {
      novaCampanha.append('imagem', this.imagemCampanha);
    }

    this.campanhaService.criarCampanha(novaCampanha).subscribe(
      response => {
        console.log('Campanha criada:', response);

        this.toastr.success('Campanha criada com sucesso', 'Sucesso');
        this.router.navigate(['/meus_anuncios']);
      },
      error => {
        this.toastr.error('Ocorreu um erro ao processar a solicitação.', error.error.message);      }
    );
  }
}
