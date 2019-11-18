docker build -t gerenciamento-iperf-client-image .
# docker run -it -p 5005:5005 -host 127.0.0.1 gerenciamento-iperf-client-image
docker run --rm -it -p 5005:5005 -e HOST="0.0.0.0" gerenciamento-iperf-client-image