# magnet2torrent

Convert magnet to torrent

## Installation

Download [latest release](https://github.com/nadhirxz/magnet2torrent/releases/latest) then run

```sh
$ magnet2torrent [options] <magnet>
```

## Build from source

Clone this repository

```sh
$ git clone https://github.com/nadhirxz/magnet2torrent.git
```

Install dependencies

```sh
$ npm install
```

Run

```sh
$ node index [options] <magnet>
```

### Link

Use `npm link` to create a symlink to run `magnet2torrent` from anywhere

Now you can run

```sh
$ magnet2torrent [options] <magnet>
```

Use `npm unlink` to remove symlink

### Build binaries

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

## Options

```
<magnet>                     full magnet uri or info hash only
-V, --version                output the version number
-o, --output <filename>      torrent file output
-h, --help                   display help for command
```

## Examples

```sh
$ magnet2torrent magnet:?xt=urn:btih:90289fd34dfc1cf8f316a268add8354c85334458
#=> ✔ connecting to peers
#=> ✔ getting metadata
#=> torrent saved as ubuntu-16.04.1-server-amd64.iso.torrent

$ magnet2torrent B26C81363AC1A236765385A702AEC107A49581B5 -o ubuntu-20.04.3
#=> ✔ connecting to peers
#=> ✔ getting metadata
#=> torrent saved as ubuntu-20.04.3.torrent
```