<h1>Controle de Painéis</h1>
<p>Aplicativo que permite realizar o CRUD de painéis, onde o usuário após efetuar o cadastro e login, poderá usufruir das funções da aplicação.</p>

<h3>Projeto concluído</h3>

<h3>Features: <h5>
- [x] Cadastro de painéis
  <br>
- [x] Cadastro de usuário
  <br>
- [x] Autenticação de usuário
  <br>
- [ ] Cadastro de clintes


<h3>Pré-requisitos:</h3>
<p>Antes de começar, você deve ter instalado em sua máquina as seguintes ferramentas:
[Node.js](https://nodejs.org/en/), [Mongodb](https://www.mongodb.com/) e um editor de código como o [VSCode](https://code.visualstudio.com/)</p>

<h4>Rodando servidor mongo:</h4>
Para que a conexao com o banco seja efetuada com sucesso, você deve iniciar o servidor do Mongodb digitando o seguinte comando no terminal/cmd:
<br>
$ mongod
<br><br>

Leve em conta que também é necessário definir uma variável de ambiente no windows do tipo Path, referênciando o local da pasta bin do MongoDB, presente nos arquivos de instalação:
<br>
Variável de ambiente:
<br>
C:\Program Files\MongoDB\Server\4.4\bin
<br><br>
Após executado o comando "mongod" no terminal/cmd, deixe-o rodando e, utilizando outro terminal/cmd navegue até a pasta do projeto:
<br>
$cd actualapp
<br>

<h4>Instale as dependências:</h4>
$npm install

<h4>Execute a aplicação:<h4>
$npm start

<h4>O servidor inciará na porta: 8001 - acesse http://localhost:8001</h4>

<h3>Instruções para uso:</h3>
Para utilizar o aplicativo corretamente, após tê-lo aberto no navegador, basta criar uma conta e efetuar o login, assim o usuário será redirecionado para a página principal (área de administração).

<ht>
<h3>Tecnologias utilizadas:</h3>
Foram utilizadas as seguintes tecnologias:
<br>
- [Node.js](https://nodejs.org/en/)
<br>
- [Handlebars](https://handlebarsjs.com/)
<br>
- [MongoDB](https://www.mongodb.com/)



<h4>Autor:</h4>
Paulo Gabriel Porreca
