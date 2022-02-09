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
[x] Deve ser possivel cadastrar um aluguel



**RN**

[x] O aluguel deve ter duração minima de 24 horas
[x] Não deve ser possivel cadastrar um novo aluguel caso já exista um aluguel aberto para o mesmo usuário
[x] Não deve ser possivel cadastrar um novo aluguel caso já exista um aluguel aberto para o mesmo carro
[x] O usuário deve estar logado na aplicação
[x] Ao Realizar um aluguel, o status do carro alugado deve ser alterado para indisponivel


# Devolução de carro

**RF**
Deve ser possível realizar a devolução de um carro

**RN** 
Se o cartro for devolvido com menos de 24 horas, deverá ser cobrado diária completa
Ao realizar a devolução, o carro deverá ser liberado para outro aluguel
Ao relaizar a devolução, o usuário deverá ser liberado para outro Aluguel
Ao realizar a  devolução, deverá ser calculado o total do aluguel
Caso o horário de  devolução seja superior ao horário previsto dse entrega, deverá ser cobraado multa porporcional aos dias de atraso
O Usuário deve estar logado na aplicação
Caso haja multa, deverá ser somado ao total do aluguel

# Listagem de Alugueis para usuário

**RF**
Deve ser possível realizar a busca de todos os alugueis pra o usuário

**RN** 
O Usuário deve estar logado na aplicação
