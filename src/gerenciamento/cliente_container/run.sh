docker build -t gerenciamento-iperf-client-image .
docker run -it -e HOST="0.0.0.0" gerenciamento-iperf-client-image