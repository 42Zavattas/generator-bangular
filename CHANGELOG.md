### 0.9.3 (2015-03-25)


#### Bug Fixes

* **server:** update mongo & mongoose dependencies ([52a0d88d](https://github.com/42Zavattas/generator-bangular/commit/52a0d88d516feeed6f4afda73b04f6324ab023a9))


#### Features

* **gulp:** major watch & inject improvements ([26a86cdf](https://github.com/42Zavattas/generator-bangular/commit/26a86cdf990fa0ee9c5cef5d1ea83e91064a5b86))


### 0.9.2 (2015-03-24)


#### Bug Fixes

* **gulpfile:** recompile scss on directive style changes ([83b95055](https://github.com/42Zavattas/generator-bangular/commit/83b95055be714a0ca806930d931d63c8220eaf71))
* **route:**
  * correct route name injected into app.scss ([30bef46c](https://github.com/42Zavattas/generator-bangular/commit/30bef46cce0186fc3027909d6f6e9f5ae9d46aa6))
  * wait for app style to be generated. ([903d7487](https://github.com/42Zavattas/generator-bangular/commit/903d7487063012e9f89f49c2000af14bda7e0839))


### 0.9.1 (2015-03-11)


#### Bug Fixes

* **build:** rewrite urls in dist css file ([7b4e1552](https://github.com/42Zavattas/generator-bangular/commit/7b4e1552d2b3869c5fc8aca638e16941da89ccb3))


#### Features

* **directive:** prompt for style file creation ([a24ea967](https://github.com/42Zavattas/generator-bangular/commit/a24ea9671ef059195e2b512e5a94acb2f27249c4))


## 0.9.0 (2015-03-08)


#### Bug Fixes

* **app:** use correct config when file present ([4844c57a](https://github.com/42Zavattas/generator-bangular/commit/4844c57a9a3b906465b9bcc1911f5530bf53a3a3))
* **core:** remove e2e specs from injects and watch ([f70b5d8e](https://github.com/42Zavattas/generator-bangular/commit/f70b5d8e76fef4073a4a478a8fb64207d3b3c6cc))
* **tests:**
  * change index assertion of account navbar ([804bd8ed](https://github.com/42Zavattas/generator-bangular/commit/804bd8edc78c173d5bbc4f2eaf082c44866c2f47))
  * remove e2e files in karma ([ae740242](https://github.com/42Zavattas/generator-bangular/commit/ae7402422a690d9e34ae9fb07eb1b42f95b77c03))


#### Features

* **anim:** add animation generator ([ad4025c0](https://github.com/42Zavattas/generator-bangular/commit/ad4025c031606f08ebad36836835564359983405))
* **app:** prevent flickr effect for navbar, including it into directive ([23d5c76f](https://github.com/42Zavattas/generator-bangular/commit/23d5c76fe10368ee132538a6850d2e20354c9cdf))


## 0.8.0 (2015-03-06)


#### Bug Fixes

* **api:** `No` by default for socket file creation ([257a7156](https://github.com/42Zavattas/generator-bangular/commit/257a7156077f894b592330f7a2d49359eb9ffb7d))
* **build:** update livereload regex to fit with indentation variations ([42b3c8a4](https://github.com/42Zavattas/generator-bangular/commit/42b3c8a453ad92bede41f2f8424253f282233be1))
* **control:** pass jshint when scaffolding using sockets ([36784905](https://github.com/42Zavattas/generator-bangular/commit/367849059d27e9329723abe544bd6b4081381eac))
* **core:** cache templates of directives for dist ([70b6b37a](https://github.com/42Zavattas/generator-bangular/commit/70b6b37a24d868fcbe14ca0dc034d0170024ab68))
* **gen:** delay nodemon on start and restart changes ([37aef08d](https://github.com/42Zavattas/generator-bangular/commit/37aef08d0365a93cd113b9bca102157f6bdacc2d), closes [#4](https://github.com/42Zavattas/generator-bangular/issues/4))
* **gulp:** bangular is too fast, need to slow down. ping gulp-inject? ([5503e737](https://github.com/42Zavattas/generator-bangular/commit/5503e7370d324c9aea301d8adb4eb01b8495bb96))
* **lint:**
  * correct some files ([ccdd45ae](https://github.com/42Zavattas/generator-bangular/commit/ccdd45ae01a72d4b812c6206e554c351df4dbb21))
  * missing semicolon ([97919cea](https://github.com/42Zavattas/generator-bangular/commit/97919cea35036cdf7c3a6f8ff03f7711d5c58d54))
* **readme:** obvious things are obvious ([2ab083bd](https://github.com/42Zavattas/generator-bangular/commit/2ab083bd8813cbc82e00aabc2b9a50d83803247e))
* **socket:** remove unnecessary factory injection ([b00d14e6](https://github.com/42Zavattas/generator-bangular/commit/b00d14e6591347c5d21bb7f204c7cc231118972d))
* **tests:**
  * change paths for karma and protractor ([17260f32](https://github.com/42Zavattas/generator-bangular/commit/17260f3201dbf201ac5c23a5fab8ef1c43d07c6e))
  * reflect socket changes in mock ([afe87064](https://github.com/42Zavattas/generator-bangular/commit/afe8706434d779e6d0032059305ca3c144e27b74))
* **typo:** micro space fix ([2804e807](https://github.com/42Zavattas/generator-bangular/commit/2804e80735485f2d2b22c0d41061187fb1745c88))


#### Features

* **api:** allow to generate resource of endpoint ([8ccff74a](https://github.com/42Zavattas/generator-bangular/commit/8ccff74ac98d99ae128361c0c5c0990ac80a816a))
* **app:** add basic travis file ([92829bbe](https://github.com/42Zavattas/generator-bangular/commit/92829bbe6025e42e94f888f4933c081cfff4715d))
* **e2e:**
  * generate on new route and refactor tests ([63392bf9](https://github.com/42Zavattas/generator-bangular/commit/63392bf9c4214e921f2285a7aaddd9080c201a09))
  * add protractor scaffold to bangular ([43c610a5](https://github.com/42Zavattas/generator-bangular/commit/43c610a5473d6fd270103edf09779610ada24285))
* **gen:** open and reload only when express is ready ([4298e270](https://github.com/42Zavattas/generator-bangular/commit/4298e270da6528e2a53b1721fa6b7a732476fd56))
* **jshint:** major jshint improvements ([3623e9bd](https://github.com/42Zavattas/generator-bangular/commit/3623e9bd880f0ea7f384267f679e289123d067ff))
* **route:** create & import style associated to view ([7e90a4ab](https://github.com/42Zavattas/generator-bangular/commit/7e90a4ab0b5f683432c83465ccde169b54069908))
* **sockets:** improve service with on, emit and clean methods ([6a8f1f6b](https://github.com/42Zavattas/generator-bangular/commit/6a8f1f6be37bb121b0c55d826cf7d575ae225b83))


## 0.7.0 (2015-02-07)


#### Bug Fixes

* **config:** remove unnecessary code ([3778dbcd](https://github.com/42Zavattas/generator-bangular/commit/3778dbcd58722b241fd98b76c371fff8a390b553))
* **gen:** usemin crash with sockets on build ([28f3a2e3](https://github.com/42Zavattas/generator-bangular/commit/28f3a2e3ec337bd8a718c61d295dfea8009cab0d))
* **readme:** update logos placement ([3cd7a4f5](https://github.com/42Zavattas/generator-bangular/commit/3cd7a4f532edb2ec7c9b4ca2b7f618f32d8e73bc))
* **template:**
  * update route unit tests ([42295738](https://github.com/42Zavattas/generator-bangular/commit/4229573847a53678eb7495d952cf6acc964fe8ab))
  * unify home controller test ([a91a1ef2](https://github.com/42Zavattas/generator-bangular/commit/a91a1ef2eb03277c05ab03dd71116a87d7181b64))
* **tests:** mock socket factory for karma ([7dd071db](https://github.com/42Zavattas/generator-bangular/commit/7dd071db3ad3833c01581444f6e1a98473584ecc))


#### Features

* **auth:** add support for passport and authentication process purposal ([ef0cc502](https://github.com/42Zavattas/generator-bangular/commit/ef0cc502db4634124de92dd3135afad8ef80d202))
* **core:** add factory gen ([3246c9c6](https://github.com/42Zavattas/generator-bangular/commit/3246c9c612f0f7a8a4c0821bbf89cadb8512ae45))


## 0.6.0 (2015-02-07)


#### Bug Fixes

* **api:**
  * delete request missing end statement ([d5aa64a2](https://github.com/42Zavattas/generator-bangular/commit/d5aa64a2c5fa1e990069c0d523cc95dde2402938))
  * sockets register ([d4cbd5ec](https://github.com/42Zavattas/generator-bangular/commit/d4cbd5ec9e3230d7f317398ff447a128dd1ff332))
* **app:** dependency socket and test ([4f577b6b](https://github.com/42Zavattas/generator-bangular/commit/4f577b6b20fd459279d4a5bcf182b1dc5b32c468))
* **font:** use needle if provided for font style inject ([74acdffe](https://github.com/42Zavattas/generator-bangular/commit/74acdffe48cc50cae529e988ce3a0558ebd78787))
* **home:** remove default socket injection ([55cb3cf3](https://github.com/42Zavattas/generator-bangular/commit/55cb3cf3bb4916c4ad10f8b04659bee5109f1b6f))
* **route:** correct controller name in controller unit test ([b620c9d2](https://github.com/42Zavattas/generator-bangular/commit/b620c9d22ad080fd8be31f92d28af8cc88153adb))
* **sockets:**
  * remove duplicate listener and provide custom config of sockets ([c7548c9e](https://github.com/42Zavattas/generator-bangular/commit/c7548c9e9097a401b11031527c6af7f8c7738181))
  * socket url ([4eebef83](https://github.com/42Zavattas/generator-bangular/commit/4eebef83e1c5a70b73f883f89fed0475e8db70d0))
  * typo error ([77f92628](https://github.com/42Zavattas/generator-bangular/commit/77f92628b540871caa94b79d35a05017c51c22f6))
  * readable date ([300eae8f](https://github.com/42Zavattas/generator-bangular/commit/300eae8fa19da15ed3e8f77032fed1daf5c18c9c))
* **tests:** use timeout to assert file content in style ([b75f1756](https://github.com/42Zavattas/generator-bangular/commit/b75f175610c575d9540961aa5088ddb945e5ae55))


#### Features

* **api:** add socket support, major refactor of naming ([b479b34a](https://github.com/42Zavattas/generator-bangular/commit/b479b34a2b3116fc03c991c28e0e19447b37143f))
* **sockets:**
  * better factory with sync ([463a30c5](https://github.com/42Zavattas/generator-bangular/commit/463a30c592216510be379f96d2c0837e24f3484d))
  * add client factory template ([aeee8626](https://github.com/42Zavattas/generator-bangular/commit/aeee86268d57934d01b55599b02db25185d498e4))
  * add app prompt to ask for socket ([263543ce](https://github.com/42Zavattas/generator-bangular/commit/263543ce2d29ee09f25f4ebb9bf2b150af31c594))
  * add templates ([479bc323](https://github.com/42Zavattas/generator-bangular/commit/479bc3235ee0d89ec228507839b844b70aeec5fc))


## 0.3.0 (2014-10-16)


#### Bug Fixes

* **build:** prevent empty lines in index.html ([41a3fb0c](https://github.com/42Zavattas/generator-bangular/commit/41a3fb0c0f1b2da65e900ca3b8970baacdb00895))
* **core:**
  * purposed ello smiley not working ([3f17d759](https://github.com/42Zavattas/generator-bangular/commit/3f17d7591c018c4051afed0fda2c5c8ea465ed15))
  * better livereload ([ea4e6b1f](https://github.com/42Zavattas/generator-bangular/commit/ea4e6b1f56726d32bb22b662efcb4cbaf6062e22))
  * update package.json ([49431aa0](https://github.com/42Zavattas/generator-bangular/commit/49431aa0505db5030927559e3be0656e55daac4f))
* **favicon:** increase favicon size for display purposes ([2ee99874](https://github.com/42Zavattas/generator-bangular/commit/2ee99874fc07918b626b7c506b388b29f13727c2))
* **gen:**
  * change generation process ([322ca2ec](https://github.com/42Zavattas/generator-bangular/commit/322ca2ecf71bb09a6cc622620ad0c27e966d178e))
  * resolve deps for server, watch and inject tasks ([9429dade](https://github.com/42Zavattas/generator-bangular/commit/9429dade255f72a06ba6274d0bccf8af3035173e))
* **gitignore:** ignore dist folder ([f9f6c7af](https://github.com/42Zavattas/generator-bangular/commit/f9f6c7afce6d91e905d19ee701cd98ee2246c46f))
* **karma:** inject optional dependencies in karma tests ([38971a5a](https://github.com/42Zavattas/generator-bangular/commit/38971a5ab0d421d0de59d2e90750c1cfa6f6ee2b))
* **npm:** prevent side effects of npmjs ([8faed060](https://github.com/42Zavattas/generator-bangular/commit/8faed0606db81523af310f176594f0b24d793969))
* **readme:** purposed translation ([23921f54](https://github.com/42Zavattas/generator-bangular/commit/23921f54c594af48fa06f819db2f0e6be8253eb2))
* **task-name:** replace serve:dist by preview for clarity purpose ([977e56e0](https://github.com/42Zavattas/generator-bangular/commit/977e56e0f7594f0212a0bfbbe68f448227798997))


#### Features

* **controller:** use "controller as vm" syntax ([ff412271](https://github.com/42Zavattas/generator-bangular/commit/ff4122715e0f9ffffc37493e9ab22b4d16930da8))
* **filter:** add filter generator ([8c9f194c](https://github.com/42Zavattas/generator-bangular/commit/8c9f194c3d877b22d4d1ae296305e77b21235f35))
* **gulp:** reload on server changes ([52c7cd39](https://github.com/42Zavattas/generator-bangular/commit/52c7cd39c738305fcc4e1479b5a35190fde166e7))

