# Olá


## 📦 Instalação

Primeiramente configure o arquivo `.env` com as informações do seu banco de dados. OU renomeie o `.env.example` de exemplo para `.env` e configure as informações do banco de dados caso necessário. (ou deixe padrão para subir o projeto com as configurações padrão)

Primeiro vamos realizar o build do frontend para poder compartilhar entre PHP e NGINX.

```bash 
docker compose -f docker-compose-build.yml up --build
```

`Aguarde o seu terminal liberar, esse processo pode demorar alguns minutos`


Agora que temos o build pronto vamos subir o projeto.

```bash
docker compose up -d --build
```

Basta acessar [http://localhost](http://localhost) para visualizar a aplicação.


## 🛠️ Configuração (Opcional)

Se você tiver interesse em criar DNS exclusivo localmente utilize a parte abaixo, mas não é obrigatório, o projeto irá funcionar mesmo sem essa configuração.

Se estiver utilizando windows vá até `c:\windows\system32\drivers\etc` abra o arquivo `hosts` como adiministrador e vá até o final dele e cole as 3 linhas que estão abaixo.

```bash
127.0.0.1 app.dfapp.local
127.0.0.1 amqp.dfapp.local
# 127.0.0.1 monitor.dfapp.local
```

## 🚀 Tecnologias

- [Docker](https://www.docker.com/)
- [PHP-FPM](https://www.php.net/)
- [Laravel](https://laravel.com/)
- [Postgres](https://www.postgresql.org/)
- [Nginx](https://www.nginx.com/)
- [RabbitMQ](https://www.rabbitmq.com/)
- [NodeJS](https://nodejs.org/)



## 🐰 RabbitMQ

Para acessar o RabbitMQ basta acessar [http://amqp.dfapp.local](http://amqp.dfapp.local) ou [http://localhost:15672](http://localhost:15672) com as credenciais abaixo.

```text
usuario: rabbitmq
senha: rabbitmq
```

## 📅 Postgres

```text
usuario: postgres
senha: postgres
database: postgres
```


## 📝 Licença


## ✒️ Autor

[Gabriel Andreazza](https://www.linkedin.com/in/gabriel-andreazza/)

[Site](https://andreazza.dev) [Linkedin](https://www.linkedin.com/in/gabriel-andreazza/)
