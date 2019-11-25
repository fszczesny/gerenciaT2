# 1. Install docker
sudo apt update
sudo apt upgrade
sudo apt install docker.io docker-compose
sudo usermod -aG docker $USER
newgrp docker


# 2. Install docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
docker-compose --version

# 3. Install NodeJs
sudo apt install nodejs
sudo apt install npm
