# STORYFUL

WordPress Theme for [Multidots](https://www.multidots.com/)

### Requirements

`storyful` requires the following dependencies:

- [Node.js](https://nodejs.org/)
- [NVM](https://wptraining.md10x.com/lessons/install-nvm/)

### Quick Start

**Automatic**

Download theme without manuall process use this link: https://inhouse-storyful-theme-clone.md-staging.com/

**Manually**

Clone or download this repository, change its name to something else (like, say, `md-bricks`), and then you'll need to do a nine-step find and replace on the name in all the templates. **Please make sure to on capslock before start search and replace.**

1. Search for `storyful` the text replace with: `md-bricks` .
2. Search for `storyful` the text replace with: `md_bricks` .
3. Search for `STORYFUL` the text replace with: `MD-BRICKS` .
4. Search for `STORYFUL` the text replace with: `MD_BRICKS` .
5. Search for `Storyful` the text replace with: `Md_Bricks` .
6. Search for `storyful` the text replace with: `MD Bricks` .
7. Delete `phpcbf.xml`, `phpcs.xml` and `composer.json` file from theme root directory.
8. Rename class file `storyful-theme/inc/classes/class-storyful.php` to `storyful-theme/inc/classes/class-md-bricks.php` .
9. Rename theme folder `storyful-theme` to `md-bricks` .

## Build Process

**Install**

Check for Proper node version

```bash
cd assets
nvm use
```

Install Dependency

```bash
npm install
```

**During development**

```bash
npm run start
```

**Production**

```bash
npm run build
```

**Scaffold a Block**

```bash
npm run scaffold
```

You will be asked a few questions and get the base files for a block.

Steps to follow:

1. Scaffold a new block with `npm run scaffold`
2. Supply block name, eg. `Prime Demo`
3. Supply a block slug. The slug will be the name slugified, eg. `prime-demo`
4. Supply an optional description.
5. Select or search for a dashicon from provided options. eg. `smiley`.
6. Look in assets/src/js/blocks/prime-demo/