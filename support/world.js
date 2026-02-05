const { setWorldConstructor } = require('@cucumber/cucumber');

class CustomWorld {
  constructor() {
    this.token = null;
    this.categories = [];
    this.plants = [];
    this.deleteResponse = null;
  }
}

setWorldConstructor(CustomWorld);