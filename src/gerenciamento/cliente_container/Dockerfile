FROM networkstatic/iperf3

RUN apt-get update
# Instala o python
RUN apt-get install python2.7 -y

# Instala o pip - gerenciador de pacotes e outros
RUN apt-get install python-pip -y

RUN apt-get install python-setuptools -y
RUN apt-get install python-wheel -y

# Instala lib do iperf3
RUN pip install iperf3
RUN pip install -U Flask
RUN pip install flask-restful
RUN pip install -U flask-cors

COPY client.py . 
ENTRYPOINT ["python2.7", "client.py"]