> [!NOTE]  
> Esse documento é uma visão geral dos requisitos do projeto. Para mais detalhes, veja como foi [pensado na solução](/docs/como-foi-pensado.md).

---

# Cadastro de Distância entre CEPs

Sugerimos a criação de um sistema simples, contendo front e backend, de acordo com os requisitos.

## Regras

O projeto deverá atender os seguintes requisitos:

### Persistência em Banco de Dados

- **CEP origem**
- **CEP destino**
- **Distância calculada entre os CEPs**
- **Data/hora de cadastro**
- **Data/hora de alteração**

### Funcionalidades

- **Tela de exibição de lista de distâncias já calculadas**
- **Opção de adicionar nova distância**
- **Validação de CEP**
  - Ao digitar o CEP, deve-se validar que ele existe através do [Brasil API](https://brasilapi.com.br/)
- **Cálculo de Distância**
  - Após receber as coordenadas da API externa, o sistema deve calcular a distância entre as coordenadas sem usar API externa
  - Após calcular e exibir a distância calculada, persistir o cálculo
- **Cálculo em Massa**
  - Opção de cálculo em massa através de uma importação assíncrona (fila) de arquivo `.csv`
  - Validar CEPs e calcular distância, semelhante aos passos anteriores
  - O arquivo de entrada deve ter as seguintes colunas:
    - **CEP origem**
    - **CEP fim**


Veja também [Pensamentos da solução](/docs/como-foi-pensado.md)