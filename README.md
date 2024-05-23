###Documentacao

Fora criados metodo post, para criacao de usuario, temos model, controller, service e repository:
==> No repository foi criado um metodo onde e gerado um create do usuario, passando seu password em um encrypt, para gerar uma hash
e ser salvo no banco, objeto q sera salvo no banco:
=> {
id: string,
name: string,
lastName: string,
password: string,
phone: string,
created_at: string,
updated_at: string,
}
