import { Component, OnInit, ViewChild } from '@angular/core';
import { PoDisclaimer, PoDisclaimerComponent, PoModalAction, PoModalComponent, PoNotificationService, PoTableColumn } from '@po-ui/ng-components';
import { AlunosService } from 'src/app/services/alunos.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.scss']
})
export class AlunosComponent implements OnInit {
  @ViewChild('modalVisualizar', { static: true }) modalVisualizar!: PoModalComponent;
  @ViewChild('modalIncluir', { static: true }) modalIncluir!: PoModalComponent;
  @ViewChild('modalEditar', { static: true }) modalEditar!: PoModalComponent;
  @ViewChild('modalExcluir', { static: true }) modalExcluir!: PoModalComponent;

  columnsTable: Array<PoTableColumn> = [];
  items: Array<any> = []
  constructor(private alunos: AlunosService, private poNotification: PoNotificationService) {

   }

   //! filtro 
   aFilterDisclaimer: Array<PoDisclaimer> = [];
   inputFiltro: any = '';

   //! Variaveis Incluir
   nomeCompleto!: string;
   email!: string;
   telefone!: string;
   ra!: string;
   curso!: string;
   classe!: string;
   idade!: string; 

   //! Variaveis visualizar
   nomeCompletoVisualizar: string = '';
   emailVisualizar: string = '';
   raVisualizar: string = '';
   telefoneVisualizar: string = '';
   cursoVisualizar: string = '';
   classeVisualizar: string = '';
   idadeVisualizar: string = '';

  ngOnInit(): void {
    this.columnsTable = this.getColumns();
    this.carregaItems();
  }

  carregaItems( ){
    this.alunos.findAll().subscribe(
      (res) => {
        this.items = res;
      },(err) => {
        this.poNotification.error('Falha ao carregar dados');
      }
    )
  }

  getColumns(): Array<PoTableColumn> {

    const columns: Array<PoTableColumn> = [ 
      {
      property: 'acoes',
      width: '150px',
      label: 'Ações',
      type: 'icon',
      icons: [
        {
          color: 'color-13',
          icon: 'po-icon po-icon-edit',
          value: 'alterar',
          tooltip: 'Editar',
          action: this.openModalEditar.bind(this),
        },
        {
          color: 'color-13',
          value: 'visualizar',
          icon: 'po-icon po-icon-eye',
          tooltip: 'Visualizar Aluno',
          action: this.openModalVisualizar.bind(this),
        },

        {
          color: 'color-13',
          value: 'excluir',
          icon: 'po-icon po-icon-delete',
          tooltip: 'Excluir',
          action: this.openModalExcluir.bind(this),
        }],
    },
      { property: 'nome', label: 'Nome Completo', width: '200px' },
      { property: 'ra', label: 'RA', width: '230px' },
      { property: 'email', label: 'Email', width: '230px' },
      { property: 'telefone', label: 'Telefone', width: '230px' },
      { property: 'curso', label: 'Curso', width: '250px' },
      { property: 'classe', label: 'Número de classe', width: '200px'},
      { property: 'idade', label: 'Idade', width: '150px' },
     
    ];

    return columns;
  }

  openModalIncluir(){
    this.nomeCompleto = '',
    this.email = '',
    this.ra = '',
    this.curso = '',
    this.classe = '',
    this.telefone = '',
    this.idade = '',
    this.modalIncluir.open();
  }

  confirmModalIncluir(){
    const body: object = {
      nome: this.nomeCompleto.trim(),
      email: this.email.trim(),
      ra: this.ra.toString().trim(),
      curso: this.curso.trim(),
      classe: this.classe.trim(),
      telefone: this.telefone.toString().trim(),
      idade: this.idade
    }

    this.alunos.createAluno(JSON.stringify(body)).subscribe(
      (res) => {
        this.poNotification.success('Aluno cadastrado com sucesso!');
        this.modalIncluir.close();
        this.carregaItems();
      },(err) => {
        this.poNotification.warning('Aluno não cadastrado! (ERRO: 232 - USUARIO)');
      }
    )
    
  }

  confirmModalI: PoModalAction = {
    action: () => {
      this.confirmModalIncluir();
    },
    label: 'Confirmar',
  };

  closeModalI: PoModalAction = {
    action: () => {
      this.modalIncluir.close();
    },
    label: 'Fechar',
    danger: true
  };
  

  //! INICIO MODAL VISUALIZAR ==================================================================================
  openModalVisualizar(event: any) {
    console.log(event)
    this.nomeCompletoVisualizar = event.nome;
    this.emailVisualizar = event.email;
    this.raVisualizar = event.ra;
    this.telefoneVisualizar = event.telefone;
    this.cursoVisualizar = event.curso;
    this.classeVisualizar = event.classe;
    this.idadeVisualizar = event.idade;
    //*Variaveis recebendo o valor da linha clicada.
    this.modalVisualizar.open();
    


    //* Propertys da modal visualizar recebendo os valores da linha clicada.
    //this.valorVisualizar = {
    //  crVisual: this.crVisu,
    //}
  }


  //! FIM MODAL VISUALIZAR ==================================================================================
  //?=========================================================================================================

  //! INICIO MODAL EXCLUIR ==================================================================================

  raExcluir!: any;

  openModalExcluir(event: any){
    this.raExcluir = event.ra;
    this.modalExcluir.open();
  }

  confirmModalExcluir(){
    this.alunos.deleteAluno(this.raExcluir)
    .subscribe(
      (res) => {
        this.poNotification.success('Aluno deletado com sucesso.');
        this.modalExcluir.close();
        this.carregaItems();
      },(err) => {
        this.poNotification.error('Erro, contatar T.I');
      }
    );
  }

  confirmModalEx: PoModalAction = {
    action: () => {
      this.confirmModalExcluir();
    },
    label: 'Sim',
  };

  closeModalEx: PoModalAction = {
    action: () => {
      this.modalExcluir.close();
    },
    label: 'Não',
    danger: true
  };
  


  //! INICIO MODAL EDITAR ==================================================================================

  //* Variaveis Editar

  nomeCompletoEditar: any;
  emailEditar: any;
  raEditar: any;
  telefoneEditar: any;
  cursoEditar: any;
  classeEditar: any;
  idadeEditar: any;


  openModalEditar(event: any){
    this.modalEditar.open();
    this.nomeCompletoEditar   = event.nome;
    this.emailEditar          = event.email
    this.raEditar             = event.ra
    this.telefoneEditar       = event.telefone
    this.cursoEditar          = event.curso
    this.classeEditar         = event.classe
    this.idadeEditar          = event.idade
  }


  confirmModalEditar() {

    const body = JSON.stringify({
      nome: this.nomeCompletoEditar === undefined ? '' : this.nomeCompletoEditar,
      email: this.emailEditar === undefined ? '' : this.emailEditar,
      ra: this.raEditar === undefined ? '' : this.raEditar,
      telefone: this.telefoneEditar === undefined ? '' : this.telefoneEditar,
      curso: this.cursoEditar === undefined ? '' : this.cursoEditar,
      classe: this.classeEditar === undefined ? '' : this.classeEditar,
      idade: this.idadeEditar === undefined ? '' : this.idadeEditar,

    });
    this.alunos.updateAluno(this.raEditar,body).subscribe(
      () => {
        setTimeout(() => {
          this.modalEditar.close();
          this.poNotification.success('Registro Editado com sucesso!');
          this.carregaItems();
        }, 1000);
      }, 
    );
  }
  
  confirmModalE: PoModalAction = {
    action: () => {
      this.confirmModalEditar();
    },
    label: 'Confirmar',
  };

  closeModalE: PoModalAction = {
    action: () => {
      this.modalEditar.close();
    },
    label: 'Fechar',
    danger: true
  };
  

  //! FIM MODAL VISUALIZAR ==================================================================================


  //! FILTRO

  removeFilter() {
    this.carregaItems();
  }

  filterPrimario() {
    if(this.inputFiltro.length > 0) { 
      if(this.aFilterDisclaimer.length > 0) {
        this.aFilterDisclaimer = [];
        this.carregaItems();

        setTimeout(() => {
          this.addBoxFilter(this.inputFiltro.trim())
          this.inputFiltro = '';
        },100)
        
      }else{
        this.addBoxFilter(this.inputFiltro.trim())
        this.inputFiltro = '';
      }
      
    }
  }


  addBoxFilter(input: string) {
    let filtroAplicado: Array<any> = [];
    let property: any = {property: 'teste', value: 'Igor macaco', label: 'Filter: ' + input};
    let teste: any;
    this.aFilterDisclaimer = [...this.aFilterDisclaimer, property];

    this.items.map((values: any) => { 
      teste = Object.fromEntries(
        Object.entries(values).filter((value: any) => 
        value[1].toString().toLowerCase().includes(input.toLocaleLowerCase())
        ) )

      if(Object.keys(teste).length > 0) {
        filtroAplicado.push(values)
      }
        
    });
    
    this.items =  filtroAplicado
  }
}
