# Olá


## 📦 Instalação

Primeiramente configure o arquivo `.env` com as informações do seu banco de dados. OU renomeie o `.env.example` de exemplo para `.env` e configure as informações do banco de dados caso necessário. (ou deixe padrão para subir o projeto com as configurações padrão)

```bash 
docker compose -f docker-compose-build.yml up --build && docker compose up -d --build
```

Basta acessar [http://localhost](http://localhost) para visualizar a aplicação.


## 🛠️ Configuração (Opcional)

Se estiver utilizando windows vá até `c:\windows\system32\drivers\etc` abra o arquivo `hosts` como adiministrador e vá até o final dele e cole as 3 linhas que estão abaixo.

```bash
127.0.0.1 app.andreazza.local
127.0.0.1 amqp.andreazza.local
127.0.0.1 monitor.andreazza.local
```

## 🚀 Tecnologias

- [Docker](https://www.docker.com/)
- [PHP-FPM](https://www.php.net/)
- [Laravel](https://laravel.com/)
- [Postgres](https://www.postgresql.org/)
- [Nginx](https://www.nginx.com/)
- [RabbitMQ](https://www.rabbitmq.com/)
- [NodeJS](https://nodejs.org/)


## 📝 Licença

## ✒️ Autor


