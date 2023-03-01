# Shikicli

A simple CLI app that applies syntax highlighting to a file using [shiki](https://github.com/shikijs/shiki). It is packaged as a standalone executable and can be used without Node.js or npm.

## Getting Started

To install and use Shikicli, you can download the executable for your platform from the [latest release](https://github.com/rozumak/shiki-cli/releases/latest) on GitHub. Make sure to give it executable permissions:

```bash
# Example for macOS
curl -sLO https://github.com/rozumak/shiki-cli/releases/latest/download/shikicli-macos-x64
chmod +x shikicli-macos-x64
mv shikicli-macos-x64 shikicli
```

Now you can use it to apply syntax highlighting to a file:

```bash
# Highlight a file using default options
./shikicli --input example.js --output example.html --language javascript

# Highlight a file using a specific theme
./shikicli -i example.js -o example.html -l js -t nord
```

Only the default languages and themes that are bundled with the shiki library can be used.

## Usage

```
shikicli --input [input file path] --output [output file path] --language [input file language] [--theme [shiki theme]]
```

## Options

`--input`, `-i`: Required. Path to the input file to highlight.

`--output`, `-o`: Required. Path to the output file to write the highlighted code to.

`--language`, `-l`: Required. Language of the input file. Supported [languages](https://github.com/shikijs/shiki/blob/main/docs/languages.md#all-languages).

`--theme`, `-t`: Optional. Shiki theme to use for highlighting. Supported [themes](https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-themes). If not specified, the default theme ("dark-plus") is used.

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit/).
