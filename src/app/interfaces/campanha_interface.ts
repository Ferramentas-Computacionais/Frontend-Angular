export interface campanha_interface{
    id: number;
    nome: string;
    descricao: string;
    data_criacao: Date | null;
    data_expiracao: Date | null;
    ativo: boolean;
    verificado: boolean;
    imagem: string;
    usuario_id: number;
}