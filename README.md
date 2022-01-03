**Requisitos Funcionais - RF**
São as funcionalidades que nossa aplicação irá ter

**Requisitos Não Funcioanis - RNF**
São requisitos não ligados diretamente a RN.
Ex: Os dados devem ser armazenados em Database Postgres


**Regras de Negócio - RN**

São as regras por trás dos nossos requisitos

Ex: Não deve ser possivel listar os usuarios se o cliente não for um admin
____________________________

# Cadastro de Carro
**RF**
[X] Deve ser possivel cadastrar um novo carro

**RN**

[X] Não deve ser possivel cadastrar um novo carro com license_plate já existente.
[x] O carro deve ser cadastrado, por padrão com Disponibilidade (Available)
[x] Não deve ser possivel cadastrar um carro se o usuário não for admin*

# Listagem de Carros

**RF**
[X] Deve ser possivel listar todos os carros disponiveis
[x] Deve ser possivel listar todos os carros disponiveis pelo nome da categoria
[x] Deve ser possivel listar todos os carros disponiveis pelo nome da marca

**RN**
[x] O usuário não precisa estar logado no sistema.
____________________________

# Cadastro de Especificação no carro (Specifications_Cars)
**RF**

[x] Deve ser possivel cadastrar uma especificação para um carro;

**RN**

[x] Não deve ser possivel cadastrar uma especifição para um carro não cadastrado;
[x] Não deve ser possivel cadastrar uma especificação já existente para o mesmo carro;
[x] Não deve ser possivel cadastrar uma Especificação no carro se o usuário não for admin


# Cadastro de Imagens do Carro

**RF**
[x] Deve ser possivel cadastrar a imagem do carro

**RNF**
[x] Utilizar o multer para upload os arquivos

**RN**
[x] O Usuario deve poder cadastrar mais de uma imagem para o mesmo carro
[x] Não deve ser possivel cadastrar a imagem do carro se o usuário não for admin
[x] Não deve ser possivel cadastrar uma imagem para um carro não existente

# Aluguel de Carro

**RF**
[] Deve ser possivel cadastrar um aluguel



**RN**

[] O aluguel deve ter duração minima de 24 horas
[] Não deve ser possivel cadastrar um novo aluguel caso já exista um aluguel aberto para o mesmo usuário
[] Não deve ser possivel cadastrar um novo aluguel caso já exista um aluguel aberto para o mesmo carro
[] O usuário deve estar logado na aplicação
[] Ao Realizar um aluguel, o status do carro alugado deve ser alterado para indisponivel

