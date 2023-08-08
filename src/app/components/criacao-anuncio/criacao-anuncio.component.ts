import { Component } from '@angular/core';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criacao-anuncio',
  templateUrl: './criacao-anuncio.component.html',
  styleUrls: ['./criacao-anuncio.component.scss']
})
export class CriacaoAnuncioComponent {

  selectedImagemAnuncio: File | undefined;

  constructor(private anuncioService: AnuncioService, private router: Router) {} // Injete o serviço

  onImagemAnuncioChange(event: any) {
    this.selectedImagemAnuncio = event.target.files[0];
  }

  criarNovoAnuncio(form: any) {
    if (form.invalid) {
      return; // Não faça nada se o formulário for inválido
    }

    const nomeAnuncio = form.value.nomeAnuncio;
    const descricaoAnuncio = form.value.descricaoAnuncio;

    const novoAnuncio = new FormData();
    novoAnuncio.append('nome', nomeAnuncio);
    novoAnuncio.append('descricao', descricaoAnuncio);

    if (this.selectedImagemAnuncio) {
      novoAnuncio.append('imagem', this.selectedImagemAnuncio);
    }

    this.anuncioService.criarAnuncio(novoAnuncio).subscribe(
      response => {
        console.log('Anúncio criado:', response);
        // Exiba um alerta para o usuário
        alert('Anúncio criado com sucesso!');
        // Redirecione para a página "meus-anuncios"
        this.router.navigate(['/meus_anuncios']);
      },
      error => {
        alert('Anúncio não criado com sucesso!');
      }
    );
  }
}
