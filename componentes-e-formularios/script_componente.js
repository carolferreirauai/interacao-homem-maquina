class AulasComponent extends HTMLElement {
    
    // O construtor é o primeiro método a ser executado quando o componente é criado.
    constructor() 
    {
      super();
      this.attachShadow({ mode: 'open' });
      // Define uma variável 'hoje' para filtrar as aulas do dia, neste caso, está fixo como "ter" (terça-feira).
      this.hoje = "ter";
    }

    connectedCallback() 
    {
      this.loadData();
    }
  
    async loadData() 
    {
      try 
      {
        const response = await fetch('aulas.json');
        const aulas = await response.json();
        this.render(aulas);
      }
      catch (error) 
      {
        console.error('Erro ao carregar os dados das aulas:', error);
      }
    }

    render(aulas)
    {
      // Filtra a lista de aulas.
      const aulasDia = aulas.filter(a => a.data === this.hoje);
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'styles_componente.css'; 
      this.shadowRoot.appendChild(link);
      this.shadowRoot.innerHTML += `
        <div>
          ${aulasDia.map(a => 
            {
            // Lógica de Renderização para Cada Aula 
            // Verifica se o alerta de prova está ativo
            let provaDisplay = a.prova_alert ? '' : 'display: none;';
            
            // INÍCIO DA MELHORIA DO 5º PASSO
            let notaColor = ''; // Variável para armazenar a cor da nota.
            const notaValue = parseFloat(a.nota);

            if (notaValue < 6) 
            {
              notaColor = 'red';      // Vermelho para notas < 6
            } 
            else if (notaValue >= 6 && notaValue < 8) 
            {
              notaColor = 'orange';   // Laranja para notas entre 6 e 8
            }
            else 
            {
               notaColor = 'green';    // Verde para notas >= 8
            }
            // FIM DA MELHORIA DO 5º PASSO

            return `
              <div class="comp-aula">
                <div class="lable-prova p_lable" style="${provaDisplay}">PROVA: <b>${a.prova}</b></div>
                <div class="titulo_aula">${a.disciplina}</div>
                <p class="p">Local e Horário: <b>${a.local} - ${a.horario}</b></p>
                <div class="lables">
                  <div class="lable-frequencia p_lable">FALTAS: <b>${a.frequencia}</b></div>
                  
                  <div class="lable-nota p_lable" style="background-color: ${notaColor};">CR: <b>${a.nota}</b></div>
                </div>
              </div>
            `;
          }
        ).join('')
      } 
        </div>
      `;
    }
  }
  customElements.define('aulas-component', AulasComponent);