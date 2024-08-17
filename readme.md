# DFAPP

<div align="center">

![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-269539?style=for-the-badge&logo=nginx&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Postgres](https://img.shields.io/badge/Postgres-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)
![NodeJS](https://img.shields.io/badge/NodeJS-339933?style=for-the-badge&logo=node.js&logoColor=white)


</div>

---

# 🗂️ Índice

1. [Objetivos do projeto](#-objetivos)
2. [Instalação](#-instalação)
3. [Configuração](#%EF%B8%8F-configuração-opcional)
4. [Tecnologias](#-tecnologias)
5. [RabbitMQ](#-rabbitmq)
6. [Postgres](#-postgres)
7. [Licença](#-licença)
8. [Autor](#%EF%B8%8F-autor)

---

## 📋 Objetivos

Abaixo eu apresento os requisitos e como foi o pensamento durante o desenvolvimento do projeto.

- [Requisitos](docs/requisitos.md)
- [Como foi pensado](docs/como-foi-pensado.md)

---

## 📦 Instalação

Primeiramente configure o arquivo `.env` com as informações do seu banco de dados. OU renomeie o `.env.example` de exemplo para `.env` e configure as informações do banco de dados caso necessário. (ou deixe padrão para subir o projeto com as configurações padrão)

Primeiro vamos realizar o build do frontend para poder compartilhar entre PHP e NGINX.

```bash 
docker compose -f docker-compose-build.yml up --build
```

> [!WARNING]  
> Aguarde o seu terminal liberar, esse processo pode demorar alguns minutos. (Lembrando que o build precisa ser feito apenas uma vez, a não ser que você altere algo no frontend)

<br/>

Agora que temos o build pronto vamos subir o projeto.

```bash
docker compose up -d --build
```

Basta acessar [http://localhost](http://localhost) para visualizar a aplicação ou [http://app.dfapp.local](http://app.dfapp.local) se você configurar os DNS como está descrito abaixo.



## 🛠️ Configuração (Opcional)

Se você tiver interesse em criar DNS exclusivo localmente utilize a parte abaixo, mas não é obrigatório, o projeto irá funcionar mesmo sem essa configuração.

Se estiver utilizando windows vá até `c:\windows\system32\drivers\etc` abra o arquivo `hosts` como adiministrador e vá até o final dele e cole as 3 linhas que estão abaixo.

```bash
127.0.0.1 app.dfapp.local
127.0.0.1 amqp.dfapp.local
# 127.0.0.1 monitor.dfapp.local
```

---

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

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✒️ Autor

[Gabriel Andreazza](https://github.com/gabolera)

[Site](https://andreazza.dev) | [GitHub](https://github.com/gabolera) | [Linkedin](https://www.linkedin.com/in/gabriel-andreazza/)
