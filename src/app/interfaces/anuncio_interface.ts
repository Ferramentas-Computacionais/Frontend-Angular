export interface anuncio_interface {
    id: number;
    nome: string;
    descricao: string;
    data_criacao: Date | null;
    imagem: string;
    instituicao: {
      id: number;
      nome: string;
      endereco: string;
    };
  }
  