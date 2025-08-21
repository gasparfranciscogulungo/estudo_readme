****# Dicas de como funciona os arquivos README.md
## Explicacao deforma detalha e objectiva

**🏗 Estrutura do Markdown (README)**

📌 **Títulos**

Parecido com `<h1>`, `<h2>`, etc.  
Você usa `#` no começo da linha:
 
```markdown
# Título Principal   (H1)
## Subtítulo         (H2)
### Seção menor      (H3)
#### Ainda menor     (H4)
```


**📌 Parágrafos**

Basta escrever normalmente (não precisa de `<p>`).
Para quebrar a linha, deixe uma linha em branco entre parágrafos:

```markdown
Este é o primeiro parágrafo.

Este é o segundo parágrafo.
```

**📌 Negrito, Itálico e Riscado**

ex: 1. *test italico* 2. ~~test riscado~~ 3. **Negrito**

```markdown
**negrito**
*itálico*
~~riscado~~
```

**📌 Listas**

Lista não ordenada:

ex:
- Item 1
  - test 1.3
- Item 2
  - Subitem 2.1
  - test

```markdown
- Item 1
- Item 2
  - Subitem 2.1
```

**Lista Ordenda**

ex:
1. Primeiro
2. Segundo
3. Terceiro

```markdown
1. Primeiro
2. Segundo
3. Terceiro
```
**📌 Links e Imagens**

ex:

[Imagem do Google](https://www.google.com)

![Logo do Google](https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_92x30dp.png)

```markdown
[Texto do link](https://exemplo.com)

![Descrição da imagem](https://exemplo.com/imagem.png)
```

**📌 Código**

- Inline (no meio do texto):

```markdown
Use o comando `npm install` para instalar.
```
“inline” significa mostrar um trecho de código dentro de uma frase, usando crases (`).

- Bloco de código:

```bash
npm install
npm run dev
```

**📊 Tabelas no Markdown**

ex:

| Coluna 1 | Coluna 2 | Coluna 3 |
|----------|----------|----------|
| Valor 1  | Valor 2  | Valor 3  |
| test2 | test 3 | test 4|
| gaspar | gaspar 2| gaspar 3|


A sintaxe principal é:

```markdown
| Coluna 1 | Coluna 2 | Coluna 3 |
|----------|----------|----------|
| Valor 1  | Valor 2  | Valor 3  |
```

**1️⃣ Alinhamento de Colunas**

Você pode alinhar o texto das colunas com (dois pontos :)

ex:

| Nome  | Idade | País   |
|:------:|:-----|-------:|
| Grish | 25    | Angola |
| Maria | 30    | Brasil |
| Ana   | 27    | Portugal |

**🔎 Explicação:**

:--- → alinhado à esquerda

:---: → alinhado ao centro

---: → alinhado à direita

```markdown
| Nome  | Idade | País   |
|:------:|:-----|-------:|
| Grish | 25    | Angola |
| Maria | 30    | Brasil |
| Ana   | 27    | Portugal|

```

**2️⃣ Tabelas com Markdown + HTML**

Se você precisar de mais controle, pode misturar HTML no Markdown:

ex: Feito com codigo html

<table>
  <tr>
    <th>Nome</th>
    <th>Idade</th>
    <th>País</th>
  </tr>
  <tr>
    <td>Grish</td>
    <td>25</td>
    <td>Angola</td>
  </tr>
  <tr>
    <td>Maria</td>
    <td>30</td>
    <td>Brasil</td>
  </tr>
</table>

code:

```html
<!--code feito html dentro do arquivo readme para mais control e proditividade-->
<table>
  <tr>
    <th>Nome</th>
    <th>Idade</th>
    <th>País</th>
  </tr>
  <tr>
    <td>Grish</td>
    <td>25</td>
    <td>Angola</td>
  </tr>
  <tr>
    <td>Maria</td>
    <td>30</td>
    <td>Brasil</td>
  </tr>
</table>
```

Isso permite:

- Mesclar células (colspan, rowspan)

- Usar cores, negrito, até ícones

**3️⃣ Células com Markdown dentro**

Alguns renderizadores (como GitHub e VSCode) permitem Markdown dentro das células:

ex:

| Nome   | Info                    |
|--------|--------------------------|
| Grish  | **Idade:** 25 <br> *Angola* |
| Maria  | [Perfil](#)             |

code:

```markdown
| Nome   | Info                    |
|--------|--------------------------|
| Grish  | **Idade:** 25 <br> *Angola* |
| Maria  | [Perfil](#)             |
```

**4️⃣ Estilização avançada (quando permitido)**

Com HTML, você pode até deixar colorido:

ex: 

<table>
  <tr>
    <th>Nome</th>
    <th>Status</th>
  </tr>
  <tr>
    <td>Grish</td>
    <td style="color: green;">Ativo</td>
  </tr>
  <tr>
    <td>Maria</td>
    <td style="color: while; background:blue;">Inativo</td>
  </tr>
</table>

code:

```html

<!-- Com configuração html permite ter maior control e mais produtividade -->

<table>
  <tr>
    <th>Nome</th>
    <th>Status</th>
  </tr>
  <tr>
    <td>Grish</td>
    <td style="color: green;">Ativo</td>
  </tr>
  <tr>
    <td>Maria</td>
    <td style="color: red;">Inativo</td>
  </tr>
</table>
```

**👉 Resumindo:**

Markdown puro é limitado (não tem merge de células, nem hierarquia como Excel).

HTML no Markdown resolve quando você precisa de algo avançado.

Em GitHub/VSCode dá para usar até Markdown dentro da tabela (**negrito**, links, emojis, etc.).


![GitHub repo size](https://img.shields.io/github/repo-size/usuario/repositorio)
![GitHub issues](https://img.shields.io/github/issues/usuario/repositorio)
![GitHub stars](https://img.shields.io/github/stars/usuario/repositorio)
![GitHub license](https://img.shields.io/github/license/usuario/repositorio)
