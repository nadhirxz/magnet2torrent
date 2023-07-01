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
  -t, --timeout <timeout>  timeout in ms (default: 30000)
  -h, --help               display help for command
```

## Examples

```sh
$ m2t -o great-content "magnet:?xt=urn:btih:EE492EE6766FE1968BDC86B7D214A428309ABC19&tr=http%3a%2f%2fbt1.archive.org%3a6969%2fannounce&ws=https%3a%2f%2farchive.org%2fdownload%2f&ws=http%3a%2f%2fia601509.us.archive.org%2f10%2fitems%2f&ws=http%3a%2f%2fia801509.us.archive.org%2f10%2fitems%2f"
#=> ✔ connecting to network
#=> ✔ finding peers
#=> ✔ getting metadata
#=> torrent saved as great-content.torrent

$ m2t 436e5f8b85a51d5545156e15cc144ba1144991ff
#=> ✔ connecting to peers
#=> ✔ getting metadata
#=> torrent saved as archlinux-2023.07.01-x86_64.iso.torrent
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
