const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 3000;

// Config MySQL depuis variables d'environnement (ConfigMap + Secret)
const dbConfig = {
  host: process.env.DB_HOST || 'vm3-db-svc',
  port: parseInt(process.env.DB_PORT) || 3306,
  user: process.env.