## Intranet SEDS v2.0

-   Melhora no carregamento de páginas e feedback para o usuário de processamento do servidor;
-   Correção de bug na parte de notificações, onde o mesmo não mostrava corretamente quando existiam notificações novas;
-   Melhora no sistema de login, agora utilizando JWT para manter o usuário logado;
-   Feedback de erros colocados em todas as requisições;
-   Melhorado estrutura de código para seguir o padrão clean code;
-   Utilizado framework NextJS para criação do projeto ReactJS;
-   Melhorias na interface e correção de diversos bugs menores.

## Deployment

Para realizar o deploy da aplicação do cliente é necessário o "PM2" para renderizar o servidor Node.

Para instalar o PM2:

```bash
    npm install pm2 -g
```

Para criar o primeiro processo do PM2 utiliza o arquivo "deploy.json", lá é para preencher os dados do processo. Dentro do package.json na parte de "scripts" é colocado a porta que será utilizada como essa é a parte do cliente deve estar com a porta 80.

Rodar o servidor de produção:

```bash
    # o prompt de comando precisa estar executando esse código na pasta do projeto

    # pela primeira vez
    pm2 start deploy.json

    # após a primeira vez
    pm2 start all
```

Comandos utéis para o PM2:

```bash
    # listar os processos rodando
    pm2 list

    # parar todos os processos
    pm2 stop all

    # reiniciar todos os processos
    pm2 restart all

```
