import { Component } from '@angular/core';
import { AnuncioService } from 'src/app/services/anuncio.service';

@Component({
  selector: 'app-criacao-anuncio',
  templateUrl: './criacao-anuncio.component.html',
  styleUrls: ['./criacao-anuncio.component.scss']
})
export class CriacaoAnuncioComponent {

  constructor(private anuncioService: AnuncioService) {} // Injete o serviço

  criarNovoAnuncio(form: any) {
    if (form.invalid) {
      return; // Não faça nada se o formulário for inválido
    }

    const nomeAnuncio = form.value.nomeAnuncio;
    const descricaoAnuncio = form.value.descricaoAnuncio;
    const imagemAnuncio = form.value.imagemAnuncio;

    const novoAnuncio = new FormData(); // Usar FormData para enviar arquivos
    novoAnuncio.append('nome', nomeAnuncio);
    novoAnuncio.append('descricao', descricaoAnuncio);
    novoAnuncio.append('imagem', imagemAnuncio); // Certifique-se de que 'imagemAnuncio' seja o nome correto do input file no formulário

    this.anuncioService.criarAnuncio(novoAnuncio).subscribe(
      response => {
        console.log('Anúncio criado:', response);
        // Faça ações adicionais, se necessário
      },
      error => {
        console.error('Erro ao criar anúncio:', error);
      }
    );
  }
}
