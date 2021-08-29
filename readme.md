# Chat Server

## Installation & Local Run
Ensure you have node 14 or higher.

```
git clone https://github.com/artashvt/chat-server.git
cd chat-server
npm install
```

### Set the access credentials in .env.js
```
cp env.js.example env.js
```

### Run 

```
node index.js
```

## Installation & Docker Run

```
git clone https://github.com/artashvt/chat-server.git
cd chat-server
```

### Set the access credentials in .env.js
```
cp env.js.example env.js
```

### Run

```
docker-compose build app  
docker-compose up -d    
```
