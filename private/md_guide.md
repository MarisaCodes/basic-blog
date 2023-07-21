# Hello world!

This is a markdown guide for writing blog posts in markdown!

User input markdown is parsed using [markdown-it](https://github.com/markdown-it/markdown-it/tree/master). Syntax highlighting for code is also available for each language.

## Quick start with markdown

### 1. Titles

In markdown we can use the # symbol to create titles. You can vary the size of the title by simply adding more # symbols. The syntax for making a title is: \`# title goes here\`.

# Title 1

## Title 2

### Title 3

#### Title 4

##### Title 5

###### Title 6

### 2. Separators

You can make a line separator between sections or paragraphs of your text. For example, the bellow light shaded line is a separator that separates this section from the next.

---

And this is the next section. The way you make a separator is by going to a new line then typing three dashes \`---\`.

### 3. Images

You can include images in your blogs (or in any markdown file/markdown format input)! The way you do that is by typing:
\`![describe image for screen readers to help people with disability](url of image goes here)\`

Example:

![screenshot from bocchi the rock! anime](https://raw.githubusercontent.com/MarisaCodes/misc/main/public/images/bocchi.png)

The syntax: \`![screenshot from bocchi the rock! anime](https://raw.githubusercontent.com/MarisaCodes/misc/main/public/images/bocchi.png)\`

### 4. Links

Links are just like images except you exclude the excalmation mark. So, the syntaxt is \`[Text you want to appear](actual link address goes here)\`.

For example: [Click me!](https://www.youtube.com/watch?v=xvFZjo5PgG0)

### 5. Lists

There are two types of lists: unordered and ordered lists.
Unordered lists can be made by going to a new line for each item and typing a dash \`-\` at the beginning of the line.
Example:

- item
- another
- yet another

The markdown syntax looks like:

\`\`\`md

- item
- another
- yet another
  \`\`\`

Ordered lists are very simple, just use \`x.\` where \`x\` is a number.

For example:

1. item 1
2. item 2
3. item 3

The markdown syntax looks like:

\`\`\`md

1. item 1
2. item 2
3. item 3
   \`\`\`

### 6. Code

Finally, we are going to learn how to write code in case you want to put some code snippets in your blog!

You can type backticks: \`

Use them just like quotation marks "to wrap around your code!"

For a single line, one backtick on either side is enough.

For example:

![example of js console.log image](images/eg1.png)

The syntax is:
![example of js console.log markdown syntax image](images/eg1_synt.png)

To make entire code blocks with highlight support for a specific language see the following example:

Example output of a hello world program in \`C\`:

![example of C code markdown highlighted](images/eg2.png)

The syntax for making this is:

![example of js console.log markdown syntax image](images/eg2_synt.png)

If you have already noticed, instead of one backtick, you use three to wrap the block of code. After the **first three** backticks you specify the language by typing the file extension for that language right next to the last of the first three backticks, without any space between. Here, the language is \`C\`, see if you can spot that letter in the syntax!
