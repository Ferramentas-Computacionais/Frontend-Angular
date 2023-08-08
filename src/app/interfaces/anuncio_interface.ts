export interface anuncio_interface {
  id: number;
  nome: string;
  descricao: string;
  data_criacao: Date | null;
  imagem: string;
  verificado: boolean; // Adicione esta linha
  instituicao: {
    id: number;
    nome: string;
    endereco: string;
  };
}
