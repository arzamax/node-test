import path from 'path';

import config from './config/config';
import User from './models/User';
import Product from './models/Product';
import Importer from './modules/importer';

const CSVFolder = path.resolve(__dirname, 'data', 'csv');
const JSONFolder = path.resolve(__dirname, 'data', 'json');
const importer = new Importer(CSVFolder, JSONFolder, 3000);

importer.start();

console.log(config.name);
const user = new User();
const product = new Product();