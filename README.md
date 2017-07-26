![Bankin Logo](http://parisfintechforum.com/system/companies/logos/000/000/389/transparent/Logo-Bankin-%281%29.png?1481539240)
[> Have a look on Bankin' Website !](https://bankin.com/)
# Bankin' Scrapper
This is a PoC (Proof Of Concept) of Bankin' web scrapping back-end service.
![Demo](/images/bankin-scrapper.gif)

### Stack
* PhantomJS
* CasperJS

### Contributor
* Thomas Brodusch 

### First of all, get the repo and install dependancies
```sh
$ git clone https://github.com/tom4dev/bankin-scrapper 
$ cd bankin-scrapper
$ npm install
```

### Launch Service
```sh
$ npm start -- --account=123 --secret=123456
```

# Unit Testing - CasperJS

### Launch Login test 
```sh
$ npm run test-login
```

### Launch Account balance test
```sh
$ npm run test-account
```
### Launch All Tests (login & account balance)
```sh
$ npm run tests
```

-------
License
----
MIT
**Open source, Hell Yeah.**