# BAWC Project
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## deployment in your local
### Download source code in your PC.

1. You will be able to use git command below:

`git clone https://github.com/jtlandy/bawc.git`

2. Go to web in the project directory, create .env file like below:

```
#General Environment
ADMIN_URL = "http://localhost:3001"
NEXT_PUBLIC_HTTPS_CONNECTION =0
NEXT_PUBLIC_CHAIN_ID=replace_chain_id

# SMTP Environment
NEXT_PUBLIC_ADMIN_EMAIL=replace_admin_email
NEXT_PUBLIC_SMTP=replace_your_smtp_server_url
NEXT_PUBLIC_PORT=587
NEXT_PUBLIC_EMAIL=replace_smtp_email
NEXT_PUBLIC_PASSWORD=replace_smtp_password
```

3. Run `yarn install` or `npm install`


4. You can run the app in the development mode.

Use one of following commands:

`npm start` or `yarn start`

`npm run dev` or `yarn run dev`
