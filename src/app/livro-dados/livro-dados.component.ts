// No arquivo livro-dados.component.ts
import { Component, OnInit } from '@angular/core';
import { Livro } from '../livro';
import { Editora } from '../editora';
import { ControleEditoraService } from '../controle-editora.service';
import { ControleLivrosService } from '../controle-livros.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-livro-dados',
  templateUrl: './livro-dados.component.html',
  styleUrls: ['./livro-dados.component.css']
})
export class LivroDadosComponent implements OnInit {
  public livro: Livro = new Livro(0, 0, '', '', []);
  public autoresForm: string = '';
  public editoras: Editora[] = [];

  constructor(
    private servEditora: ControleEditoraService,
    private servLivros: ControleLivrosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.editoras = this.servEditora.getEditoras();
  }

  incluir = (): void => {
    this.livro.codEditora = Number(this.livro.codEditora);
    console.log(this.livro)
    this.livro.autores = this.autoresForm.split('\n').map(autor => autor.trim());

    if (this.livro.codigo === 0) {
      const maxCodigo = this.servLivros.obterLivros().reduce((acc, cur) => Math.max(acc, cur.codigo), 0);
      this.livro.codigo = maxCodigo + 1;
    }

    this.servLivros.incluir(this.livro);
    this.router.navigateByUrl('/lista');
  }
}
