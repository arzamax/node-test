import config from './config/config';
import User from './models/User';
import Product from './models/Product';

console.log(config.name);

const user = new User();
const product = new Product();