> [!NOTE]  
> Este documento é uma visão geral de como foi pensado o projeto. Para mais detalhes, consulte os [requisitos](/docs/requisitos.md).


# Como foi pensado

### 💡 A ideia inicial 

Criar o sistema principal utilizando o Laravel, framework PHP para facilitar e agilizar o desenvovimento do backend juntamente com o ReactJS para o frontend.

Tendo como premissa disponibilizar uma página de cep de origem e destino, para que o usuário possa informar dois ceps e se eles tiverem coordenadas geográficas registradas, o sistema irá calcular a distância entre elas utilizando a fórmula de Haversine e retornar o resultado em quilômetros.

Depois de cada consulta na API, o sistema irá armazenar o resultado da API e do cálculo de distância no banco de dados para que possa ser consultado posteriormente e não ficar gastando recurso da API e ter uma resposta ainda mais rápida. `Poderia ter utilizado um redis para cache mas para essa demanda não achei tão necessário`.

Foi tomado cuidado para não duplicar CEPs e nem distâncias calculadas exemplo `89120000 até 89121000` e `89121000 até 89120000` são a mesma distância, então não é necessário calcular novamente. `Criei uma query que olha os dois casos para não precisar recaluclar toda vez que altera a ordem`

A `home` não precisará de login mas permitirá somente 5 requisições por minuto, caso o usuários deseje realizar mais requisições, será necessário realizar um cadastro e login e assim terá acesso a 15 requisições por minuto e também a uma tela de importação em massa!

Ao realizar o envio do arquivo .csv, o PHP irá ler esse csv e adicionar os dados em uma tabela de lote e adicionar cada item no banco e em uma fila do rabbitmq para que o microserviço em NodeJS possa processar esses dados em massa e calcular as distâncias entre os CEPs e armazenar no banco de dados. `Como eu explico mais abaixo, eu gostaria de alterar essa lógica para que o microserviço faça todo o processamento e envio ao banco em segundo plano, pois melhoraria a resposta do usuário na tela quando ele envia o arquivo grande.`

Quando se está logado é possível acompanhar a lista de importações, os status de cada uma e o resultado do processamento em massa. (Lembrando que se não existe o CEP ou as coordenadas geográficas, o sistema irá contabilizar como processado pois é um 'erro' esperado). Caso exista todas as contas teremos uma visualização no mapa.

Temos a lista de todas as distâncias já calculadas do sistema, mas não está configurado sistema de permissão então todos os usuários logados podem visualizar essa lista.

Foi pensado inicialmente em colocar a stack ELK para monitoramento dos logs e traces, com OpenTelemetry como é algo que quero aprender mas ainda estou trabalhando nisso.

---

### 📝 Ferramentas

Tudo foi containerzado utilizando o **Docker** para facilitar a execução do projeto, garantindo que todos os ambientes estejam iguais. 

Utilizamos o framework PHP **Laravel** com **ReactJS** integrado para facilitar o desenvolvimento.

Para o processamento em massa dos dados, foi criado um microserviço em **NodeJS**.

Para a comunicação entre os serviços, foi utilizado o **RabbitMQ**. 

Para o banco de dados, foi utilizado o **Postgres**. 

Para o servidor web, foi utilizado o **Nginx** integrado com **PHP-FPM**.


### 🪶 Adicionais

Foi construido um "Builder" para o projeto, visando facilitar a execução de comandos e a instalação de dependências. Pois o compartilhamento direto do volume entre NGINX e PHP-FPM via docker causa problema de lentidão e performace. Por isso foi optado por realizar o build e dentro da imagem do PHP-FPM realizar a cópia dos arquivos construidos pelo Builder.


### 📦 Estrutura de pastas

- **docker**: Contém os arquivos de configuração do Builder e do Nginx
- **app** `PHP`: Contém o app principal construído com Laravel
- **worker-importer** `NodeJS`: Contém o microserviço para o processamento dos dados em massa do arquivo .csv  

---


### 🚧 Aprendizados e considerações

- Observabilidade: Atualmente tenho conhecimento de análise com dynatrace porém nunca precisei fazer uma instrumentação manual com o a stack ELK para monitoramento dos logs e traces, mas eu quis tentar só que infelizmente ainda não consegui finalizar como gostaria. `Mas ainda irei fazer para aprender bem`

- Processamento em massa: Utilizei a importação via PHP, o que não é um problema, mas assim que envio a requisição o PHP já processa esse arquivo e envia os dados para o rabbitmq para realizar o processamento através do microserviço em NodeJS. `Acredito que poderia ser feito de uma forma mais eficiente, importar o arquivo bruto e deixar o microserviço fazer toda essa leitura e envio ao rabbitmq em segundo plano pois isso pesa no tempo e resposta do usuário na tela.`

- Testes: Não consegui implementar testes unitários e de integração, mas acredito que seria uma boa prática para garantir a qualidade do código.

- Microserviço: O microserviço queria ter feito em GO até para aprender porém começou a ficar difícil a aprendizagem então resolvi fazer a primeira versão em NodeJS, mas acredito que em GO seria mais desafiador.


---


🎡 Tudo isso foi bastante divertido e proveitoso, isso me fez lembrar de muitas coisas do Laravel e do próprio PHP que eu não me recordava mais, por tanto tempo sem utilizar.

Esse projeto será uma referencia para que em breve eu implemente observabilidade de forma eficiente e aprenda GO que é uma vontade particular.

