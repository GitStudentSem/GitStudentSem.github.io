Деплой: https://dev.to/rashidshamloo/deploying-vite-react-app-to-github-pages-35hf

1. Установите gh-pagesпакет ( ctrl+~чтобы открыть терминал в VS Code)
```sh 
npm install gh-pages --save-dev
```
2. В package.jsonфайле добавьте эти строки перед"build": "vite build",
```sh
"predeploy": "npm run build",
"deploy": "gh-pages -d dist",
```
3. В vite.config.jsфайле добавьте эту строку передplugins: [react()],
```json
base: "/YOUR_REPOSITORY_NAME",
```
Измените YOUR_REPOSITORY_NAMEимя вашего репозитория GitHub.

4. В типе терминала
```sh
npm run deploy
```
🎉 Теперь у вас есть gh-pagesветка в вашем репозитории и ваше приложение развернуто (вы можете проверить это в разделе Settings -> Pages)

P.S. Чтобы обновить развертывание приложения, просто запустите npm run deployкоманду еще раз.