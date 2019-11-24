# Passos para rodar o trabalho:

# 1. install docker
# sudo apt-get install docker.... TODO

# 2. install docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
docker-compose --version

# 3. run server (db + server iperf), go to src and run
./runServer.sh

# 4. set SERVER_IP on client.docker-compose.yml to the host you ran the server

# 5. run client (db client, iperf clirnt) go to src and run
./runClient.sh

# Start reactjs frontend, go to src/front-charts and run:
npm install && npm start

# para escalar o numero de instancias de um certo container:
./runScaleClirnt.sh 10