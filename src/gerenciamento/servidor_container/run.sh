docker build -t gerenciamento-iperf-server-image .
# docker run -it -p 5201:5201 -e HOST="0.0.0.0" gerenciamento-iperf-server-image
docker run -it -p 5201:5201 gerenciamento-iperf-server-image