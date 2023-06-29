# m2t

Convert magnet links to torrent files

## Installation

```sh
$ npm install m2t -g
```

## Usage

```
Usage: m2t [options] <magnet>

Convert magnet links to torrent files

Arguments:
  magnet                   full magnet uri or info hash only

Options:
  -V, --version            output the version number
  -o, --output <filename>  torrent file output
  -h, --help               display help for command
```

## Examples

```sh
$ m2t magnet:?xt=urn:btih:90289fd34dfc1cf8f316a268add8354c85334458
#=> ✔ connecting to peers
#=> ✔ getting metadata
#=> torrent saved as ubuntu-16.04.1-server-amd64.iso.torrent

$ m2t B26C81363AC1A236765385A702AEC107A49581B5 -o ubuntu-20.04.3
#=> ✔ connecting to peers
#=> ✔ getting metadata
#=> torrent saved as ubuntu-20.04.3.torrent
```

### Build binaries

Clone this repository

```sh
$ git clone https://github.com/nadhirxz/magnet2torrent.git
```

Install dependencies

```sh
$ npm install
```

```sh
# Generate binaries for linux, mac os and windows
$ npm run package

# linux only
$ npm run package-linux

# mac os only
$ npm run package-mac

# windows only
$ npm run package-windows
```

## License

[MIT License](./LICENSE.md)
