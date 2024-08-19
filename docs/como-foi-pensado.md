> [!NOTE]  
> Este documento é uma visão geral de como foi pensado o projeto. Para mais detalhes, consulte os [requisitos](/docs/requisitos.md).


# Como foi pensado

### 💡 A ideia inicial 

Utilizar o Laravel, framework PHP para facilitar e agilizar o desenvovimento do backend juntamente com o ReactJS para o frontend.

### 📝 Ferramentas

Tudo foi containerzado utilizando o **Docker** para facilitar a execução do projeto, garantindo que todos os ambientes estejam iguais. 

Utilizamos o framework PHP **Laravel** com **ReactJS** integrado para facilitar o desenvolvimento.

Para o processamento em massa dos dados, foi criado um microserviço em **NodeJS**.

Para a comunicação entre os serviços, foi utilizado o **RabbitMQ**. 

Para o banco de dados, foi utilizado o **Postgres**. 

Para o servidor web, foi utilizado o **Nginx** integrado com **PHP-FPM**.


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

