# # Instala o python
# sudo apt install python2.7

# # Instala o pip - gerenciador de pacotes e outros
# sudo apt install python-pip
# sudo apt install python-setuptools
# sudo apt install python-wheel

# # Instala lib do iperf3
# sudo pip install iperf3

# NAO PRECISAMOS MAIS DE PYTHON/IPERF QUANDO USAMOS DOCKER :)
# sudo apt-get install docker.... TODO
#install docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
docker-compose --version

# to run go to src and:
sudo docker-compose build && sudo docker-compose up --force-recreate

# FRONT-END tem que se conectar no IP do back
sudo docker network inspect src_backend 