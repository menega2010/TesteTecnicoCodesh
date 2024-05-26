## UserRepository:

## ==> Dependências

        uuid: Biblioteca para gerar identificadores únicos universais (UUIDs).
        prismaClient: Cliente Prisma configurado para interagir com o banco de dados.
        PasswordCrypto: Serviço customizado para criptografar senhas.
        UserRepositoryInterface: Interface que define os métodos que a classe UserRepository deve implementar.
        UserDTO: Data Transfer Object (DTO) usado para transferir dados do usuário.
        Estrutura do Código

## Imports

##

## import { v4 as uuidv4 } from "uuid";

## import { UserRepositoryInterface } from "../interface/InterfaceRepository/UserRepositoryInterface";

## import { UserDTO } from "../model/DTO/UserDTO";

## import prismaClient from "../prisma/prismaClient";

## import { PasswordCrypto } from "../shared/services/PasswordCrypto";

## Classe UserRepository

    A classe UserRepository implementa a interface UserRepositoryInterface.

## export class UserRepository implements UserRepositoryInterface {

## constructor() {}

##

## public async postCreateUser({ name, lastName, password, phone }: UserDTO): Promise<void> {

## try {

## const passwordHash: string = await PasswordCrypto.hashPassword(password);

##

## await prismaClient.tab_user.create({

## data: {

## id: uuidv4(),

## name,

## lastName,

## password: passwordHash,

## phone,

## createdAt: new Date().toISOString(),

## },

## });

## } catch (error) {

## throw new Error(`Erro ao criar usuário: ${error.message}`);

## }

##

## }

##

## public async authUser(username: string): Promise<UserDTO | null> {

## try {

## const user = await prismaClient.tab_user.findFirst({

## where: {

## AND: [{ name: username }],

## },

## });

##

## if (!user) {

## return null;

## }

##

## const { id, name, lastName, password, phone } = user;

##

## const userDTO: UserDTO = {

## id,

## name,

## lastName,

## password, // Evite armazenar a senha em plain text em DTOs, é apenas um exemplo.

## phone,

## };

##

## return userDTO;

## } catch (error) {

## throw new Error(`Erro ao autenticar usuário: ${error.message}`);

## }

##

## }

## }

## Métodos

    postCreateUser
    Cria um novo usuário no banco de dados.

## Parâmetros:

##

## name: Nome do usuário.

## lastName: Sobrenome do usuário.

## password: Senha do usuário (será criptografada).

## phone: Telefone do usuário.

## Retorno: Promise<void>

      Descrição: Este método recebe um objeto UserDTO, criptografa a senha usando o serviço PasswordCrypto, e então cria um novo registro na tabela tab_user no banco de dados usando o Prisma.

      Exceções: Lança um erro se a criação do usuário falhar.

      authUser
      Autentica um usuário pelo nome de usuário.

## Parâmetros:

##

## username: Nome do usuário para autenticação.

## Retorno: Promise<UserDTO | null>

    Descrição: Este método procura um usuário no banco de dados com o nome especificado. Se encontrado, retorna um UserDTO com os dados do usuário. Se não encontrado, retorna null.

    Exceções: Lança um erro se a autenticação falhar.

    Considerações de Segurança
    Criptografia de Senhas: As senhas dos usuários são criptografadas antes de serem armazenadas no banco de dados usando o serviço PasswordCrypto. Nunca armazene senhas em texto simples.
    DTOs: Certifique-se de não incluir informações sensíveis, como senhas, em DTOs ou respostas de API em produção.
    Configuração do Prisma
    O Prisma é configurado em um arquivo separado (prismaClient) que gerencia a conexão com o banco de dados. Certifique-se de que o arquivo schema.prisma esteja corretamente configurado e que as migrações estejam aplicadas.

## Exemplo de Uso

## Criação de Usuário

## const userRepository = new UserRepository();

##

## await userRepository.postCreateUser({

## name: "John",

## lastName: "Doe",

## password: "securepassword",

## phone: "1234567890",

## });

## Autenticação de Usuário

## typescript

## Copy code

## const userDTO = await userRepository.authUser("John");

## if (userDTO) {

## console.log("Usuário autenticado:", userDTO);

## } else {

## console.log("Usuário não encontrado");

## }

## Conclusão

    A implementação da classe UserRepository fornece uma base sólida para a gestão de usuários em um sistema, incluindo a criação e autenticação segura de usuários. Certifique-se de testar exaustivamente todas as funcionalidades e de aplicar boas práticas de segurança para proteger os dados dos usuários.

## UserService:

## Visão Geral

    Este documento fornece uma visão técnica detalhada do código UserService implementado em TypeScript. A classe UserService implementa a interface UserServiceInterface e serve como uma camada de serviço para operações relacionadas ao usuário, como criação de usuário e autenticação de usuário. Ela utiliza um repositório de usuário (UserRepositoryInterface) para interagir com o banco de dados e um serviço de criptografia de senhas (PasswordCrypto) para garantir a segurança das senhas.

## Dependências

    UserRepositoryInterface: Interface que define os métodos que o repositório de usuário deve implementar.
    UserServiceInterface: Interface que define os métodos que o serviço de usuário deve implementar.
    UserDTO: Data Transfer Object (DTO) usado para transferir dados do usuário.
    PasswordCrypto: Serviço compartilhado para criptografar e verificar senhas.
    Estrutura do Código
    Imports

## import { UserRepositoryInterface } from "../interface/InterfaceRepository/UserRepositoryInterface";

## import { UserServiceInterface } from "../interface/InterfaceService/UserServiceInterface";

## import { UserDTO } from "../model/DTO/UserDTO";

## import { PasswordCrypto } from "../shared/services";

## Classe UserService

    A classe UserService implementa a interface UserServiceInterface e fornece dois métodos principais: postCreateUser e authUser.

## export class UserService implements UserServiceInterface {

## constructor(private readonly userRepository: UserRepositoryInterface) {}

##

## public async postCreateUser({ name, lastName, password, phone }: UserDTO): Promise<void> {

## try {

## await this.userRepository.postCreateUser({

## name,

## lastName,

## password,

## phone,

## });

## } catch (error) {

## throw new Error("Erro ao criar usuário: " + error.message);

## }

## }

##

## public async authUser(username: string, password: string): Promise<Object> {

## try {

## const validateRet = { status: false, idUser: "" };

## const userDataValidate: UserDTO = await this.userRepository.authUser(username);

##

## if (!userDataValidate) {

## return false; // Usuário não encontrado

## }

##

## // Verificar a senha utilizando o serviço compartilhado PasswordCrypto

## const isPasswordValid = await PasswordCrypto.verifyPassword(

## password.toString(),

## userDataValidate.password.toString()

## );

##

## validateRet.idUser = userDataValidate.id;

## validateRet.status = isPasswordValid;

##

## return validateRet;

## } catch (error) {

## console.error("Erro ao autenticar usuário:", error);

## throw new Error("Erro ao autenticar usuário: " + error.message);

## }

## }

## }

## Métodos

    postCreateUser
    Cria um novo usuário no banco de dados.

## Parâmetros:

## name: Nome do usuário.

## lastName: Sobrenome do usuário.

## password: Senha do usuário.

## phone: Telefone do usuário.

## Retorno: Promise<void>

    Descrição: Este método recebe um objeto UserDTO e utiliza o repositório de usuário (userRepository) para criar um novo usuário no banco de dados. Se ocorrer algum erro durante a criação, um erro é lançado com uma mensagem descritiva.

    Exceções: Lança um erro se a criação do usuário falhar.

## authUser

    Autentica um usuário pelo nome de usuário e senha.

## Parâmetros:

## username: Nome do usuário para autenticação.

## password: Senha do usuário para autenticação.

## Retorno: Promise<Object>

    Descrição: Este método procura um usuário no banco de dados pelo nome de usuário utilizando o repositório de usuário (userRepository). Se o usuário for encontrado, a senha fornecida é verificada utilizando o serviço PasswordCrypto. Retorna um objeto contendo o status da validação e o ID do usuário, se a autenticação for bem-sucedida. Se o usuário não for encontrado ou se a senha for inválida, retorna false.

Exceções: Lança um erro se a autenticação falhar.

Considerações de Segurança
Criptografia de Senhas: As senhas dos usuários são verificadas usando o serviço PasswordCrypto, que garante que as senhas armazenadas sejam seguras.
Manuseio de Exceções: Os erros são capturados e mensagens descritivas são lançadas para facilitar a depuração.
Exemplo de Uso

## Criação de Usuário

## const userService = new UserService(userRepository);

##

## await userService.postCreateUser({

## name: "John",

## lastName: "Doe",

## password: "securepassword",

## phone: "1234567890",

## });

## Autenticação de Usuário

## const authResult = await userService.authUser("John", "securepassword");

##

## if (authResult.status) {

## console.log("Usuário autenticado com sucesso, ID do usuário:", authResult.idUser);

## } else {

## console.log("Autenticação falhou");

## }

## Conclusão

    A implementação da classe UserService fornece uma camada de serviço robusta para a criação e autenticação de usuários, utilizando boas práticas de segurança, como a criptografia de senhas. Esta camada de serviço facilita a interação com o repositório de usuário e garante que as operações relacionadas aos usuários sejam realizadas de forma segura e eficiente. Certifique-se de testar exaustivamente todas as funcionalidades e de aplicar boas práticas de segurança para proteger os dados dos usuários.

## UserController

## Visão Geral

    Este documento fornece uma visão técnica detalhada do código de um controlador de usuário implementado em TypeScript com Express. O controlador fornece métodos para criar e autenticar usuários, utilizando um serviço de usuário (UserService) e um repositório de usuário (UserRepository). O serviço de autenticação JWT (JWTService) é utilizado para gerar tokens de acesso após a autenticação bem-sucedida.

## Dependências

    express: Framework web para Node.js.
    http-status-codes: Módulo para facilitar o uso de códigos de status HTTP.
    UserDTO: Data Transfer Object (DTO) usado para transferir dados do usuário.
    UserRepository: Repositório que implementa a interface de repositório de usuário.
    UserService: Serviço que implementa a interface de serviço de usuário.
    JWTService: Serviço para gerar e verificar tokens JWT.
    Estrutura do Código

## Imports

## import { Request, Response } from "express";

## import { StatusCodes } from "http-status-codes";

## import { UserDTO } from "../model/DTO/UserDTO";

## import { UserRepository } from "../repository/UserRepository";

## import { UserService } from "../service/UserService";

## import { JWTService } from "../shared/services";

## Controlador de Usuário

    O controlador de usuário fornece dois métodos principais: post para criar um usuário e postAuth para autenticar um usuário.

## export default {

## async post(req: Request, resp: Response): Promise<Response> {

## try {

## const { name, lastName, password, phone } = req.body as UserDTO;

##

## // Validação básica dos campos necessários

## if (!name || !lastName || !password || !phone) {

## return resp

## .status(400)

## .json({ message: "Todos os campos são obrigatórios" });

## }

##

## const userService = new UserService(new UserRepository());

## await userService.postCreateUser({ name, lastName, password, phone });

##

## // Retornar status 201 para criação bem-sucedida

## return resp.status(201).json({ message: "Usuário criado com sucesso" });

## } catch (error) {

## // Tratar erros e retornar status 500 para erros internos do servidor

## console.error("Erro ao criar usuário:", error);

## return resp

## .status(500)

## .json({ message: "Erro ao criar usuário", error: error.message });

## }

## },

##

## async postAuth(req: Request, resp: Response): Promise<Response> {

## try {

## const { name, password } = req.body;

## // Validação dos campos de entrada

## if (!name || !password) {

## return resp

## .status(400)

## .json({ message: "Usuário e senha são obrigatórios" });

## }

##

## const userService = new UserService(new UserRepository());

## const isAuthenticated = await userService.authUser(name, password);

##

## if (isAuthenticated["status"]) {

## // Retornar status 200 para autenticação bem-sucedida

## const acessToken = JWTService.sign({

## uid: isAuthenticated["idUser"],

## });

## if (acessToken === "JWT_SECRET_NOT_FOUND") {

## return resp.status(StatusCodes.INTERNAL_SERVER_ERROR).json({

## errors: {

## default: "Erro ao gerar token de acesso",

## },

## });

## }

## return resp.status(200).json({

## message: "Autenticação bem-sucedida",

## acessToken: acessToken,

## });

## } else {

## // Retornar status 401 para credenciais inválidas

## return resp.status(401).json({ message: "Credenciais inválidas" });

## }

## } catch (error) {

## // Tratar erros e retornar status 500 para erros internos do servidor

## console.error("Erro ao autenticar usuário:", error);

## return resp

## .status(500)

## .json({ message: "Erro ao autenticar usuário", error: error.message });

## }

## },

## };

## Métodos

    post
    Cria um novo usuário no banco de dados.

## Parâmetros:

## req: Objeto de solicitação do Express.

## resp: Objeto de resposta do Express.

## Retorno: Promise<Response>

    Descrição: Este método extrai os dados do usuário do corpo da solicitação, valida os campos necessários e utiliza o UserService para criar um novo usuário. Se ocorrer um erro durante a criação, um erro é tratado e uma mensagem de erro é retornada.

    Exceções: Lança um erro se a criação do usuário falhar.

## postAuth

Autentica um usuário pelo nome de usuário e senha.

## Parâmetros:

## req: Objeto de solicitação do Express.

## resp: Objeto de resposta do Express.

## Retorno: Promise<Response>

Descrição: Este método extrai o nome de usuário e a senha do corpo da solicitação, valida os campos necessários e utiliza o UserService para autenticar o usuário. Se a autenticação for bem-sucedida, um token de acesso JWT é gerado e retornado na resposta. Se as credenciais forem inválidas, um status de erro apropriado é retornado.

    Exceções: Lança um erro se a autenticação falhar.

    Considerações de Segurança
    Validação de Entrada: Os campos obrigatórios são validados antes de qualquer operação.
    Criptografia de Senhas: As senhas são criptografadas antes de serem armazenadas no banco de dados.
    Tokens JWT: Tokens JWT são gerados para autenticação segura após o login bem-sucedido.
    Exemplo de Uso
    Criação de Usuário

## Endpoint para criação de usuário

    app.post('/user', userController.post);
    Autenticação de Usuário

## Endpoint para autenticação de usuário

    app.post('/auth', userController.postAuth);

## Conclusão

    O controlador de usuário fornece uma interface clara e segura para criar e autenticar usuários. Ele utiliza serviços dedicados para lógica de negócios e criptografia, garantindo que os dados do usuário sejam manipulados de maneira segura e eficiente. Certifique-se de testar exaustivamente todas as funcionalidades e de aplicar boas práticas de segurança para proteger os dados dos usuários.
