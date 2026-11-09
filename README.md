# GiroFood

Aplicação demonstrativa de gestão de restaurante, feita com NestJS e uma interface web responsiva inspirada nas telas de pedidos, cardápio, clientes e login.

## Executar localmente

```bash
npm install
npm run start:dev
```

Abra `http://localhost:3000` no navegador.

Conta demonstrativa:

- E-mail: `contademo@gmail.com`
- Senha: `Demo05@`

## Funcionalidades da demonstração

- Login demonstrativo e cadastro local de restaurante.
- Cadastro, edição, busca, ordenação e exclusão de clientes.
- Cadastro, edição, busca, categorias, fotos e exclusão de produtos do cardápio.
- Criação de categorias pelo cardápio e alertas de novos pedidos.
- Personalização da logo do restaurante nas configurações.
- Criação manual de pedidos, mudança de status, busca e filtros.
- Dashboard com banners, gráfico de pedidos e filtros de hoje, últimos 7 dias e mês atual.
- Resumo financeiro com gráfico de faturamento bruto, valores em andamento e cancelados, ticket médio e produtos mais vendidos.
- Pedidos demonstrativos fictícios distribuídos pelos últimos 30 dias para preencher os indicadores e gráficos.
- Pedidos de exemplo em diferentes etapas do fluxo para visualizar a tela de vendas.
- Interface adaptável a celular e desktop.
- Dados de exemplo e imagens remotas de produtos e avatares.

As fotos do cardápio podem ser escolhidas na galeria incluída na tela de produto ou informadas por URL. As fotos de clientes também aceitam uma URL. Nas configurações, a logo pode ser enviada em PNG, JPG ou WebP (até 1 MB) e aparece na navegação do sistema.

## Limites importantes

Esta versão é um protótipo funcional de interface: os dados ficam no `localStorage` do navegador. Login, cadastro de restaurante e recuperação de senha não são autenticação real; não use senhas nem dados pessoais verdadeiros. O backend NestJS ainda não tem endpoints de negócio nem persistência em banco. Para produção, é necessário implementar autenticação segura, API e banco de dados.

Os pedidos e valores iniciais são fictícios e servem para demonstrar o Dashboard e o Financeiro. O resumo financeiro não registra custos, taxas, descontos ou formas de pagamento, então o faturamento exibido não representa lucro líquido. Dados de demonstração antigos da conta padrão são atualizados automaticamente; pedidos manuais e os demais dados são preservados.

## Verificações

```bash
npm run build
npm test
npm run lint
```