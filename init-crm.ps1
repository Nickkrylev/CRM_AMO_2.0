<#
  init-crm.ps1 ― «одним кликом» разворачивает Express + Prisma + Dev-tooling
#>

& {
  $PN = 'my-crm'                  # имя корня проекта (можно изменить)

  # ── каталоги ────────────────────────────────────────────────────────────────
  @(
    "$PN", "$PN\prisma\migrations",
    "$PN\src\routes", "$PN\src\controllers",
    "$PN\src\services", "$PN\src\middlewares",
    "$PN\src\utils", "$PN\tests"
  ) | ForEach-Object { New-Item -ItemType Directory -Force -Path $_ | Out-Null }

  # ── файлы ───────────────────────────────────────────────────────────────────
  $files = @{}

  $files["$PN\.gitignore"] = @'
# dependencies
/node_modules
# dotenv
.env*
# prisma
/prisma/migrations
# logs
*.log
'@

  $files["$PN\.env.example"] = @'
DATABASE_URL=mysql://user:pass@localhost:3306/mydb
JWT_SECRET=change-me
PORT=3000
'@

  $files["$PN\.env"] = "# скопируйте .env.example и задайте реальные значения`n"

  $files["$PN\.editorconfig"] = @'
root = true
[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
'@

  $files["$PN\.prettierrc"] = @'
{
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "avoid"
}
'@

  $files["$PN\.eslintrc.cjs"] = @'
module.exports = {
  env: { node: true, es2021: true },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: { ecmaVersion: 13, sourceType: "module" },
  rules: {}
};
'@

  $files["$PN\nodemon.json"] = @'
{
  "watch": ["src"],
  "ext": "js,json",
  "exec": "node --inspect src/server.js"
}
'@

  # Prisma
  $files["$PN\prisma\schema.prisma"] = "// TODO: опишите модели и datasource"
  $files["$PN\prisma\seed.js"]      = "// TODO: скрипт начального наполнения"

  # Исходники
  $files["$PN\src\app.js"] = @'
const express = require("express");
const cors    = require("cors");
const routes  = require("./routes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", routes);

module.exports = app;
'@

  $files["$PN\src\server.js"] = @'
require("dotenv").config();
const app  = require("./app");
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API running on :${port}`));
'@

  $files["$PN\src\routes\index.js"] = @'
const router = require("express").Router();
router.use("/clients", require("./clients.routes"));
module.exports = router;
'@

  $files["$PN\src\routes\clients.routes.js"] = @'
const router = require("express").Router();
const ctrl   = require("../controllers/clients.controller");

router.get("/",    ctrl.list);
router.get("/:id", ctrl.getById);
router.post("/",   ctrl.create);
router.put("/:id", ctrl.update);
router.delete("/:id", ctrl.remove);

module.exports = router;
'@

  $files["$PN\src\controllers\clients.controller.js"] = @'
const svc = require("../services/clients.service");

exports.list    = async (_req, res, next) => { try { res.json(await svc.getAll()); } catch (e) { next(e); } };
exports.getById = async (req, res, next)  => { try { res.json(await svc.getById(+req.params.id)); } catch (e) { next(e); } };
exports.create  = async (req, res, next)  => { try { res.json(await svc.create(req.body)); } catch (e) { next(e); } };
exports.update  = async (req, res, next)  => { try { res.json(await svc.update(+req.params.id, req.body)); } catch (e) { next(e); } };
exports.remove  = async (req, res, next)  => { try { res.json(await svc.remove(+req.params.id)); } catch (e) { next(e); } };
'@

  $files["$PN\src\services\clients.service.js"] = @'
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAll  = ()         => prisma.client.findMany();
exports.getById = id         => prisma.client.findUnique({ where: { id } });
exports.create  = data       => prisma.client.create({ data });
exports.update  = (id,data)  => prisma.client.update({ where: { id }, data });
exports.remove  = id         => prisma.client.delete({ where: { id } });
'@

  $files["$PN\src\middlewares\errorHandler.js"] = @'
module.exports = (err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
};
'@

  # Тест-заглушка
  $files["$PN\tests\clients.test.js"] = "// TODO: добавить Jest-тесты"

  # Docker
  $files["$PN\Dockerfile"] = @'
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
RUN npx prisma generate
EXPOSE 3000
CMD ["node","src/server.js"]
'@

  $files["$PN\docker-compose.yml"] = @'
version: "3.9"
services:
  api:
    build: .
    restart: unless-stopped
    ports: ["3000:3000"]
    env_file: .env
    depends_on:
      db:
        condition: service_healthy

  db:
    image: mysql:8
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: mydb
    ports: ["3306:3306"]
    healthcheck:
      test: ["CMD","mysqladmin","ping","-h","localhost"]
      interval: 5s
      retries: 5
'@

  # README
  $files["$PN\README.md"] = "# my-crm · Express + Prisma backend"

  # ── сохраняем файлы ──────────────────────────────────────────────────────────
  foreach ($p in $files.Keys) {
    New-Item -ItemType File -Force -Path $p | Out-Null
    Set-Content -Path $p -Value $files[$p] -NoNewline
  }

  # ── npm + зависимости ────────────────────────────────────────────────────────
  Push-Location $PN
  npm init -y          | Out-Null
  npm i express prisma @prisma/client dotenv
  npm i -D eslint prettier eslint-config-prettier eslint-plugin-prettier `
         husky lint-staged nodemon jest supertest

  # scripts и lint-staged (кавычки/пробелы обернуты в одинарные)
  npm pkg set scripts.dev='nodemon src/server.js'
  npm pkg set scripts.lint='eslint "src/**/*.{js}"'
  npm pkg set 'scripts.lint:fix'='npm run lint -- --fix'
  npm pkg set scripts.format='prettier --write "src/**/*.{js,json,md}"'
  npm pkg set scripts.test='jest'
  npm pkg set scripts.prepare='husky install'

  npm pkg set lint-staged='{
    "src/**/*.{js}": "eslint --fix",
    "*.{json,md}":   "prettier --write"
  }'

  # Husky
  npx husky install | Out-Null
  npx husky add .husky/pre-commit "npx lint-staged" | Out-Null
  Pop-Location

  Write-Host "`n✅  Проект '$PN' развёрнут полностью!"
}
