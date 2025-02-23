# iut-project

## Démarrer le projet

### Démarrer un conteneur Docker MySQL

```bash
docker run -d --name hapi-mysql -p 3307:3306 -e MYSQL_ROOT_PASSWORD=hapi -e MYSQL_DATABASE=user mysql:8.0 --default-authentication-plugin=mysql_native_password
```

### Charger nvm (à faire dans un bash)

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

### Démarrer le projet via npm

```bash
npm run dev
```
ou

```bash
npm start
```


## Exemple de valeurs pour tester les routes


### POST `/user`
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@example.com",
  "username": "johndoe",
  "password": "securepassword"
}
```

### DELETE `/user/{id}`
```json
{
  "id": 1
}
```

### PATCH `/user/{id}`
```json
{
  "email": "newemail@example.com",
  "username": "newusername"
}
```

### POST `/user/login`
```json
{
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

### GET `/users`
_Aucune donnée requise_
