import { Injectable } from '@angular/core';
import { Livro } from './livro'; // Ajuste o caminho do import conforme necessário

@Injectable({
  providedIn: 'root'
})
export class ControleLivrosService {
  private livros: Livro[] = [
    new Livro(1, 1, 'Livro A', 'Resumo A', ['Autor 1', 'Autor 2']),
    new Livro(2, 2, 'Livro B', 'Resumo B', ['Autor 3']),
    new Livro(3, 3, 'Livro C', 'Resumo C', ['Autor 4', 'Autor 5'])
    // Adicione mais livros conforme necessário
  ];

  constructor() { }

  obterLivros(): Livro[] {
    return this.livros;
  }

  incluir(livro: Livro): void {
    const maxCodigo = this.livros.reduce((max, livro) => livro.codigo > max ? livro.codigo : max, 0);
    livro.codigo = maxCodigo + 1;
    this.livros.push(livro);
  }

  excluir(codigo: number): void {
    const index = this.livros.findIndex(livro => livro.codigo === codigo);
    if (index !== -1) {
      this.livros.splice(index, 1);
    }
  }
}
